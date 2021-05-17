import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import "./Banner.css"

function Banner() {

    // to keep track of url
    const history = useHistory();

    return (
        <div className="banner">
            <div className="banner__content">
                <h1>Rent Parking</h1>
                <h5>park the car without any issue</h5>
                <Button onClick={()=>history.push('/nearbyLocation')}>Search Nearby</Button>
            </div>
        </div>
    )
}

export default Banner
