import { Avatar, Button } from '@material-ui/core';
import { Call, Check, CheckSharp, Delete, Info, LocalTaxi, Lock, Photo, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import './MyHostingClientResultInfo.css'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AirportShuttleTwoToneIcon from '@material-ui/icons/AirportShuttleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import myBookingApi from '../api/myBookingApi';
import myHostingClientApi from '../api/myHostingClientApi';
import hostingApi from '../api/hostingApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice'
import { useState } from 'react';

function MyHostingClientResultInfo() {

  const history = useHistory();

  const user = useSelector(selectUser);

  // for accessing Passed parameters with history push:
  const location = useLocation();

  // create shortcut
  const [clientData, setClientData] = useState(location?.clientData);
  console.log(clientData)
  console.log(`${clientData?.confirmation==='false'?"visible":"hide"}`)

  // accept client req so that it can navigate to your location
  const acceptReq = async() => {
    try{
      // check if the parking space available? for host
      const resp = await hostingApi.get(`/hostings/${clientData.host_uid}`)

      if(resp.data.totalVehicles===0) {
        alert("!parking space is full, you cannot allocate him the parking space");
      } else {
        
        // release your parking space
        const formInfo = new FormData();
        formInfo.append('uid', clientData.host_uid);
        formInfo.append('totalVehicles',resp.data.totalVehicles-1);
        const resp1 = await hostingApi.patch("/hostings", formInfo); 

        // acknowledge your client
        const formInfo1 = new FormData();
        formInfo1.append('c_uid', clientData.c_uid);
        formInfo1.append('confirmation','true');
        const resp2 = await myBookingApi.patch("/mybookings", formInfo1);

        // send otp
        hostingApi.get(`/hostings/${user.email}/${clientData.email}/${clientData.fullName}/${clientData.mobile}`);

        alert("request accepted successfully, now verify the client in-person i.e otp")

        // update state(because we are not fetching from db after rerendering)
        setClientData({
          ...clientData,
          confirmation: 'true'
        })
      }

    } catch(err) {
      alert(err);
    }
  }
  
  // delete client req if info are wrong or invalid
  const deleteReq = async() => {
    if(window.confirm("are you sure, you want to delete this client request")) {
      try{
        // delete my_booking record
        const resp = await myBookingApi.delete(`/mybookings/${clientData.c_uid}`);

        // delete my_hosting_client record (so host doesnt see this req anymore)
        const myHostingClient_pk = clientData.host_uid+clientData.c_uid;
        const resp1 = await myHostingClientApi.delete(`/myhostingclients/${myHostingClient_pk}`);

        alert("client request deleted successfully");

        history.push("/myclients");

      } catch (err) {
        alert(err);
      }
    }
  }



  return (
    <div className="myHostingClientResultInfo">
      {clientData?(
        <>
          <div className="booking__header">
            <h1>client details</h1>
            <div className="booking__header__info">
              <div className="booking__header__info__left">
                <div className="booking__header__info__rating">
                  <PermIdentityIcon/>
                </div>
                <h4>{`${clientData.fullName}`}</h4>
              </div>
              <div className="booking__header__info__right">
                {/* <HearingTwoTone/>
                <List/> */}
                <Call/>
                {clientData.mobile}
              </div>
            </div>
          </div>

					<div className="confirmBooking__time">
						<div className="confirmBooking__time__left">
							<h2>Date and time of parking request</h2>
							<div className="confirmBooking__time__left__field">
									<h4>Date</h4>
									<h5>{clientData.date}</h5>
							</div>
							<div className="confirmBooking__time__left__field">
									<h4>CHECK-IN-TIME</h4>
									<h5>{clientData.checkInTime}</h5>
							</div>
							<div className="confirmBooking__time__left__field">
									<h4>CHECK-OUT-TIME</h4>
									<h5>{clientData.checkOutTime}</h5>
							</div>
						</div>
						{/* <div className="confirmBooking__time__right">
							<img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"/>
							<p>{clientData.description}</p>
							<div className="confirmBooking__time__right__info">
								<h2>Price details</h2>
								<h5>{`₹${clientData.fees} / hour`}</h5>
							</div>
						</div>       */}
					</div>

          <div className="booking__hosting">
            <div className="booking__hosting__left">
              <h4><AirportShuttleTwoToneIcon/>{`car detail: ${clientData.carType}`}</h4>
              <Avatar src={clientData.userProfileUrl}/>
            </div>
          </div>

          <div className="booking__info">

            <div className="booking__info__item">
              <LocalTaxi fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>Car number</h3>
                <p>{clientData.carNumber}</p>
              </div>
            </div>
            <div className="booking__info__item">
              <DescriptionTwoToneIcon fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>License number</h3>
                <p>{clientData.licenseNumber}</p>
              </div>
            </div>
            <div className="booking__info__item">
              <Photo fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>License photo</h3>
                <a className="link" href={clientData?.licensePhotoUri} target="_blank" rel = "noopener noreferrer">link</a>
              </div>
            </div>
            <div className="booking__info__item">
              <Photo fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>RC photo</h3>
                <a className="link" href={clientData?.rcPhotoUri} target="_blank" rel = "noopener noreferrer">link</a>
              </div>
            </div>
            <div className="booking__info__item">
              <Photo fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>ID proof</h3>
                <a className="link" href={clientData?.aadharFileUri} target="_blank" rel = "noopener noreferrer">link</a>
              </div>
            </div>

          </div>

          <div className={`myHostingClientResultInfo__accept__reject_one ${clientData?.confirmation==='false'? "":"hide__info"}`}>
            <p><Info/> accept the client request if details are valid otherwise reject client request.</p>
            <div className="myHostingClientResultInfo__accept__reject_one__button">
              <Button onClick={acceptReq} className="myHostingClientResultInfo__accept__btn"><Check/>accept</Button>
              <Button onClick={deleteReq} className="myHostingClientResultInfo__reject__btn"><Delete/>reject</Button>
            </div>
          </div>  

          <div className={`myHostingClientResultInfo__accept__reject_one ${clientData?.confirmation==='true' && clientData?.final_confirmation==='false'? "":"hide__info"}`}>
            <p><Info/> verify the otp and documents when client reach to your location. once you verify it you are giving all the rights to the client to park his car</p>
            <div className="myHostingClientResultInfo__accept__reject_one__button">
              <Button className="myHostingClientResultInfo__accept__btn"><Check/>verify</Button>
              <Button className="myHostingClientResultInfo__reject__btn"><Delete/>reject</Button>
            </div>
          </div>  

        </>
      ):(
        // when user direct back-door to the system
        <>
          <div className="not__register">
            
            <div className="not__register__top">
              <h4>Access denied</h4>
                                
              <Button onClick={()=>history.push("/myclients")}>
                My clients
              </Button>
            </div>

            <div className="hosting__info">
              <HostingInfo
                  Icon={SupervisedUserCircle} 
                  title="Trust & Safety"
                  info="Trust & safety tools help you accept a booking only if you’re 100% comfortable."
              />
              <HostingInfo
                  Icon={CheckSharp} 
                  title="Host Guarantee"
                  info="Your peace of mind is priceless. So we don’t charge for it. Every eligible booking on Makent is covered by our Host Guarantee - at no additional cost to you."
              />
              <HostingInfo 
                  Icon={Lock} 
                  title="Secure payments"
                  info="Our fast, flexible payment system puts money in your bank account after guests check out."
                  last="last"
              />
            </div>
                        
          </div>
          <Footer/>        
        </>
      )}
    </div>
  )
}

export default MyHostingClientResultInfo
