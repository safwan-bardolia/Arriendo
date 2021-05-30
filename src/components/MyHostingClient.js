import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import myHostingClientApi from '../api/myHostingClientApi';
import { selectUser } from '../features/userSlice';
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import './MyHostingClient.css'
import MyHostingClientResult from './MyHostingClientResult';

function MyHostingClient() {

  const user = useSelector(selectUser);

  const[clients,setClients] = useState([]);

  useEffect(()=>{
    async function check() {
      try{
        const resp = await myHostingClientApi.get(`/myhostingclients/${user.uid}`);
        console.log(resp.data);
        setClients(resp.data);
      } catch(err) {
        console.log(err);
      }
    }

    check();

  },[user.uid])

  return (
    <div className="myHostingClient">
      {clients?.length > 0?(
        <>
          <div className="myHostingClient__header">
            <h1>{`Welcome back ${user.email}`}</h1>
            <p>Below are your client request.</p>
          </div>
          {clients.map((client)=> <MyHostingClientResult key={client.uid} client={client} /> )}
        </>
      ):(
        <>
          <div className="not__register">
            
            <div className="not__register__top">
              <h4>you don't have any client request</h4>
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

export default MyHostingClient
