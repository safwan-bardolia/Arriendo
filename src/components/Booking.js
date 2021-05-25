import { Avatar, Button } from '@material-ui/core';
import { Call, Description, Highlight, LocalParking, MeetingRoom, Star, ThumbUpAlt, VpnKey } from '@material-ui/icons';
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import './Booking.css'

function Booking() {

  const history = useHistory();

  // for accessing Passed parameters with history push:
  const location = useLocation();
  console.log(location.hostingInfo)

  // create shortcut
  const hostingInfo = location?.hostingInfo?.properties;
  const hostingInfoCoordinates = location?.hostingInfo?.geometry?.coordinates;

  // on form submit
  const booking = (e) => {
    e.preventDefault();
    // get the form values
    const formValues = document.getElementById('booking__paymentcard').elements;
    const parkingDuration = {};
    for(var i=0;i<formValues.length-1;i++) {
      const item = formValues.item(i);
      parkingDuration[item.name] = item.value; 
    }
    
    // send to next component
    history.push({
      pathname:'/confirmBooking',
      hostingInfo: hostingInfo,
      hostingInfoCoordinates: hostingInfoCoordinates,
      parkingDuration: parkingDuration
    })
  }

  console.log(hostingInfoCoordinates);
  return (
    <div className="booking">
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

          <div className="booking__img__card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU" alt=""/>
            <form id="booking__paymentcard" className="booking__paymentcard" onSubmit={booking}>
              <h4>{`₹${hostingInfo.fees} / hour`}</h4>
              <div className="booking__paymentcard__input">
                <div className="booking__paymentcard__date">
                  <h4>CHECK-IN</h4>
                  <input name="date" type="date" required/>
                </div>
                <div className="booking__paymentcard__checkIntime">
                  <h4>CHECK-IN-TIME</h4>
                  <input name="check-in-time" type="time" required/>
                </div>
                <div className="booking__paymentcard__checkouttime">
                  <h4>CHECK-OUT-TIME</h4>
                  <input name="check-out-time" type="time" required/>
                </div>
              </div>
              <Button type="submit">Reserve</Button>
            </form>
          </div>

          <div className="booking__hosting">
            <div className="booking__hosting__left">
              <h4>{`Parking at home hosted by ${hostingInfo.fullName}`}</h4>
              <Avatar src={hostingInfo.userProfileUrl}/>
            </div>
            <h5><LocalParking/>{`Total space available for parking ${hostingInfo.totalVehicles}`}</h5>
          </div>

          <div className="booking__info">

            <div className="booking__info__item">
              <MeetingRoom fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>Self check-in</h3>
                <p>You can check in with the doorman.</p>
              </div>
            </div>
            <div className="booking__info__item">
              <Highlight fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>Clean and tidy</h3>
                <p>11 recent guests said this place was sparkling clean.</p>
              </div>
            </div>
            <div className="booking__info__item">
              <VpnKey fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>Great check-in experience</h3>
                <p>95% of recent guests gave the check-in process a 5-star rating.</p>
              </div>
            </div>
            <div className="booking__info__item">
              <ThumbUpAlt fontSize="large"/>
              <div className="booking__info__item__detail">
                <h3>Outstanding hospitality</h3>
                <p>10 recent guests complimented this parking for outstanding hospitality.</p>
              </div>
            </div>

          </div>
          
          <div className="booking__description">
            <Description/>
             <p>{hostingInfo.description}</p>   
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

export default Booking
