import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { login, logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import './App.css'
import Banner from './Banner';
import Hosting from './Hosting';
import Login from './Login';
import Nav from './Nav';

const App = () => {

    // to dispatch the action (i.e update redux-store )
    const dispatch = useDispatch();

    // get the user data from userSlice
    const user = useSelector(selectUser);

    useEffect(()=>{

        auth.onAuthStateChanged((authUser)=>{
            // if user is present then dipatch the login action
            if(authUser) {
                dispatch(login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName
                }))
            } else {
                // dispatch logout action
                dispatch(logout());
            }
        })
    }, [dispatch])
    
    return (
        <div className="app">
            {/* if user is present then render rest of the app otherwise display login component */}
            {user? (
                <>
                    <BrowserRouter>
                        
                        <Nav/>

                        <Switch>

                            <Route path="/hosting">
                                <Hosting/>
                            </Route>
                            <Route path="/">
                                <Banner/>
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
