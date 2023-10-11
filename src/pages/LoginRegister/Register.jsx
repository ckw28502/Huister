import {
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
  MDBRadio,  
}
from 'mdb-react-ui-kit';
import InputPassword from '../../components/InputPassword';
import './loginregister.css'
import { useState } from 'react';
import Modal from '../../components/Modal';
import TermsAndConditions from './TermAndConditions';
import { FaX,FaCheck } from 'react-icons/fa6';
import InputFile from '../../components/InputFile';
import userservices from '../../services/UserServices';
import FirebaseServices from '../../services/FirebaseServices';
import ToastServices from '../../services/ToastServices';

function Register(props) {

  //form data
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:'',
    name:'',
    confirmationPassword:'',
    phoneNumber:'',
    profilePicture:null,
    role:'',
    profilePictureUrl:''
  })

  //update form data
  const updateFormData=(event)=>{
    setFormData({...formData,[event.target.name]:(event.target.name=='profilePicture')?event.target.files[0]:event.target.value})
  }

  //requirements for password
  const [passwordRequirements,setPasswordRequirements]=useState([
    {
    name:"length",
    requirement:"Password require min 8 characters!",
    correct:false
    },{
      name:"uppercase",
      requirement:"Password needs to have at least one uppercase letter!",
      correct:false
      },{
        name:"lowercase",
        requirement:"Password needs to have at least one lowercase letter!",
        correct:false
        },
        {
          name:"number",
          requirement:"Password needs to have at least one number character!",
          correct:false
          },
          {
            name:"symbol",
            requirement:"Password needs to have at least one special character!",
            correct:false
            },
  ])

  //terms conditions
  const[termsConditions,setTermsConditions]=useState(false);
  
  //modal
  const [modal,setModal]=useState(false);
  const toggleModal=(isAccepted)=>{
    setModal(!modal);
    setTermsConditions(isAccepted)
  }

  //password checker
  const passwordChecker=(e)=>{
    const value=e.target.value
    const checkedRequirements=passwordRequirements
    checkedRequirements[0].correct=(value.length>7)
    checkedRequirements[1].correct=(value.toLowerCase()!=value)
    checkedRequirements[2].correct=(value.toUpperCase()!=value)
    checkedRequirements[3].correct=/\d/.test(value)
    checkedRequirements[4].correct=/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value)
    const message=(checkedRequirements.filter((requirement)=>requirement.correct).length<checkedRequirements.length)?'Not all of the requirements are fullfiled':'';
    e.target.setCustomValidity(message)
    setPasswordRequirements(checkedRequirements)
    updateFormData(e)
  }

  //confirmation password checker
  const confirmationPasswordChecker=(e)=>{
    const message=(e.target.value==formData.password)?'':'Confirmation password has to be equals to password!';
    e.target.setCustomValidity(message)
    if (message!=confirmationPasswordErrorMessage) {
      setConfirmationPasswordErrorMessage(message)
    }
    console.log(e.target.name);
    updateFormData(e)
  }

  const phoneNumberRegex=/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/

  //phone number checker
  const phoneNumberChecker=(e)=>{
    let message='Invalid Dutch phone number'
    if (phoneNumberRegex.test(e.target.value)) {
        message=''
    }
    e.target.setCustomValidity(message)
    updateFormData(e);
    
  }

  //showing password requirements
  const [showRequirements,setShowRequirements]=useState(false)
  const requirementClasses=`bg-dark text-light rounded ms-5 fluid ${(showRequirements)?'':'d-none'}`

  //confirmation password error message
  const [confirmationPasswordErrorMessage,setConfirmationPasswordErrorMessage]=useState('');

  //map password requirement
  const passwordRequirementsMapped=passwordRequirements.map((requirement,index)=><li key={index}>{(requirement.correct)?<FaCheck color='green'/>:<FaX color='red'/>} {requirement.requirement}</li>)


  //convert error messages
  const convertErrorMessage=(message)=>{

    switch (message) {

      case "USERNAME_EXISTS":
        return "This username has been taken"
      default:
        return "Server Errors!"
    }
  }
  
  //handling register event 
  const handleRegister=event=>{
    event.preventDefault()
    const passwordfailed=passwordRequirements.some(passwordRequirement=>passwordRequirement.correct==false)

    if(!phoneNumberRegex.test(formData.phoneNumber)){
      ToastServices.Error("Phone number is not a valid dutch phone number!")
    }else if (passwordfailed) {
      ToastServices.Error("Password requirements haven't been fulfilled!")
    }else if (formData.password!=formData.confirmationPassword){

      ToastServices.Error("Confirmation Password is not equals to the password!")
    }else{
      FirebaseServices.uploadImage(formData.profilePicture,`user/${formData.username}`)
      .then(fullPath=>setFormData({...formData,profilePictureUrl:fullPath}))
      userservices.saveUser(formData)
      .catch(error=>{
        const errorMessages=error.response.data.errors
        console.log(errorMessages);
        errorMessages.map(errorMessage=>ToastServices.Error(convertErrorMessage(errorMessage.error)))
      })
    }
  }
  return (
    <>
      <MDBValidation onSubmit={e=>handleRegister(e)}>

        {/** Profile picture input */}
        <MDBValidationItem>
          <InputFile getValue={updateFormData}/>
        </MDBValidationItem>

        {/** Username input */}
        <MDBValidationItem invalid feedback={(formData.username.length<1)?'Username cannot be empty!':'Username has been taken!'}>
          <MDBInput wrapperClass='mb-5 mx-5 w-100'name='username' required label='Username' onChange={updateFormData} id='registerUsername' type='text' size="lg"/>
        </MDBValidationItem>

        {/** E-mail input */}
        <MDBValidationItem invalid feedback={(formData.email.length<1)?'Email cannot be empty!':'Invalid email!'}>
          <MDBInput wrapperClass='mb-5 mx-5 w-100' name='email' onChange={updateFormData} label='Email Address' id='registerEmailAddress' type='email' required size="lg"/>
        </MDBValidationItem>
        
        {/** Name input */}        
        <MDBValidationItem invalid feedback='Name cannot be empty!'>
          <MDBInput wrapperClass='mb-5 mx-5 w-100' required label='Name' name='name'onChange={updateFormData} id='registerName' type='text' size="lg"/>
        </MDBValidationItem>

        {/** Phone number input */}
        <MDBValidationItem invalid feedback={(formData.phoneNumber.length<1)?'Phone number must be inputted!':'Invalid Dutch phone number!'}>
          <MDBInput wrapperClass='mb-5 mx-5 w-100' required label='Phone Number' name='phoneNumber' onChange={e=>phoneNumberChecker(e)} id='registerPhoneNumber' type='text' size="lg"/>
        </MDBValidationItem>

        {/** Radio buttons for role */}
        <div className='d-flex flex-column px-5 mb-5'>
        <h3 className='h3 mb-3'>Choose your Role :</h3>
        <MDBValidationItem invalid feedback=''>
          <MDBRadio name='role' value='OWNER' onClick={updateFormData} label='Owner' required/>
        </MDBValidationItem>
        <MDBValidationItem invalid feedback='Role has to be picked!'>
          <MDBRadio name='role' onClick={updateFormData} value='CUSTOMER' label='Customer' required/>
        </MDBValidationItem>
        </div>

        {/** Password in  put */}
        <MDBValidationItem invalid feedback=''>
          <InputPassword id="registerPassword" toggleRequirements={()=>setShowRequirements(true)} name="password" label="Password" getValue={passwordChecker}/>
        </MDBValidationItem>
        <div className={requirementClasses}>
          <ul style={{listStyleType:'none'}}>
            {passwordRequirementsMapped}
          </ul>
        </div>

        {/** Confirmation password input */}
        <MDBValidationItem className='mb-3 pb-5'invalid feedback='Confirmation password has to be equals to password!'>
          <InputPassword id="registerConfirmationPassword" name="confirmationPassword" label="Confirmation Password" getValue={confirmationPasswordChecker} />
        </MDBValidationItem>

        {/** Terms and conditions checkbox */}
        <MDBValidationItem invalid feedback='Terms and conditions have to be accepted!'>
          <MDBCheckbox required onClick={()=>setModal(!modal)} id='t&c_Checkbox'label={<u className='text-info'>Terms & Conditions</u>} 
              wrapperClass='d-flex justify-content-start ms-5 mt-1 mb-4' checked={termsConditions}/>
        </MDBValidationItem>

        {/** Register Button */}
        <MDBBtn className="mb-4 px-5 mx-5 w-100" color='success' size='lg'>Register</MDBBtn>

        {/** Login link */}                 
        <p className='ms-5 ps-5 d-flex justify-content-center'>Already have an account? <u onClick={props.backToLogin} className="link-info">Log in here</u></p>
      </MDBValidation>

      {/** Modal for terms and conditions */}
      <Modal scrollable title='Terms & Conditions' body={<TermsAndConditions/>} modal={modal} toggleModal={toggleModal} button1='REJECT' button2='ACCEPT'/>
    </>
  );
}

export default Register;