import { Button } from '@material-ui/core'
import React,{useEffect} from 'react'
import { auth, provider } from '../firebase'
import { login, logout } from '../features/userSlice';
import './Login.css'
import { useDispatch } from 'react-redux';
import logo from '../img/logo.png'

function Login() {

    // to dispatch the action (i.e update redux-store )
    const dispatch = useDispatch();

    useEffect(()=>{

        // listen to auth.signIn() & auth.signOut()   
        // (auth.onAuthStateChanged in useEffect?? because at the start of this component we register this function)
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

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt=""/>
            </div>
            <Button type="submit" onClick={signIn}>
                sign In with google
            </Button>
        </div>
    )
}

export default Login
