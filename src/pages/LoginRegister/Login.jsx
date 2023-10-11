import {
  MDBBtn,
  MDBInput
}
from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';
import { useState } from 'react';
import './loginregister.css';
import userservices from '../../services/UserServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastServices from '../../services/ToastServices';


function Login(props) {
  const [formData,setFormData]=useState({
    username:'',
    password:''
  })

  const updateFormData=event=>{
    setFormData({...formData,[event.target.name]:event.target.value});
  }

  const handleSubmit=event=>{

    event.preventDefault()

    userservices.Login(formData).then(data=>{
      sessionStorage.setItem("user",JSON.stringify(data))
      
      switch (data.role) {

        case "ADMIN":
          window.location.href='/admin'
          break;

        case "OWNER":
          window.location.href='/owner'
          break;

        case "CUSTOMER":
          window.location.href='/customer'
          break;
        default:
          break;
      }
    }).catch((error)=>{
      const errorMessages=error.response.data.errors
      console.log(errorMessages);
      errorMessages.map(errorMessage=>ToastServices.Error(convertErrorMessage(errorMessage.error)))
    })

  }

  const convertErrorMessage=(message)=>{

    switch (message) {

      case "USER_NOT_FOUND":
        return "Username is not registered!"

      case "INVALID_PASSWORD":
        return "Wrong password!"
        
      case "ACCOUNT_HAS_NOT_BEEN_ACTIVATED":
        return "This account has not been activated!"
      default:
        return "Server Errors!"
    }
  }
  return (
    <form onSubmit={e=>handleSubmit(e)} method="post">
      <MDBInput wrapperClass='mb-4 mx-5 w-100' required name='username'onChange={e=>updateFormData(e)} label='Username' id='loginUsername' type='text' size="lg"/>
      <InputPassword name='password' id="loginPassword" label="Password" getValue={updateFormData}/>
  
      <MDBBtn className="mb-4 px-5 mx-5 w-100" color='success' size='lg' type='submit'>Login</MDBBtn>
  
      <p className="small mb-1 pb-lg-3 ms-5 ps-5 d-flex justify-content-center"><u className="link" onClick={props.forgotPassword}>Forget password?</u></p>
              
      <p className='ms-5 d-flex justify-content-center ps-5'>Don't have an account? <u onClick={props.changeToRegister} className="link-info">Register here</u></p>
    </form>
  );
}

export default Login;