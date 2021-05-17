import React, { useEffect, useRef, useState } from 'react'
import './UpdateMap.css'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import hostingLocationApi from '../api/hostingLocationApi';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fmd2FuLWJhcmRvbGlhIiwiYSI6ImNrb2IwaXI5MzAzYnkydm4xZWg4eDFkbmoifQ.2JbbEHLeVd5Y1BcuVHAyyQ';

function UpdateMap({locationData}) {

  const mapContainer = useRef();

  // get the userinfo from userSlice
  const user = useSelector(selectUser);

  const [lat,setLat] = useState(locationData.latitude);
  const [lng,setLng] = useState(locationData.longitude);
  const [zoom, setZoom] = useState(15);

  useEffect(()=>{
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

  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ******** update the data to backend **********
    const formInfo = new FormData();
    formInfo.append('uid',user.uid);
    formInfo.append('email',user.email);
    formInfo.append('fullName',user.displayName);
    formInfo.append('latitude',lat);
    formInfo.append('longitude',lng);

    if(window.confirm("are you sure that you wants to update your hosting location?")) {
      // **** updating to backend ****
      hostingLocationApi.put('/hostinglocations', formInfo)
      .then(res=>{
        console.log(res);
        alert("location updated successfully");
      })
      .catch(err=>{
        alert(err.message)
      })
    }

  }


  return (
    <div className="updateMap">
      {/* <div className="updateMap__header">
        move marker to select your confirm location<br/>
        or<br/>
        search a place to confirm your location
      </div> */}
      <div className="updateMap__sidebar">
          Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}
      </div>
      <div className="updateMap__container" ref={mapContainer}/>
      <form onSubmit={handleSubmit} noValidate>
        <button className="updateMap__button" type="submit">update location</button>
      </form>      
    </div>
  )
}

export default UpdateMap
