import { Button } from '@material-ui/core';
import { CheckSharp, Error, Lock, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import hostingApi from '../api/hostingApi';
import hostingLocationApi from '../api/hostingLocationApi';
import myBookingApi from '../api/myBookingApi';
import myHostingClientApi from '../api/myHostingClientApi';
import { selectUser } from '../features/userSlice';
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import './MyBooking.css'

function MyBooking() {

  // to keep track of url
  const history = useHistory();

  const user = useSelector(selectUser);

  // because we fetch data from multiple api using f_key
  const[myBookingData, setMyBookingData] = useState({
    booking:null,
    hosting:null,
    location:null
  });

  console.log(myBookingData)

  useEffect(()=>{

    async function check() {
      try {
        // fetch the booking record of current user
        const bookingResp = await myBookingApi.get(`/mybookings/${user.uid}`);

        // then fetch hosting info of that booking
        const hostResp = await hostingApi.get(`/hostings/${bookingResp.data.host_uid}`);
        
        // then fetch hostingLocation info of that booking
        const locResp = await hostingLocationApi.get(`/hostinglocations/${bookingResp.data.host_uid}`);
  
        setMyBookingData({
          ...myBookingData,
          booking: bookingResp.data,
          hosting:hostResp.data,
          location:locResp.data
        })

      } catch(err) {
        console.log(err);
      }
    }

    check();

  },[user.uid])

  // cancel Booking
  const cancelBooking = async() => {
    if(window.confirm(`${myBookingData.booking.fullName} are you sure, you want to cancel your booking?`)) {
      try {
        // delete my_booking record
        const resp = await myBookingApi.delete(`/mybookings/${user.uid}`);

        // delete my_hosting_client record (so host doesnt see this req anymore)
        const myHostingClient_pk = myBookingData.booking.host_uid+user.uid;
        const resp1 = await myHostingClientApi.delete(`/myhostingclients/${myHostingClient_pk}`)

        // without this component will not re-render  
        setMyBookingData({
          booking:null,
          hosting:null,
          location:null
        })

        alert("your parking request cancel successfully")

      } catch(err) {
        alert(err);
      }
    }
  }

  return (
    <div className="myBooking">
      {myBookingData.booking?(
        <>
          {/* check if host has acknowledge his parking space */}
          {myBookingData.booking.confirmation===true?(
            <>
              ****host has acknowledge you
            </>
          ):(
            // host has not acknowledge your req yet
            <>
              <div className="myBooking__notConfirm">
                <div className="myBooking__notConfirm__left">
                  <h1>booking request is send</h1>
                  <h4><Error/> Host has not acknowledge your request yet</h4>
                </div>
                <Button onClick={cancelBooking}>
                  cancel booking
                </Button>
              </div>
            </>
          )}
        </>
      ):(
        <>
          <div className="not__register">
            
            <div className="not__register__top">
              <h4>you dont have any booking yet</h4>
                                
              <Button onClick={()=>history.push("/nearbyLocation")}>
                nearbyLocation
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

export default MyBooking
