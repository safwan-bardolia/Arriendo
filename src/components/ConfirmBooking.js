import React from 'react'
import { Call,LocalParking,Star } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router'
import './ConfirmBooking.css'
import { Avatar, Button } from '@material-ui/core';
import { useState } from 'react';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';

function ConfirmBooking() {

  const history = useHistory();

	// get the userInfo from userSlice
	const user = useSelector(selectUser);

  // for accessing Passed parameters with history push:
  const location = useLocation();
  console.log(location);

  // create shortcut
  const hostingInfo = location?.hostingInfo;
  const hostingInfoCoordinates = location?.hostingInfoCoordinates;
  const parkingDuration = location?.parkingDuration;
  console.log(hostingInfo);
  console.log(hostingInfoCoordinates);
  console.log(parkingDuration);

  const [formData, setFormData] = useState({
    fullName:"",
    mobile:"",
    carType:"",
    carNumber:"",
    licenseNumber:"",
    licensePhoto:"",
		rcPhoto:"",
    formErrors:{
      fullName:"",
      mobile:"",
      carType:"",
      carNumber:"",
      licenseNumber:"",
      licensePhoto:"",
			rcPhoto:"",
    }
  })

	// we have used ... because we want to use object.values() on remaining 4 field of state
	const formValid = ({formErrors, ...restProperty}) => {
		let valid = true;

		// Object.values creates an array that contains the values of every property in an object.
		Object.values(formErrors) 
		.forEach(val=> {
			// val.length>0 : means any error string is present
			val.length > 0 && (valid=false);                // shorted syntax for if(val.length>0) then (valid=false)
		})

		// another solution for loop throgh an object
		// Object.entries creates an array of arrays. Each inner array has two item. The first item is the property; the second item is the value.
		const entries = Object.entries(restProperty);

		// loop through
		for(const [key, value] of entries) {
				
			if(value==="") {
					valid = false;

					// veri imp, setting an error msg when we direct submit form
					formErrors[key] = `${key} cannot be empty`;
					console.log(formErrors);
					console.log(key);
					console.log(formErrors.key);
					console.log(formData.formErrors);
			}

			// for files
			if(value===null) {
					valid = false;
					formErrors[key] = `please add ${key}`;
			}
		}

		// Updating a specific record will require making a recall to the previous State prevState
		setFormData((prevState) => ({
			...prevState,
			formErrors: formErrors
		}))

		console.log(formData.formErrors);

		return valid;
  }  

	// when form is submitted
	const handleSubmit = (e) => {
		e.preventDefault();

		// call formValid()
		if(formValid(formData)) {
      
			console.log(`
			--SUBMITTING--
			uid: ${user.uid}
			email: ${user.email}
			userProfileUrl: ${user.photo}
			date: ${parkingDuration.date}
			checkInTime: ${parkingDuration['check-in-time']}
			checkOutTime: ${parkingDuration['check-out-time']}
			Full NAME: ${formData.fullName}
			Mobile: ${formData.mobile}
			carType: ${formData.carType}
			carNumber: ${formData.carNumber}
			licenseNumber: ${formData.licenseNumber}
			licensePhoto: ${formData.licensePhoto}
			rcPhoto: ${formData.rcPhoto}
			hostUID: ${hostingInfo.uid}
			`)

			// ******** post the data to backend **********

			const formInfo = new FormData();

			formInfo.append('uid', user.uid);
			formInfo.append('email', user.email)
			formInfo.append('userProfileUrl',user.photo);

			formInfo.append('date',parkingDuration.date);
			formInfo.append('checkInTime',parkingDuration['check-in-time']);
			formInfo.append('checkOutTime',parkingDuration['check-out-time']);

			formInfo.append('fullName',formData.fullName);
			formInfo.append('mobile',formData.mobile);
			formInfo.append('carType',formData.carType);
			formInfo.append('carNumber',formData.carNumber);
			formInfo.append('licenseNumber',formData.licenseNumber);
			formInfo.append('licensePhoto',formData.licensePhoto);
			formInfo.append('rcPhoto',formData.rcPhoto);

			formInfo.append('hostUID',hostingInfo.uid);


			// post to my__booking


			// now remove some field from formInfo
			// post to my__hosting__client


		} else {
				console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
		}
  }

	// on change of any input field
	const handleChange = e => {
		e.preventDefault();
		
		// get the name of the input field which is change (e.g<input name="fullName">)
		// get the value also
		var {name, value} = e.target;

		// initialize state's formErrors in local variable(so we dont have to use "this.state.formErrors" each time )
		let formErrors = formData.formErrors;

		switch(name) {
			case 'fullName':
				formErrors.fullName = value.length < 6 ? "minimum 6 characters required, Full Name" : "";
				break;
				
			case 'mobile':
				formErrors.mobile = value.length !==10 ? "phone number must be of 10 digit, mobile" : "";
				break;

			case 'carType':
				formErrors.carType = value.length < 6 ? "minimum 6 characters required, carType" : "";
				break;      

			case 'carNumber':
				formErrors.carNumber = value.length < 8 ? "not a valid carNumber" : "";
				break;      

			case 'licenseNumber':
				formErrors.licenseNumber = value.length !==15 ? "not a valid licenseNumber" : "";
				break;      
	
			case 'licensePhoto':
				formErrors.licensePhoto = e.target.files.length===0 ? `please add ${name}` : "";
				if(e.target.files.length!==0) {
					value = e.target.files[0];
				}  
				break;

			case 'rcPhoto':
				formErrors.rcPhoto = e.target.files.length===0 ? `please add ${name}` : "";
				if(e.target.files.length!==0) {
					value = e.target.files[0];
				}  
				break;
					
			default:
				break;  
		}

		// update the state each time, i think formErrors is ES6 code i.e (formErrors:formErrors)
		setFormData((prevState)=>({
				...prevState,
				formErrors: formErrors,
				[name]: value               // here the actual change takes place
		}))

		console.log(formData);
	}
	
	const {formErrors} = formData;

  return (
    <div className="confirmBooking">
      {location.hostingInfo?(
        <>
          <div className="booking__header">
            <h1>{hostingInfo.address}</h1>
            <div className="booking__header__info">
              <div className="booking__header__info__left">
                <div className="booking__header__info__rating">
                  <Star/>
                  4.3
                </div>
                <h4>{`${hostingInfo.city},${hostingInfo.state},${hostingInfo.country}`}</h4>
              </div>
              <div className="booking__header__info__right">
                {/* <HearingTwoTone/>
                <List/> */}
                <Call/>
                {hostingInfo.mobile}
              </div>
            </div>
          </div>

					<div className="confirmBooking__time">
						<div className="confirmBooking__time__left">
							<h2>Confirm your trip</h2>
							<div className="confirmBooking__time__left__field">
									<h4>Date</h4>
									<h5>{parkingDuration.date}</h5>
							</div>
							<div className="confirmBooking__time__left__field">
									<h4>CHECK-IN-TIME</h4>
									<h5>{parkingDuration['check-in-time']}</h5>
							</div>
							<div className="confirmBooking__time__left__field">
									<h4>CHECK-OUT-TIME</h4>
									<h5>{parkingDuration['check-out-time']}</h5>
							</div>
						</div>
						<div className="confirmBooking__time__right">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"/>
							<p>{hostingInfo.description}</p>
							<div className="confirmBooking__time__right__info">
								<h2>Price details</h2>
								<h5>{`₹${hostingInfo.fees} / hour`}</h5>
							</div>
						</div>      
					</div>

          <div className="booking__hosting">
            <div className="booking__hosting__left">
              <h4>{`Parking at home hosted by ${hostingInfo.fullName}`}</h4>
              <Avatar src={hostingInfo.userProfileUrl}/>
            </div>
            <h5><LocalParking/>{`Total space available for parking ${hostingInfo.totalVehicles}`}</h5>
          </div>

          <div className="hostingForm">
            
            <div className="hostingForm__body">
                
              <h1>Driver Profile</h1>
              
              {/*noValidate: it specifies that the form-data (input) should not be validated when submitted. */}
              {/* If we enable HTML5 validations, we have little control of the look and feel of error messages */}
              <form onSubmit={handleSubmit} noValidate>

                <div className="firstName">
									{/* means label for name="firstName" is 'First Name' */}
									<label htmlFor="firstName">Full Name</label>
									<input
											type="text"
											// for displaying box as red when error present in current field
											className={formErrors.fullName.length > 0 ? "error":null}
											placeholder="Full Name"
											name="fullName"
											value={formData.fullName}
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.fullName.length > 0 && (
											<span className="errorMessage">{formErrors.fullName}</span>
									)}
                </div>

                <div className="mobile">
									<label htmlFor="mobile">Mobile no</label>
									<input
											type="tel"
											className={formErrors.mobile.length > 0 ? "error":null}
											placeholder="1234567890"
											name="mobile"
											value={formData.mobile}
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.mobile.length > 0 && (
											<span className="errorMessage">{formErrors.mobile}</span>
									)}
                </div>

                <div className="description">
									<label htmlFor="carType">carType</label>
									<input 
											type="text"
											className={formErrors.carType.length > 0 ? "error":null}
											placeholder="SUV, BMW, Honda-city"
											name="carType"
											value={formData.carType}
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.carType.length > 0 && (
											<span className="errorMessage">{formErrors.carType}</span>
									)}
                </div>
                
                <div className="city">
									<label htmlFor="carNumber">carNumber</label>
									<input 
											type="text"
											className={formErrors.carNumber.length > 0 ? "error":null}
											placeholder="MH39-4589"
											name="carNumber"
											value={formData.carNumber}
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.carNumber.length > 0 && (
											<span className="errorMessage">{formErrors.carNumber}</span>
									)}
                </div>

                <div className="address">
									<label htmlFor="licenseNumber">licenseNumber</label>
									<input 
											type="text"
											className={formErrors.licenseNumber.length > 0 ? "error":null}
											placeholder="MH9901234567890"
											name="licenseNumber"
											value={formData.licenseNumber}
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.licenseNumber.length > 0 && (
											<span className="errorMessage">{formErrors.licenseNumber}</span>
									)}
                </div>

                <div className="parkingPhoto">
									<label htmlFor="licensePhoto">Add image of your driving license</label>
									<input 
											type="file"
											className={formErrors.licensePhoto.length > 0 ? "error":null}
											name="licensePhoto"
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.licensePhoto.length > 0 && (
											<span className="errorMessage">{formErrors.licensePhoto}</span>
									)}
                </div>

                <div className="state">
									<label htmlFor="rcPhoto">Add image of your RC-book</label>
									<input 
											type="file"
											className={formErrors.rcPhoto.length > 0 ? "error":null}
											name="rcPhoto"
											onChange={handleChange}
									/>
									{/* displaying error msg */}
									{ formErrors.rcPhoto.length > 0 && (
											<span className="errorMessage">{formErrors.rcPhoto}</span>
									)}
                </div>

                <div className="createAccount">
                    <button type="submit">Reserve Parking</button>
                </div>

              </form>

            </div>

          </div>


        </>
      ):(
        // when user direct backdoor to the url
        <>
          <div className="booking__backdoor">
            <h4>first select parking location</h4>
            <Button onClick={()=>history.push('/nearbyLocation')}>search nearby</Button>
          </div>
        </>
      )}

    </div>
  )
}

export default ConfirmBooking
