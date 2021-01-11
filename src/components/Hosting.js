import React from 'react'
import Map from "./Map"
import Footer from "./Footer"
import "./Hosting.css"
import HostingForm from './HostingForm';
import { selectLat, selectLng } from '../features/positionSlice';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import HostingInfo from './HostingInfo';
import HostMain from './HostMain';

function Hosting(props) {

    const lat = useSelector(selectLat);
    const lng = useSelector(selectLng);

    return (
        <div className="hosting">

            <BrowserRouter>
                <div className="hosting__header">
                    <h1>Become a Host</h1>
                    <p>Let's earn you money by renting out your parking area</p>
                </div>

                <Switch>
                    <Route path="/hosting/map">
                        <div className="hosting__map">
                            <Map
                                google={props.google}
                                center={{lat: lat, lng: lng}}
                                height='300px'
                                zoom={15}
                            />
                        </div>
                    </Route>

                    <Route path="/hosting/form">     
                        <HostingForm/>
                    </Route>

                    <Route path="/hosting">
                        <HostMain/>
                    </Route>
                </Switch>

                <div className="hosting__info">
                        <HostingInfo 
                            Icon={SupervisedUserCircle} 
                            title="Trust & Safety"
                            info="Trust & safety tools help you accept a booking only if you’re 100% comfortable."
                        />
                        <HostingInfo 
                            Icon={CheckSharp} 
                            title="Host Guarantee"
                            info="Your peace of mind is priceless. So we don’t charge for it. Every eligible booking on Makent is covered by our Host Guarantee - at no additional cost to you."
                        />
                        <HostingInfo 
                            Icon={Lock} 
                            title="Secure payments"
                            info="Our fast, flexible payment system puts money in your bank account after guests check out."
                            last="last"
                        />
                </div>
                <Footer/>

            </BrowserRouter>
        </div>
    )
}

export default Hosting
