import { Button } from '@material-ui/core';
import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import hostingLocationApi from '../api/hostingLocationApi';
import { selectUser } from '../features/userSlice';
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import './ProfileMap.css'
import UpdateMap from './UpdateMap';


function ProfileMap() {

  // to keep track of url
  const history = useHistory();

  const[locationData, setLocationData] = useState(null);

  // this will rerender compponent (i.e after update)
  const[render, setRender] = useState(false);

  const user = useSelector(selectUser);

  useEffect(()=>{
    // if location is not present in db then catch function will called & locationData will remain null
    async function getLocation() {
      hostingLocationApi.get(`/hostinglocations/${user.uid}`)
      .then(resp=>{
        console.log(resp.data);
        setLocationData(resp.data);
      })
      .catch(err=>{
        console.log(err);
      })  
    }
    getLocation();
  },[user.uid,render])

  // delete location
  const deleteLocation = () => {
    if(window.confirm(`${user.displayName}, do you want to delete your location`)) {
      hostingLocationApi.delete(`/hostinglocations/${user.uid}`)
      .then(resp=>{
        console.log(resp);
        // without this component will not re-render
        setLocationData(null);
        alert("location deleted successfully")
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

  return (
    <div className="profilemap">
      {locationData?(
        <>
          <div className="profilemap__top">
            <div className="profilemap__topleft">
                <h1>Profile</h1>
                <h4>{user.email}.</h4>
            </div>
            <Button onClick={deleteLocation}>
                delete location
            </Button>
          </div>
          <UpdateMap locationData={locationData}/>
        </>
      ):(
        <>
          <div className="not__register">
            
            <div className="not__register__top">
              <h4>you have not added your location yet</h4>
                                
              <Button onClick={()=>history.push("/hosting/map")}>
                  add location
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

export default ProfileMap
