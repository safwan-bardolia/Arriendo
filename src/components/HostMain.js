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
                        src="https://a0.muscache.com/im/pictures/92acd468-73bf-4ca1-a956-277c4a94b3a3.jpg?im_q=highq&im_w=960"
                        title="Darrel"
                        description="Hosts a tiny house in Atlanta"
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/8a09fe60-64e5-4461-bb80-aaf8bc3238a7.jpg?im_q=highq&im_w=960"
                        title="Candida & Jeff"
                        description="Host a house in Joshua Tree"
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/d95dc425-2606-4727-9a2b-861709479fb9.jpg?im_q=highq&im_w=960"
                        title="Ryo"
                        description="Hosts a farm stay in Komatsu"
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/17d27522-7f79-4a82-9225-74c737800641.jpg?im_q=highq&im_w=960"
                        title="Sophie"
                        description="Hosts a loft in paris"
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/e4ad8c8e-ccf9-473c-856b-0b3c5dfe0662.jpg?im_q=highq&im_w=960"
                        title="Nancy"
                        description="Hosts a private room in San Francisco"
                    />
                </div>

            </div>

            <div className="hostMain__bottom">

                <h4>Explore how hosting work</h4>
                
                <div className="hostMain__bottom__info">
                    <Card
                        src="https://a0.muscache.com/im/pictures/d93286ce-08ac-4146-9b8a-7a9992ee33a8.jpg?im_q=highq&im_w=480"
                        title="Why host on Arriendo?"
                        description="Hosts reveal what they love about sharing their space on Arriendo."
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/ef1cef25-75ea-454d-8bfd-41d0de1f1076.jpg?im_q=highq&im_w=480"
                        title="How to get started on Arriendo"
                        description="From creating your listing to prepping your space, learn how to start hosting."
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/354e974b-8113-42de-93e7-4054c4713e3c.jpg?im_q=highq&im_w=480"
                        title="How to earn money on Arriendo"
                        description="What every host needs to know about pricing and payouts."
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/f79bf564-58bd-45f3-94c3-9f530cea052b.jpg?im_q=highq&im_w=480"
                        title="Is my space a good fit for Arriendo?"
                        description="There’s a perfect guest for every space – the key is setting guest expectations."
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/80b6b1c4-6ac2-47ae-b2fd-7cf920437df4.jpg?im_q=highq&im_w=480"
                        title="What does Arriendo expect of hosts?"
                        description="From responding quickly to avoiding cancellations, here’s what to focus on."
                    />
                    <Card
                        src="https://a0.muscache.com/im/pictures/109c7101-7bc0-49cc-b349-5c3355c25784.jpg?im_q=highq&im_w=480"
                        title="What hosting regulations apply to you?"
                        description="How to navigate local rules and regulations around Arriendo hosting."
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
