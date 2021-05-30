import { Avatar} from '@material-ui/core';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import myBookingApi from '../api/myBookingApi';
import './MyHostingClientResult.css'
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { useHistory } from 'react-router';

function MyHostingClientResult({client}) {

  const history = useHistory();

  // fetch the booking record for current client using driver_uid 
  const[clientData, setClientData] = useState(null);

  useEffect(()=>{
    async function fetch() {
      try {
        const resp = await myBookingApi.get(`/mybookings/${client.driver_uid}`)
        console.log(resp.data)
        setClientData(resp.data)
      } catch(err) {
        console.log(err);
      }
    }
    fetch();
  },[client.driver_uid])

  const selectClient = () => {
    history.push({
      pathname:'/myclients/info',
      clientData: clientData
    })
  }

  {/* <a style={{display: "table-cell"}} href="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e" target="_blank" rel = "noopener noreferrer">license photo</a> */}
  {/* <a style={{display: "table-cell"}} href={clientData?.licensePhotoUri} target="_blank" rel = "noopener noreferrer">license photo</a> */}
  return (
    <div className="myHostingClientResult">

      <div className="myHostingClientResult__left" onClick={selectClient}>
        <h5><EventIcon/>{`date: ${clientData?.date}`}</h5>
        <h5><TimerIcon/>{`check-in: ${clientData?.checkInTime}`}</h5>
        <h5><TimerOffIcon/>{`check-out: ${clientData?.checkOutTime}`}</h5>
      </div>
      
      <div className="myHostingClientResult__middle">
        <p onClick={selectClient}>{`name: ${clientData?.fullName} | mobile: ${clientData?.mobile}`}</p>
        <h4 onClick={selectClient}><LocalTaxiIcon/>{`car-type: ${clientData?.carType} | car-number: ${clientData?.carNumber}`} </h4>      
        <p className="dash" onClick={selectClient}>_____</p>
        <p onClick={selectClient}>{`license-number: ${clientData?.licenseNumber}`}</p>
        <div className="myHostingClientResult__middle__link">
          <a className="link" href={clientData?.licensePhotoUri} target="_blank" rel = "noopener noreferrer">license</a>
          <a className="link" href={clientData?.rcPhotoUri} target="_blank" rel = "noopener noreferrer">RC</a>
          <a className="link" href={clientData?.aadharFileUri} target="_blank" rel = "noopener noreferrer">ID</a>
        </div>
      </div>

      <div className="myHostingClientResult__right" onClick={selectClient}>
        <Avatar className="avatar" src={clientData?.userProfileUrl}/>
      </div>
    
    </div>
  )
}

export default MyHostingClientResult
