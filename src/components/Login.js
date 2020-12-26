import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import './Login.css'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/768px-Airbnb_Logo_B%C3%A9lo.svg.png" alt=""/>
            </div>
            <Button type="submit" onClick={signIn}>
                sign In with google
            </Button>
        </div>
    )
}

export default Login
