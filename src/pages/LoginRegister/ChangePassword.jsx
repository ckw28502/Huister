import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import Logo from "./Logo";
import Banner from "./Banner";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../../services/UserServices";
import {useState } from "react";
import InputPassword from "../../components/InputPassword";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import ToastServices from "../../services/ToastServices";

export default function ChangePassword(){
    const {username}=useParams();
    const navigate=useNavigate();

    const [showRequirements,setShowRequirements]=useState(false)
    const requirementClasses=`bg-dark text-light rounded ms-5 fluid ${(showRequirements)?'':'d-none'}`

    const [formData,setFormData]=useState({
      password:"",
      confirmationPassword:""
    })

    const updateFormData=e=>{
      setFormData({...formData,[e.target.name]:e.target.value})
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

    const [confirmationPasswordErrorMessage,setConfirmationPasswordErrorMessage]=useState('');

    //confirmation password checker
  const confirmationPasswordChecker=(e)=>{
    const message=(e.target.value==formData.password)?'':'Confirmation password has to be equals to password!';
    e.target.setCustomValidity(message)
    if (message!=confirmationPasswordErrorMessage) {
      setConfirmationPasswordErrorMessage(message)
    }
    updateFormData(e)
  }

  const passwordRequirementsMapped=passwordRequirements.map((requirement,index)=><li key={index}>{(requirement.correct)?<FaCheck color='green'/>:<FaX color='red'/>} {requirement.requirement}</li>)

  const handleSubmit=e=>{
    e.preventDefault()

    const passwordfailed=passwordRequirements.some(passwordRequirement=>passwordRequirement.correct==false)



    if (passwordfailed) {
      ToastServices.Error("Password requirements haven't been fulfilled!")
    }else if (formData.password!=formData.confirmationPassword){
      ToastServices.Error("Confirmation Password is not equals to the password!")
    }else{
      UserServices.changePassword(username,formData.password)
      .then(ToastServices.successWithOnClose("Password changed successfully! redirecting to login page...",()=>{
        console.log("hi");
        navigate('/')
      }))
    }
  }


    return(
        <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm='6'>
            <Logo/>
  
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
  
              <h3 className="fw-normal align-self-center mb-2 ps-5 ms-3 pb-3" style={{letterSpacing: '1px'}}>Create new password</h3>
  
              <MDBValidation onSubmit={e=>handleSubmit(e)}>
                {/** Password input */}
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
                <MDBBtn type="submit" color="primary" className="w-50 align-self-center ms-5" size="lg">Submit</MDBBtn>

              </MDBValidation>

  
            </div>
  
          </MDBCol>
  
          <Banner/>
  
        </MDBRow>
  
      </MDBContainer>
    )
}