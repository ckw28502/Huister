import {
    MDBContainer,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';
  import Banner from './Banner';
  import Logo from './Logo';
  import './LoginRegister.css'
  import { useState } from 'react';
  import Register from './Register';
  import Login from "./Login";
  import ForgotPassword from './ForgotPassword';
  import './template.css';
import UserServices from '../../services/UserServices';

  function App() {
    
    if (sessionStorage.getItem("token")) {
      const user=UserServices.getUserFromToken()
        switch (user.role) {
          case "ADMIN":
            window.location.href="/admin"
            break;
            case "OWNER":
              window.location.href="/owner"
              break;
          case "CUSTOMER":
            window.location.href="/customer"
            break;
          default:
            break;
        }
    }
    const changePage=(page)=>{
      window.scrollTo(0, 0);
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
  
            <div className='mt-4 h-custom-2 w-75 pt-4'>
  
              <MDBRow className='d-flex justify-content-center ms-xl-5 ms-0 ps-5'>
                <MDBCol md={11} className='ms-xl-5 ms-0'>
                <h1 className="fw-normal mb-2 ms-xl-5 ms-md-5 ps-md-5 ps-xl-3 ms-3 pb-3" style={{letterSpacing: '1px'}}>{currentPage}</h1>
                </MDBCol>
              </MDBRow>
  
              <MDBRow>
              {component}
              </MDBRow>
  
            </div>
  
          </MDBCol>
  
          <Banner page={currentPage}/>
  
        </MDBRow>
  
      </MDBContainer>
    );
  } 

export default App;