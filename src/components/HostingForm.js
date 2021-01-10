import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import hostingApi from '../api/hostingApi';
import { selectUser } from '../features/userSlice'
import "./HostingForm.css"

function HostingForm() {

        // to track the url
        const history = useHistory();

        // get the userInfo from userSlice
        const user = useSelector(selectUser);

        // for username & initialize its value
        const [userName, setUserName] = useState(user.displayName);
    
        // for file
        const [selectedFile, setSelectedFile] = useState(null);
    
        const onSubmitHandler = async (e) => {
            
            e.preventDefault();
            
            // if both this input present then only submit the data
            if(selectedFile && userName) {
        
                // create an object of formData
                const formData = new FormData();
                
                formData.append('userName', userName);
                formData.append('file', selectedFile);
        
                // post the data to backend api
                hostingApi.post("/upload", formData)
                    .then(res=>{
                        console.log(res);
                        alert("record successfully added")
                    })
                    .catch(err=>{
                        alert(err.message);
                    })

                // after submitting form successfully move to map component
                history.push("/hosting/map")
            }
        }
    

    return (
        <div className="hostingForm">
            
            <div className="hostingForm__body">
                <form onSubmit={onSubmitHandler}>
                    <input 
                        type="text" 
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={(e)=>setSelectedFile(e.target.files[0])}
                    />    
                    <Button type="submit">submit</Button>
                </form>
            </div>

        </div>
    )
}

export default HostingForm
