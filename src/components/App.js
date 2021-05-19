import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setPositions } from '../features/positionSlice';
import { selectUser } from '../features/userSlice';
import './App.css'
import Footer from './Footer';
import Home from './Home';
import HostingForm from './HostingForm';
import HostingProfile from './HostingProfile';
import HostMain from './HostMain';
import Login from './Login';
import Nav from './Nav';
import Map from "./Map"
import ProfileMap from './ProfileMap';
import NearbyLocation from './NearbyLocation';
import Booking from './Booking';

const App = () => {

    // to dispatch the action (i.e update redux-store )
    const dispatch = useDispatch();

    // get the user data from userSlice
    const user = useSelector(selectUser);

    
    useEffect(()=>{
        
        if(user != null) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(setPositions({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }))
                },
                (err) => {
                    alert("please allow gps location or else it uses default location")
                }
            )            
        }
    }, [dispatch, user])
    
    return (
        <div className="app">
            {/* if user is present then render rest of the app otherwise display login component */}
            {user? (
                <>
                    <BrowserRouter>
                        
                        {/* on top of all the pages */}
                        <Nav/>

                        <Switch>

                            <Route exact path="/booking">
                                <Booking/>
                            </Route>


                            <Route exact path="/nearbyLocation">
                                <NearbyLocation/>
                            </Route>

                            <Route exact path="/hosting/main">
                                <HostMain/>
                            </Route>

                            <Route path="/hosting/form">
                                <HostingForm/>
                            </Route>

                            <Route exact path="/hosting/map">
                                <Map/>
                            </Route>

                            <Route exact path="/profile">
                                <HostingProfile/>
                                {/* <Footer/> */}
                            </Route>

                            <Route exact path="/mapprofile">
                                <ProfileMap/>
                            </Route>
                            
                            <Route path="/">
                                <Home/>
                                <Footer/>
                            </Route>

                        </Switch>                        

                    </BrowserRouter>
                </>
            ):(
                <Login/>
            )}
        </div>
    )
}

export default App
