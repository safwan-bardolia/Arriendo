import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { setPositions } from '../features/positionSlice';
import { selectUser } from '../features/userSlice';
import './App.css'
import Footer from './Footer';
import Home from './Home';
import Hosting from './Hosting';
import Login from './Login';
import Nav from './Nav';

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

                            <Route path="/hosting">
                                <Hosting/>
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
