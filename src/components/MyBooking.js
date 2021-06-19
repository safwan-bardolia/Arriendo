import { Avatar, Button } from '@material-ui/core';
import { Call, Check, CheckCircle, CheckSharp, Description, Error, LocalParking, Lock, Star, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useRef } from 'react';
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

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { selectLat, selectLng } from '../features/positionSlice';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fmd2FuLWJhcmRvbGlhIiwiYSI6ImNrb2IwaXI5MzAzYnkydm4xZWg4eDFkbmoifQ.2JbbEHLeVd5Y1BcuVHAyyQ';


function MyBooking() {

  // to keep track of url
  const history = useHistory(null);

  // get default value from slice
  const user = useSelector(selectUser);
  const lat = useSelector(selectLat);
  const lng = useSelector(selectLng);
  console.log(lng)

  // because we fetch data from multiple api using f_key
  const[myBookingData, setMyBookingData] = useState({
    booking:null,
    hosting:null,
    location:null
  });

  console.log(myBookingData)

  const loadMap=(destLng,destLat)=> {
    var map = new mapboxgl.Map({
      container: 'myBooking__map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      // center: [73,20],
      zoom: 9,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    })

    // for direction from source to destination
    map.addControl(directions,'top-left');

    map.on('load',()=> {
      directions.setOrigin([lng,lat]);
      directions.setDestination([destLng,destLat]);
    })

  }

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

        loadMap(locResp.data.longitude,locResp.data.latitude);

      } catch(err) {
        console.log(err);
      }
    }

    check();

  },[user.uid,lat,lng])

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

  const renderPayment = () => {
    if(myBookingData.booking.confirmation==='true' && myBookingData.booking.final_confirmation==='true'){
      history.push('/payment')
    }
  }

  return (
    <div className="myBooking">
      {myBookingData.booking?(
        <>
          {/* check if host has verify your documents in person & also otp */}
          {renderPayment()}

          {/* check if host has acknowledge his parking space */}
          {myBookingData.booking.confirmation==='true' && myBookingData.booking.final_confirmation==='false'?(
            <>
              <div className="myBooking__notConfirm">
                <div className="myBooking__notConfirm__left">
                  <h1><CheckCircle/> Host has acknowledge your request</h1>
                  <h4> when you reach to the location then you have verify otp & documents in person, until that you cannot park the car.</h4>
                </div>
                <Button onClick={cancelBooking}>
                  cancel booking
                </Button>
              </div>

              <div className="booking__header">
                <h1>{myBookingData.hosting.address}</h1>
                <div className="booking__header__info">
                  <div className="booking__header__info__left">
                    <div className="booking__header__info__rating">
                      <Star/>
                      4.3
                    </div>
                    <h4>{`${myBookingData.hosting.city},${myBookingData.hosting.state},${myBookingData.hosting.country}`}</h4>
                  </div>
                  <div className="booking__header__info__right">
                    {/* <HearingTwoTone/>
                    <List/> */}
                    <Call/>
                    {myBookingData.hosting.mobile}
                  </div>
                </div>
              </div>

              <div className="booking__hosting">
                <div className="booking__hosting__left">
                  <h4>{`Parking at home hosted by ${myBookingData.hosting.fullName}`}</h4>
                  <Avatar src={myBookingData.hosting.userProfileUrl}/>
                </div>
              </div>

              <div className="booking__description">
                <Description/>
                <p>{myBookingData.hosting.description}</p>   
              </div>      

              <div className="myBooking__map" id="myBooking__map"/>
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
