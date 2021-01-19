import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import hostingApi from '../api/hostingApi';
import { selectUser } from '../features/userSlice'
import "./HostingForm.css"

function HostingForm() {

    // to track the url
    const history = useHistory();

    // get the userInfo from userSlice
    const user = useSelector(selectUser);

    // state vales
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [formErrors, setFormErrors] = useState();

    const [formData, setFormData] = useState({
        fullName:"",
        mobile:"",
        description:"",
        totalVehicles:1,
        fees:20,
        aadharFile:null,
        residentialFile:null,
        parkingPhoto:null,  
        formErrors:{
            fullName:"",
            mobile:"",
            description:"",
            totalVehicles:"",
            fees:"", 
            aadharFile:"" ,
            residentialFile:"",
            parkingPhoto:"",
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
            
            // call the backend api here

            console.log(`
            --SUBMITTING--
            Full NAME: ${formData.fullName}
            Mobile: ${formData.mobile}
            Description: ${formData.description}
            Total Vehicles: ${formData.totalVehicles}
            Fees: ${formData.fees}
            Aadhar: ${formData.aadharFile}
            Residential proof: ${formData.residentialFile}
            Parking photo: ${formData.parkingPhoto}
            `)

    
            // clear the form
            setFormData((prevState) => ({
                ...prevState,
                fullName:"",
                mobile:"",
                description:"",
                totalVehicles:1,
                fees:20,
                aadharFile:null,
                residentialFile:null,
                parkingPhoto:null,  
                formErrors:{
                    fullName:"",
                    mobile:"",
                    description:"",
                    totalVehicles:"",
                    fees:"", 
                    aadharFile:"",
                    residentialFile:"",
                    parkingPhoto:"" 
                }        
            }))
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

            case 'description':
              formErrors.description = value.length < 6 ? "minimum 6 characters required, description" : "";
              break;      
      
            case 'aadharFile':
              // if file is present then e.target.files.length is 1
              console.log(e.target.files);
              formErrors.aadharFile = e.target.files.length===0 ? `please add ${name}` : "";
              if(e.target.files.length!==0) {
                value = e.target.files[0];
              }
              break;  
      
            case 'residentialFile':
              formErrors.residentialFile = e.target.files.length===0 ? `please add ${name}` : "";
              if(e.target.files.length!==0) {
                value = e.target.files[0];
              }  
              break;

            case 'parkingPhoto':
              formErrors.parkingPhoto = e.target.files.length===0 ? `please add ${name}` : "";
              if(e.target.files.length!==0) {
                value = e.target.files[0];
              }  
              break;
  

            // case 'password':  
            //   formErrors.password = value.length < 6 ? "minimum 6 characters required,password" : "";
            //   break;
            
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

        <div className="hostingForm">
            
            <div className="hostingForm__body">
                
                <h1>Hosting Info</h1>
                
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
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text"
                            className={formErrors.description.length > 0 ? "error":null}
                            placeholder="Slot description E.g CCTV, security guard etc"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {/* displaying error msg */}
                        { formErrors.description.length > 0 && (
                            <span className="errorMessage">{formErrors.description}</span>
                        )}
                    </div>
                    
                    <div className="totalVehicles">
                        <label htmlFor="totalVehicles">No of vehicles can be parked?</label>
                        <select 
                            // type="text"
                            // className={formErrors.totalVehicles.length > 0 ? "error":null}
                            // placeholder="totalVehicles"
                            name="totalVehicles"
                            value={formData.totalVehicles}
                            onChange={handleChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                        {/* displaying error msg */}
                        {/* { formErrors.totalVehicles.length > 0 && (
                            <span className="errorMessage">{formErrors.totalVehicles}</span>
                        )} */}
                    </div>

                    <div className="fees">
                        <label htmlFor="fees">Fees per hour</label>
                        <select 
                            // type="password"
                            // className={formErrors.password.length > 0 ? "error":null}
                            // placeholder="Password"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                        >
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="100">100</option>
                            <option value="120">120</option>
                            <option value="150">150</option>
                        </select>
                        {/* displaying error msg */}
                        {/* { formErrors.fees.length > 0 && (
                            <span className="errorMessage">{formErrors.fees}</span>
                        )} */}
                    </div>

                    <div className="aadharFile">
                        <label htmlFor="aadharFile">Id proof E.g aadhar, Pan etc</label>
                        <input 
                            type="file"
                            className={formErrors.aadharFile.length > 0 ? "error":null}
                            name="aadharFile"
                            onChange={handleChange}
                        />
                        {/* displaying error msg */}
                        { formErrors.aadharFile.length > 0 && (
                            <span className="errorMessage">{formErrors.aadharFile}</span>
                        )}
                    </div>

                    <div className="residentialFile">
                        <label htmlFor="residentialFile">Residential proof E.g electricity-bill etc</label>
                        <input 
                            type="file"
                            className={formErrors.residentialFile.length > 0 ? "error":null}
                            name="residentialFile"
                            onChange={handleChange}
                        />
                        {/* displaying error msg */}
                        { formErrors.residentialFile.length > 0 && (
                            <span className="errorMessage">{formErrors.residentialFile}</span>
                        )}
                    </div>

                    <div className="parkingPhoto">
                        <label htmlFor="parkingPhoto">Add image of parking spot</label>
                        <input 
                            type="file"
                            className={formErrors.parkingPhoto.length > 0 ? "error":null}
                            name="parkingPhoto"
                            onChange={handleChange}
                        />
                        {/* displaying error msg */}
                        { formErrors.parkingPhoto.length > 0 && (
                            <span className="errorMessage">{formErrors.parkingPhoto}</span>
                        )}
                    </div>

                    <div className="createAccount">
                        <button type="submit">Move to next step</button>
                        <small>you are just 3 steps away from making your own profit</small>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default HostingForm
