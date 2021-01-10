import React from 'react'
import "./HostingInfo.css"

function HostingInfo({Icon, title, info, last}) {
    return (
        <div className={`hostingInfo ${last? last:''}`}>
            <Icon fontSize="large"/>
            <h4>{title}</h4>
            <p>{info}</p>
        </div>
    )
}

export default HostingInfo
