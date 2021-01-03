import React from 'react'
import Map from "./Map"
import "./Hosting.css"
import HostingForm from './HostingForm';
import { selectLat, selectLng } from '../features/positionSlice';
import { useSelector } from 'react-redux';

function Hosting(props) {

    const lat = useSelector(selectLat);
    const lng = useSelector(selectLng);

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
					center={{lat: lat, lng: lng}}
					height='300px'
					zoom={15}
				/>
			</div>
        </div>
    )
}

export default Hosting
