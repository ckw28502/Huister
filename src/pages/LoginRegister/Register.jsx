import {
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  
}
from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';
import './loginregister.css'
import { useState } from 'react';
import Modal from '../../components/Modal';
import TermsAndConditions from './TermAndConditions';

function Register(props) {
  const [password,setPassword]=useState('');
  const [confirmationPassword,setConfirmationPassword]=useState('');
  const[termsConditions,setTermsConditions]=useState(false);
  const [modal,setModal]=useState(false);
  const toggleModal=(isAccepted)=>{
    setModal(!modal);
    setTermsConditions(isAccepted)
  }
  return (
    <>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='registerUsername' type='text' size="lg"/>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email Address' id='registerEmailAddress' type='text' size="lg"/>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Name' id='registerName' type='text' size="lg"/>
      <InputPassword id="registerPassword" label="Password" getValue={(value)=>setPassword(value)}/>
      <InputPassword id="registerConfirmationPassword" label="Confirmation Password" getValue={(value)=>setConfirmationPassword(value)} />
      <MDBCheckbox  disabled id='t&c_Checkbox'label={<u className='text-info' onClick={()=>setModal(!modal)}>Terms & Conditions</u>} 
            wrapperClass='d-flex justify-content-start ms-5 mt-1 mb-4' checked={termsConditions}/>
      <MDBBtn className="mb-4 px-5 mx-5 w-100" color='success' size='lg'>Register</MDBBtn>
                        
      <p className='ms-5 ps-5 align-self-center'>Already have an account? <u onClick={props.backToLogin} className="link-info">Log in here</u></p>
      <Modal scrollable title='Terms & Conditions' body={<TermsAndConditions/>} modal={modal} toggleModal={toggleModal} button1='REJECT' button2='ACCEPT'/>
    </>
  );
}

export default Register;