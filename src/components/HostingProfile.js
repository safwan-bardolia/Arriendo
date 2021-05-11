import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import hostingApi from '../api/hostingApi';
import { selectUser } from '../features/userSlice';
import { AttachMoney, Call, CheckSharp, Flag, Home, Info, LocalParking, LocationCity, Lock, Person, SupervisedUserCircle } from '@material-ui/icons';
import HostingInfo from './HostingInfo';
import "./HostingProfile.css"
import HostingForm from './HostingForm';
import Card from './Card';
import hostingLocationApi from '../api/hostingLocationApi';
import Footer from './Footer';

function HostingProfile() {

    // to track url
    const history = useHistory();

    // component state
    const[hostingData, setHostingData] = useState(null);

    // we pass this state to HostingForm comp (to rerender this component) i.e after update changes must be shown
    const[rerender, setRerender] = useState(false);

    // get the userInfo from userSlice
    const user = useSelector(selectUser)

    // ComponentWillMountHook (because we want re-initialize state)
    // because There is no built-in way to set the state to its initial value, sadly.

    // useMemo(()=>{
    //     console.log("before render")
    //     setRerender(false)
    // },[])

    // above function run only one time before component initially render,
    // so, that's why we have call setRerender in useEffect()

    // get the user's hosting info from db at the start of this component
    useEffect(()=>{

        setRerender(false)

        // if user is not present in db then catch function will called & hostingData will remain null
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
    },[user.uid, rerender])

    // delete the record
    const deleteProfile = () => {
        if(window.confirm(`${hostingData.fullName} do you want to delete your hosting profile ? it will also delete your location`)) {
            // delete hosting record 
             hostingApi.delete(`/hostings/${user.uid}`)
             .then(resp=>{
                 console.log(resp.data);

                 // without this component will not re-render  
                 setHostingData(null);
                 
                 alert("record deleted successfully")
             })
             .catch(err=>{
                 console.log(err);
             })

            // delete location also
            hostingLocationApi.delete(`/hostinglocations/${user.uid}`)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    // const downloadFile = (file) => {
    //     hostingApi.get(`/hostings/download${file}Proof/${user.uid}`)
    //     .then(response=>{

    //         console.log(response)

    //         var filename =  response.headers["content-disposition"].split("filename=")[1];
            
    //         // to remove "" (i.e "filename.type" & we only want filename.type)
    //         // const filename =  str.substring(1,str.length-1);
            
    //         // let url=  window.URL.createObjectURL(new Blob([response.data], {'type': `${response.headers["content-type"]}`}));
    //         // // let url = window.URL.createObjectURL(response.data);
            
    //         // let a = document.createElement('a');
    //         // a.href = url;
    //         // a.download = filename;
    //         // a.click();
            
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }
    
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

                    <div className="hostingFormProfile__mid">
                        <div className="hostingFormProfile__mid__info">
                            <Person/>
                            <h4>{hostingData.fullName}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <Call/>
                            <h4>{hostingData.mobile}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <LocalParking/>
                            <h4>{hostingData.totalVehicles}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <AttachMoney/>
                            <h4>{hostingData.fees}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <Info/>
                            <h4>{hostingData.description}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <Flag/>
                            <h4>{hostingData.country}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <Info/>
                            <h4>{hostingData.state}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <LocationCity/>
                            <h4>{hostingData.city}</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info">
                            <Home/>
                            <h4>{hostingData.address}</h4>
                        </div>
                        {/* <div className="hostingFormProfile__mid__info file">
                            <FileCopy/>
                            <h4>download Id proof</h4>
                            <img src={hostingData.aadharFileUri}/>
                        </div>
                        <div className="hostingFormProfile__mid__info file">
                            <FileCopy/>
                            <h4>download Residential proof</h4>
                        </div>
                        <div className="hostingFormProfile__mid__info file">
                            <FileCopy/>
                            <h4>download parking Photo</h4>
                        </div> */}
                    </div>
                        
                    <div className="hostingFormProfile__card">
                        <Card
                            // src={hostingData.aadharFileUri}
                            src=""
                            title="parking image"
                        />
                        <Card
                            src=""
                            title="Id proof"
                        />
                        <Card
                            src=""
                            title="residential proof"
                        />
                    </div>

                    {/* in case of update we pass this props */}
                    <HostingForm update="update" hostingData={hostingData} setRerender={setRerender}/>
                </>
            ):(
                <>
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
                    <Footer/>
                </>    
            )}
        </div>
    )
}

export default HostingProfile
