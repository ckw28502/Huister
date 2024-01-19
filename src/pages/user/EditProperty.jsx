import { MDBInput, MDBTextArea, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputFile from "../../components/InputFile";
import PropertyServices from "../../services/PropertyServices";

const EditProperty=forwardRef(function CreateProperty(props,ref){
    const [formData,setFormData]=useState({
        streetName:"",
        postCode:"",
        description:"",
        cityName:"",
        imageUrl:"",
        area:0,
        price:0,
        image:null,
        mode:"EDIT",
        houseNumber:0
    })

    useEffect(()=>{
        PropertyServices.getProperty(props.propertyId)
        .then(data=>{
            const fetchedProperty=data
            fetchedProperty.mode="EDIT"
            setFormData(fetchedProperty)
        })
    },[props.id])

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
        <MDBValidation className="w-75 px-5">
            <InputFile imageUrl={formData.imageUrl} getValue={e=>updateFormData("image",e.target.files[0])} />
            <div className="ms-5 mb-5 mt-3">
            <h3 className="float-end">{formData.postCode}</h3>
            <h3>{formData.streetName+"/"+formData.houseNumber}</h3>
            <h4>{formData.cityName}</h4>
            </div>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="number" wrapperClass="mx-5" required step={0.01} value={formData.area}label="area" name="area" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBInput type="number" wrapperClass="mx-5" value={formData.price} required step={0.01} label="price" name="price" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
            <MDBValidationItem feedback="Invalid value" invalid>
                <MDBTextArea required step={0.01} value={formData.description} wrapperClass="mx-5" label="description" name="description" onChange={e=>updateFormData(e.target.name,e.target.value)}/> 
            </MDBValidationItem>
        </MDBValidation>
    )
})

export default EditProperty