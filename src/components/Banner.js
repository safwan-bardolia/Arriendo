import { Button } from '@material-ui/core'
import React from 'react'
import "./Banner.css"

function Banner() {
    return (
        <div className="banner">
            <div className="banner__content">
                <h1>Rent Parking</h1>
                <h5>park the car without any issue</h5>
                <Button>Search Nearby</Button>
            </div>
        </div>
    )
}

export default Banner
