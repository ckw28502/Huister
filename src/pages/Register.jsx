import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  
}
from 'mdb-react-ui-kit';
import InputPassword from '../components/InputPassword';
import Banner from './Banner';
import Logo from './Logo';
import './LoginRegister.css'
import { useState } from 'react';
import Modal from '../components/Modal';
import TermsAndConditions from './TermAndConditions';

function Register() {
  const [password,setPassword]=useState('');
  const [confirmationPassword,setConfirmationPassword]=useState('');
  const[termsConditions,setTermsConditions]=useState(false);
  const [modal,setModal]=useState(false);
  const toggleModal=(isAccepted)=>{
    setModal(!modal);
    setTermsConditions(isAccepted)
  }
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <Logo/>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-2 ps-5 pb-3" style={{letterSpacing: '1px'}}>REGISTER</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='registerUsername' type='text' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email Address' id='registerEmailAddress' type='text' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Name' id='registerName' type='text' size="lg"/>
            <InputPassword id="registerPassword" label="Password" getValue={(value)=>setPassword(value)}/>
            <InputPassword id="registerConfirmationPassword" label="Confirmation Password" getValue={(value)=>setConfirmationPassword(value)}/>
            <MDBCheckbox disabled id='t&c_Checkbox'label={<a onClick={()=>setModal(!modal)}>Terms & Conditions</a>} 
            wrapperClass='d-flex justify-content-center ps-6' checked={termsConditions}/>
            <MDBBtn className="mb-4 px-5 mx-5 mt-5 w-100" color='success' size='lg'>Register</MDBBtn>
                        
            <p className='ms-5'>Already have an account? <a href="/login" className="link-info">Log in here</a></p>
            <Modal scrollable title='Terms & Conditions' body={<TermsAndConditions/>} modal={modal} toggleModal={toggleModal} button1='REJECT' button2='ACCEPT'/>
          </div>
        </MDBCol>

        <Banner/>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;