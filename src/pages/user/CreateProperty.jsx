import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import { forwardRef, useImperativeHandle, useState } from "react";
import InputFile from "../../components/InputFile";

const CreateProperty=forwardRef(function CreateProperty(props,ref){
    const [formData,setFormData]=useState({
        streetName:"",
        postCode:"",
        description:"",
        cityName:"",
        imageUrl:"",
        area:0,
        price:0,
        image:null,
        mode:"CREATE",
        houseNumber:0
    })

    const handleSubmit=()=>{
        return formData
    }

    useImperativeHandle(ref,()=>({
        handleSubmit
    }))

    const updateFormData=(name,value)=>{
        setFormData({...formData,[name]:value})
    }

    return(
        <MDBValidation className="w-75">
            <InputFile getValue={e=>updateFormData("image",e.target.files[0])} />
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput wrapperClass="mx-5" type="text" label="street name"required name="streetName" onChange={e=>updateFormData(e.target.name,e.target.value)}/>
            </MDBValidationItem>

            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput wrapperClass="mx-5" type="number" min={1} required label="house number" name="houseNumber" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>

            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="text" wrapperClass="mx-5" label="postcode" required name="postCode" onChange={e=>updateFormData(e.target.name,e.target.value)}/>
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="text" wrapperClass="mx-5" label="city" required name="cityName" onChange={e=>updateFormData(e.target.name,e.target.value)}/>
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="number" wrapperClass="mx-5" required step={0.01} label="area" name="area" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="number" wrapperClass="mx-5" required step={0.01} label="price" name="price" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBTextArea required wrapperClass="mx-5" step={0.01} label="description" name="description" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
        </MDBValidation>
    )
})

export default CreateProperty