import React from 'react'
import Map from "./Map"
import "./Hosting.css"
import HostingForm from './HostingForm';

function Hosting(props) {


    return (
        <div className="hosting">

            <div className="hosting__header">
                <h1>Become a Host</h1>
                <p>Let's earn you money by renting out your parking area</p>
            </div>

            <HostingForm/>
            
            <div className="hosting__map">
				<Map
					google={props.google}
					center={{lat: 18.5204, lng: 73.8567}}
					height='300px'
					zoom={15}
				/>
			</div>
        </div>
    )
}

export default Hosting
