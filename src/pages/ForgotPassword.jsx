import { MDBInput,MDBBtn, MDBContainer,MDBRow, MDBCol } from "mdb-react-ui-kit";
import Logo from "./Logo";
import Banner from "./Banner";
import { FaEnvelope } from "react-icons/fa";

function forgotPassword() {
    return (
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol sm='6'>
              <Logo/>
    
              <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
    
                <h3 className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Forgetting your password ?</h3>
                <p className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>Don't worry, just type your username here and the link for you to reset your password will be sent to your registered email</p>

    
                <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='forgotPasswordUsername' type='text' size="lg"/>
    
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type='submit'><FaEnvelope size={'28px'}/></MDBBtn>
    
                <p className='ms-5'>Remember the password? <a href="/login" className="link-info">Back to login</a></p>
    
              </div>
    
            </MDBCol>
    
            <Banner/>
    
          </MDBRow>
    
        </MDBContainer>
      );    
}
export default forgotPassword;