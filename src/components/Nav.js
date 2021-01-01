import { Avatar, IconButton } from '@material-ui/core'
import { ExpandMore, Language, Search } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectUser } from '../features/userSlice'
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
                <input type="text" placeholder="start your search"/>
                <Search className="nav__middle__search"/>
            </div>
            
            <div className="nav__right">

                <div className="nav__right__host" onClick={()=>history.push('/hosting')}>
                    <p>Switch hosting</p>
                    <Language/>
                </div>
                    
                <IconButton>
                    <ExpandMore/>
                </IconButton>
                
                <IconButton>
                    <Avatar src={user.photo}/>
                </IconButton>
                
            </div>
       
        </div>
    )
}

export default Nav
