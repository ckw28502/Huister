import {
    MDBContainer,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';
  import Banner from './Banner';
  import Logo from './Logo';
  import './LoginRegister.css'
  import { useEffect, useRef, useState } from 'react';
  import Register from './Register';
  import Login from "./Login";
  import ForgotPassword from './ForgotPassword';
  import './template.css';

  function App() {
    const changePage=(page)=>{
        setCurrentPage(page)
    }
    const pages={
        login:"LOGIN",
        register:"REGISTER",
        forgotPassword:"FORGETTING YOUR PASSWORD?"
    }
    const [currentPage,setCurrentPage]=useState(pages.login);
    const changeToRegister=()=>{
        changePage(pages.register)
    }
    const backToLogin=()=>{
        changePage(pages.login)
    }
    const forgotPassword=()=>{
        changePage(pages.forgotPassword)
    }
    let component;
    switch (currentPage) {
        case pages.login:
            component=<Login changeToRegister={changeToRegister} forgotPassword={forgotPassword}/>
            break;
        case pages.register:
            component=<Register backToLogin={backToLogin}/>
            break;
        case pages.forgotPassword:
            component=<ForgotPassword backToLogin={backToLogin}/>
            break;
        default:
            break;
    }
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6'>
            <Logo/>
  
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
  
              <h3 className="fw-normal mb-2 ps-5 ms-3 pb-3" style={{letterSpacing: '1px'}}>{currentPage}</h3>
  
              {component}
  
            </div>
  
          </MDBCol>
  
          <Banner/>
  
        </MDBRow>
  
      </MDBContainer>
    );
  } 

export default App;