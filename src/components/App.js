import { Avatar } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import './App.css'
import Login from './Login';

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
                    <Avatar onClick={()=>auth.signOut()} src={user.photo}/>
                </>
            ):(
                <Login/>
            )}
        </div>
    )
}

export default App
