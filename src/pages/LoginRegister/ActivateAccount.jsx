import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Logo from "./Logo";
import Banner from "./Banner";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { useEffect, useState } from "react";

export default function ActivateAccount(){
    const {username}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        UserServices.activateAccount(username)
    },[])

    const [countDown,setCountDown]=useState(5);

    const interval=setInterval(()=>{
        setCountDown(prevCountdown=>prevCountdown-1)
    },1000)
    if (countDown<1) {
        clearInterval(interval)
        navigate("/");
    }

    return(
        <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6'>
            <Logo/>
  
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
  
              <h3 className="fw-normal align-self-center mb-2 ps-5 ms-3 pb-3" style={{letterSpacing: '1px'}}>Your Account Has been Activated</h3>
  
              <h2>Redirecting to Login page in ....</h2>
              <h1>{countDown}</h1>
  
            </div>
  
          </MDBCol>
  
          <Banner/>
  
        </MDBRow>
  
      </MDBContainer>
    )
}