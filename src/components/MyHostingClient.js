import { Button } from '@material-ui/core';
import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import myHostingClientApi from '../api/myHostingClientApi';
import { selectUser } from '../features/userSlice';
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import './MyHostingClient.css'
import MyHostingClientResult from './MyHostingClientResult';

function MyHostingClient() {

  // to keep track of url
  const history = useHistory();

  const user = useSelector(selectUser);

  // we pass this state to child, so if we reject any req in child it will cause the parent component to re-render
  const[renderList, setRenderList] = useState(false);

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

  },[])

  return (
    <div className="myHostingClient">
      {clients?.length > 0?(
        <>
          {clients.map((client)=> <MyHostingClientResult key={client.uid} client={client} setRenderList={setRenderList} /> )}
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
