import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import myBookingApi from '../api/myBookingApi';
import './MyHostingClientResult.css'

function MyHostingClientResult({client,setRenderList}) {

  // fetch the booking record for current using driver_uid 
  const[clientData, setClientData] = useState(null);

  useEffect(()=>{
    async function fetch() {
      try {
        const resp = await myBookingApi.get(`/mybookings/${client.driver_uid}`)
        setClientData(resp.data)
      } catch(err) {
        console.log(err);
      }
    }
    fetch();
  },[])

  return (
    <div className="myHostingClientResult">
      <h4>{clientData?.email}</h4>
      <p>{clientData?.fullName}</p>   
    </div>
  )
}

export default MyHostingClientResult
