import { MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";
import { FaCamera, FaSave } from "react-icons/fa";
import ToastServices from "../../services/ToastServices";

export default function UserProfile(){
    const [user,setUser]=useState({
        id:0,
        role:"",
        name:"",
        phoneNumber:"",
        username:"",
        email:"",
        profilePictureUrl:"",
        profilePicture:null
    })

    const [image,setImage]=useState("")

    const phoneNumberRegex=/^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9])((\s|\s?-\s?)?[0-9])((\s|\s?-\s?)?[0-9])\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]\s?[0-9]$/

    useEffect(()=>{
        const id=JSON.parse(sessionStorage.getItem("user")).id
        UserServices.getUser(id)
        .then(data=>{
            setUser(data)
            setImage(data.profilePictureUrl)
        })
    },[])

    const setFormData = e =>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const setProfilePicture = e =>{
        setUser({...user,[e.target.name]:e.target.files[0]})
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log(image);
    }

    const phoneNumberChecker=(e)=>{
        let message='Invalid Dutch phone number'
        if (phoneNumberRegex.test(e.target.value)) {
            message=''
        }
        e.target.setCustomValidity(message)
        setFormData(e);
        
      }

    const save=()=>{
        let validate=true;
        if (user.name.length<1) {
            ToastServices.Error("Name field cannot be empty!")
            validate=false;
        }
        if (!phoneNumberRegex.test(user.phoneNumber)) {
            ToastServices.Error("Invalid dutch phone number!")
            validate=false;
        }

        if (validate) {
            UserServices.updateUser(user)
            .then(ToastServices.Success("Your data is updated succesfully"))
        }

    }

    return(
        <MDBContainer className="d-flex justify-content-center">
            <MDBCol className="col-6 d-flex justify-content-center flex-column">
                <MDBRow className="my-5 py-5 d-flex" style={{cursor:"pointer"}} onClick={()=>document.getElementById("file").click()}>
                <div className='d-inline-flex position-relative'>
                    <img
                    className='rounded-4 shadow-4 w-50'
                    src={image}
                    alt='Avatar'
                    />
                    <MDBBadge className='position-absolute top-100 start-0 ms-4 translate-middle p-3 bg-primary border border-light rounded-circle'>
                        <FaCamera size={24}/>
                    </MDBBadge>
                    <input type="file" onChange={e=>setProfilePicture(e)} name="profilePicture" id="file" className="d-none" />
                </div>
                </MDBRow>
                <MDBRow className="">
                    <MDBInput wrapperClass="my-3" name="username" value={"@"+user.username} disabled label="Username"/>
                    <MDBInput wrapperClass="my-3" name="email" value={user.email} disabled label="Email"/>
                    <MDBValidation>
                        <MDBValidationItem className="my-5" feedback="Name cannot be empty!" invalid>
                            <MDBInput required onChange={e=>setFormData(e)} name="name" value={user.name}  label="Name"/>
                        </MDBValidationItem>
                        <MDBValidationItem className="my-5" feedback="Not a valid dutch phone number!" invalid>
                            <MDBInput wrapperClass="my-3" required onChange={e=>phoneNumberChecker(e)} name="phoneNumber" value={user.phoneNumber}  label="Phone Number"/>
                        </MDBValidationItem>
                        <MDBBtn onClick={save} className="w-25 align-self-center"><FaSave size={36}/></MDBBtn>
                    </MDBValidation>
                </MDBRow>
            </MDBCol>
        </MDBContainer>
    )
}