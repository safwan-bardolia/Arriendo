import { Button } from '@material-ui/core'
import { CheckSharp, Lock, SupervisedUserCircle } from '@material-ui/icons';
import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from './Card';
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import "./HostMain.css"

function HostMain() {

    // to track url
    const history = useHistory();

    return (
			<div>
				<div className="hosting__header">
						<h1>Become a Host</h1>
						<p>Let's earn you money by renting out your parking area</p>
				</div>
        <div className="hostMain__container">


            <div className="hostMain">

                
                <div className="hostMain__left">
                    <div className="title">
                        Host your space on Arriendo
                    </div>
                    <div className="info">
                        Join a vibrant community of hosts, create memorable experiences for travellers, and earn money to pursue the things you love.
                    </div>
                    <Button onClick={()=>history.push("/hosting/form")}>
                        Get started
                    </Button>
                </div>
            
                <div className="hostMain__right">
                    <Card
                        src="https://cdn.homedit.com/wp-content/uploads/2017/04/Tree-House-open-space-Garage-for-two-cars-1024x682.jpg?im_q=highq&im_w=960"
                        title="Karan"
                        description="Great palce to park your car in city like Banglore, owners are very helpful."
                    />
                    <Card
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chevrolet-volt-electric-car-parked-on-the-driveway-of-a-news-photo-1618587875.??im_q=highq&im_w=960"
                        title="Priyanka"
                        description="Parking area was good and mall was also close to parking area."
                    />
                    <Card
                        src="https://i.pinimg.com/originals/28/7a/ba/287aba7d18afa503e7035c8cb06be45e.jpg?im_q=highq&im_w=960"
                        title="Jasminder"
                        description="Parking the car here was good experience, Area was equipt with gate and cctv camera."
                    />
                    <Card
                        src="http://outdoorconcepts.es/en/files/2020/04/Modern-Carport-Outdoor-Concepts-1024x657.jpg?im_q=highq&im_w=960"
                        title="Sunil"
                        description="5 start rating for this area, Spot was having a roof which protected my car from rain."
                    />
                    <Card
                        src="https://www.omerpark.co.uk/bin/montacoche-belgio-rex-p.jpg?im_q=highq&im_w=960"
                        title="Prajakta"
                        description="Good parking area, college was close to parking location."
                    />
                </div>

            </div>

            <div className="hostMain__bottom">

                <h4>Explore how hosting work</h4>
                
                <div className="hostMain__bottom__info">
                    <Card
                        src="https://thalassafestival.com/wp-content/uploads/2019/12/registration-icon-png-6.png?im_q=highq&im_w=480"
                        title="Register to Arriendo"
                        description="Get yourself register to application by using your Google Account."
                    />
                    <Card
                        src="https://icon-library.com/images/fill-out-form-icon/fill-out-form-icon-20.jpg?im_q=highq&im_w=480"
                        title="Fill Hosting Information"
                        description="Enter the details about yourself, the details about the hosting area and Upload the required document."
                    />
                    <Card
                        src="https://cdn3.iconfinder.com/data/icons/map-pins-v-2/512/map_pin_add_address_location_route_plus-512.png?im_q=highq&im_w=480"
                        title="Add Location Pointer"
                        description="Add the location pointer of your hosting area on Map."
                    />
                    <Card
                        src="https://cdn.iconscout.com/icon/premium/png-512-thumb/verification-1681052-1428000.png?im_q=highq&im_w=480"
                        title="Get Verified"
                        description="After entering the hosting information the host will get verified by admin."
                    />
                    <Card
                        src="https://cdn.homedit.com/wp-content/uploads/2017/04/Open-space-front-house-car-garage-1024x673.jpg?im_q=highq&im_w=480"
                        title="Ready for Hosting"
                        description="After verification the host is ready to rent the area."
                    />
                   
                    
                </div>

            </div>

        </div>
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

			</div>	
    )
}

export default HostMain
