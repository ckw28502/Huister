import {
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';
import { useState } from 'react';
import './loginregister.css';

function Login(props) {
  const [password,setPassword]=useState('');
  return (
    <>
      <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Username' id='loginUsername' type='text' size="lg"/>
      <InputPassword name='password' id="loginPassword" label="Password" getValue={(value)=>setPassword(value)}/>
  
      <MDBBtn className="mb-4 px-5 mx-5 w-100" color='success' size='lg' type='submit'>Login</MDBBtn>
  
      <p className="small mb-1 pb-lg-3 ms-5 ps-5 align-self-center"><u className="link" onClick={props.forgotPassword}>Forgot password?</u></p>
              
      <p className='ms-5 align-self-center ps-5'>Don't have an account? <u onClick={props.changeToRegister} className="link-info">Register here</u></p>
    </>
  );
}

export default Login;