import { Avatar, IconButton } from '@material-ui/core'
import { ExpandMore, Language, Search } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import "./Nav.css"

function Nav() {

    // to keep track of URL
    const history = useHistory();

    // get the user data from userSlice
    const user = useSelector(selectUser);

    return (
        <div className="nav">

            <img className="nav__icon" onClick={()=>history.push('/')} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/768px-Airbnb_Logo_B%C3%A9lo.svg.png" alt=""/>
            
            <div className="nav__middle">
                <input type="text" placeholder="search"/>
                <Search className="nav__middle__search"/>
            </div>
            
            <div className="nav__right">

                <div className="nav__right__host" onClick={()=>history.push('/hosting')}>
                    <p>Switch hosting</p>
                    <Language className="nav__language"/>
                </div>
                    
                <div className="nav__right__dropdown">                    
                    <IconButton className="nav__expandmore">
                        <ExpandMore className="nav__expandmore"/>
                    </IconButton>
                    <div className="dropdown__content">
                        <h6>Logout</h6>
                        <h6>profile</h6>
                        <h6 className="logout" onClick={()=>auth.signOut()}>Logout</h6>
                    </div>
                </div>    
                
                <IconButton className="nav__avatar" onClick={()=>auth.signOut()}>
                    <Avatar src={user.photo}/>
                </IconButton>
                
            </div>
       
        </div>
    )
}

export default Nav
