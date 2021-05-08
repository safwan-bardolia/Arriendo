import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './Map.css'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { selectLat, selectLng } from '../features/positionSlice';
import { selectUser } from '../features/userSlice';
import hostingLocationApi from '../api/hostingLocationApi';
import { useHistory } from 'react-router';
import hostingApi from '../api/hostingApi';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fmd2FuLWJhcmRvbGlhIiwiYSI6ImNrb2IwaXI5MzAzYnkydm4xZWg4eDFkbmoifQ.2JbbEHLeVd5Y1BcuVHAyyQ';

function Map() {

    const mapContainer = useRef();

		// to track the url
		const history = useHistory();

    // get the userinfo from userSlice
    const user = useSelector(selectUser);

    // get the coordinates from positionSlice
    // const latitude = useSelector(selectLat);
    // const longitude = useSelector(selectLng);

    // create state for lat & lng (because in this component lat & lng will change frequently. e.g as marker move)
    // get default value from slice
    const [lat,setLat] = useState(useSelector(selectLat));
    const [lng,setLng] = useState(useSelector(selectLng));
    const [zoom, setZoom] = useState(9);

    // update when we get new users location (using gps)
    const [renderMap, setRenderMap] = useState(false);	

    useEffect(()=>{

			// first check if the current user has submitted hosting info or not?
			// this is useful when user direct backdoor to the 'hosting/map' url
			async function checkHosting() {
				hostingApi.get(`/hostings/${user.uid}`)
				.then(resp=>{
					console.log(resp)
				})
				.catch(err=>{
					console.log(err)
					// if hosting data is not submitted then send user back to hostingForm
					alert(`you have not submitted hosting info. first fill the hosting form`);
					history.push('/hosting/form');
				})
			}

			checkHosting();

			// check if user has already submitted location or not?
			async function checkLocation() {
				hostingLocationApi.get(`/hostinglocations/${user.uid}`)
				.then(resp=>{
					console.log(resp);
					// if location is already been submitted by this user then move to next component
					alert(`you have already add the location , try to update it ${resp.data.fullName}`);
					history.push("/mapprofile")
				})
				.catch(err=>{
					console.log(err);
				})
			}

			checkLocation();

			// this function causes this component to render 2 times(because of setRenderMap())
      // // get user's location
      // window.navigator.geolocation.getCurrentPosition(
			// 	(position) => (
			// 		console.log(position.coords),
			// 		setLat(position.coords.latitude.toFixed(4)),
			// 		setLng(position.coords.longitude.toFixed(4)),
					
			// 		// without this center is not updated
			// 		setRenderMap(true)
			// 	),
			// 	(err) => (
			// 		console.log("error in getting location")
			// 	)
    	// )


			// initialize the map
			const map = new mapboxgl.Map({
					container: mapContainer.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					center: [lng, lat],
					zoom: zoom
			});

			// add marker for default location
			const marker = new mapboxgl.Marker({
					draggable: true
			})
			.setLngLat([lng,lat])
			.addTo(map);

			// add draggable functionality
			marker.on('drag',()=>{
					const coordinates = marker.getLngLat();
					// updating co-ordinates on dragging
					setLat(coordinates.lat.toFixed(4));
					setLng(coordinates.lng.toFixed(4));
			})

			// to search places in map (after search center will be resultant lat & lng )
			const geocoder = new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					mapboxgl: mapboxgl,
					// not to display new marker
					marker: false
			});

			map.addControl(geocoder,'top-left')

			geocoder.on('result',(e)=>{
				console.log(e.result);

				// update lat & lng
				setLng(e.result.center[0]);
				setLat(e.result.center[1]);

				// remove the old marker
				marker.remove();
				
				// re-add the new marker
				const marker1 = new mapboxgl.Marker({
						draggable: true
				})
				.setLngLat(e.result.center)
				.addTo(map);	

				marker1.on('drag',()=>{
						const coordinates = marker1.getLngLat();
						// updating co-ordinates on dragging
						setLat(coordinates.lat.toFixed(4));
						setLng(coordinates.lng.toFixed(4));
				})

			})

        // unmounting
        return () => map.remove();

    },[renderMap])

		const handleSubmit = (e) => {
			e.preventDefault();
			
			// ******** post the data to backend **********
			const formInfo = new FormData();
			formInfo.append('uid',user.uid);
			formInfo.append('email',user.email);
			formInfo.append('fullName',user.displayName);
			formInfo.append('latitude',lat);
			formInfo.append('longitude',lng);

			if(window.confirm("are you sure that this is your confirm hosting location?")) {
				// **** posting to backend ****
				hostingLocationApi.post('/hostinglocations', formInfo)
				.then(res=>{
					console.log(res);
					alert("location successfully added");
					history.push("/profile")
				})
				.catch(err=>{
					alert(err.message)
				})
			}

		}

    return (
        <div className="map">
						<div className="map__header">
							move marker to select your confirm location<br/>
							or<br/>
							search a place to confirm your location
						</div>
            <div className="map__sidebar">
                Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}
            </div>
            <div className="map__container" ref={mapContainer}/>
						<form onSubmit={handleSubmit} noValidate>
							<button className="map__button" type="submit">submit location</button>
						</form>
        </div>
    )
}

export default Map
