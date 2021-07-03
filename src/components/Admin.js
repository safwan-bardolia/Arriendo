import { CheckSharp, Lock, SupervisedUserCircle, Check, Delete } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { selectUser } from '../features/userSlice'
import './Admin.css'
import Footer from './Footer';
import HostingInfo from './HostingInfo';
import {Button} from '@material-ui/core';
import { useState } from 'react';
import hostingApi from '../api/hostingApi';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import hostingLocationApi from '../api/hostingLocationApi';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



function Admin() {

  const classes = useStyles();

  // to keep track of URL
  const history = useHistory();

  // get the user data from userSlice
  const user = useSelector(selectUser);

  const [hosts, setHosts] = useState([]);

  // delete the record
  const deleteProfile = (host) => {
    if(window.confirm(`are yo sure do you want to delete this hosting profile ? it will also delete its location`)) {
      // delete hosting record 
      hostingApi.delete(`/hostings/${host.uid}`)
      .then(resp=>{
          console.log(resp.data);

          // without this component will not re-render  
          setHosts(hosts.filter(item=>item.uid!==host.uid))
          console.log(hosts)
          
          alert("record deleted successfully")
      })
      .catch(err=>{
          console.log(err);
      })

      // delete location also
      hostingLocationApi.delete(`/hostinglocations/${host.uid}`)
      .then(res=>{
          console.log(res);
      })
      .catch(err=>{
          console.log(err)
      })
    }
  }

  const acceptProfile = async(host) => {
    const formInfo1 = new FormData();
    formInfo1.append('uid', host.uid);
    formInfo1.append('verification','true');
    
    await hostingApi.patch('/hostverification',formInfo1);
    alert("host successfully verified")
  }

  useEffect(()=>{
    async function check() {
      try{
        const resp = await hostingApi.get(`/hostings/`);
        console.log(resp.data);
        setHosts(resp.data);
      } catch(err) {
        console.log(err);
      }
    }

    check();

  },[user.uid])

  return (
    <div className="admin">
      {user?.uid==='7BIgQ8XMZsd3U7XoP7GWUNQO7uS2'?(
        <>
          {hosts?.length > 0?(
            <>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">City</StyledTableCell>
                      <StyledTableCell align="right">Address</StyledTableCell>
                      <StyledTableCell align="right">Fees/hour</StyledTableCell>
                      <StyledTableCell align="right">Id proof</StyledTableCell>
                      <StyledTableCell align="right">Residential proof</StyledTableCell>
                      <StyledTableCell align="right">Image of parking</StyledTableCell>
                      <StyledTableCell align="right">Email</StyledTableCell>
                      <StyledTableCell align="right">Accept</StyledTableCell>
                      <StyledTableCell align="right">Reject</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hosts.map((host) => (
                      <TableRow key={host.uid}>
                        <StyledTableCell component="th" scope="row">
                          {host.fullName}
                        </StyledTableCell>
                        <StyledTableCell align="right">{host.city}</StyledTableCell>
                        <StyledTableCell align="right">{host.address}</StyledTableCell>
                        <StyledTableCell align="right">{host.fees}</StyledTableCell>
                        <StyledTableCell align="right"><a className="link" href={host.aadharFileUri} target="_blank" rel = "noopener noreferrer">link</a></StyledTableCell>
                        <StyledTableCell align="right"><a className="link" href={host.residentialFileUri} target="_blank" rel = "noopener noreferrer">link</a></StyledTableCell>
                        <StyledTableCell align="right"><a className="link" href={host.parkingPhotoUri} target="_blank" rel = "noopener noreferrer">link</a></StyledTableCell>
                        <StyledTableCell align="right">{host.email}</StyledTableCell>
                        <StyledTableCell align="right"><Button onClick={()=>acceptProfile(host)}  className="admin__accept"><Check/>accept</Button></StyledTableCell>
                        <StyledTableCell align="right"><Button onClick={()=>deleteProfile(host)}  className="admin__reject"><Delete/>reject</Button></StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>            
            </>
          ):(
            <>
              {/* rarely happen because we always have some dummy data in app */}
              .....loading
            </>
          )}
        </>
      ):(
        <>
          <div className="not__register">
            
            <div className="not__register__top">
              <h4>unauthorize access</h4>
                                
              <Button onClick={()=>history.push("/")}>
                Home
              </Button>
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
                        
          </div>
          <Footer/>
        
        </>
      )}
    </div>
  )
}

export default Admin
