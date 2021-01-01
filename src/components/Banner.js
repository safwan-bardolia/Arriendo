import { Button } from '@material-ui/core'
import React from 'react'
import "./Banner.css"

function Banner() {
    return (
        <div 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: "url('https://image.shutterstock.com/z/stock-photo-smartphone-application-for-online-searching-free-parking-place-on-the-map-gps-navigation-parking-709076695.jpg')",
                backgroundPosition: "center center"
            }}
        >
            <div className="banner__content">
                <h1>Rent Parking</h1>
                <Button>Search Nearby</Button>
            </div>
        </div>
    )
}

export default Banner
