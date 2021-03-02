import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import hostingApi from '../api/hostingApi';
import { selectUser } from '../features/userSlice';
import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import HostingInfo from './HostingInfo';
import "./HostingFormProfile.css"
import HostingForm from './HostingForm';

function HostingFormProfile() {

    // to track url
    const history = useHistory();

    // component state
    const[hostingData, setHostingData] = useState(null);

    // get the userInfo from userSlice
    const user = useSelector(selectUser)

    // get the user's hosting info from db at the start of this component
    useEffect(()=>{
        async function getUser() {
            hostingApi.get(`/hostings/${user.uid}`)
            .then(resp=>{
                console.log(resp.data);
                setHostingData(resp.data);
            })
            .catch(err=>{
                console.log(err.message)
            })
        }

        getUser();
    },[user.uid])

    // delete the record
    const deleteProfile = () => {
        if(window.confirm(`${hostingData.fullName} do you want to delete your hosting profile ?`)) {
             hostingApi.delete(`/hostings/${user.uid}`)
             .then(resp=>{
                 console.log(resp);

                 // without this component will not re-render  
                 setHostingData(null);
                 
                 alert("record deleted successfully")
             })
             .catch(err=>{
                 console.log(err);
             })
        }
    }

    return (
        <div className="hostingFormProfile">
            {hostingData? (
                <>
                    <div className="hostingFormProfile__top">
                        <div className="hostingFormProfile__topleft">
                            <h1>Profile</h1>
                            <h4>{user.email}.</h4>
                        </div>
                        <Button onClick={deleteProfile}>
                            delete profile
                        </Button>
                    </div>

                    {/* in case of update we pass this props */}
                    <HostingForm update="update" hostingData={hostingData}/>
                </>
            ):(
                    <div className="not__register">

                        <div className="not__register__top">
                            <h4>you have not registered as hosting</h4>
                            
                            <Button onClick={()=>history.push("/hosting/form")}>
                                start hosting
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
            )}
        </div>
    )
}

export default HostingFormProfile
