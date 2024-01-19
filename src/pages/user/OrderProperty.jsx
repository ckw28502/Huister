import { MDBBtn, MDBInput, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit"
import PropertyServices from "../../services/PropertyServices";
import { forwardRef,useImperativeHandle,useEffect,useState } from "react";

const OrderProperty=forwardRef(function orderProperty(props,ref){
    const [formData,setFormData]=useState({
        ownerId:props.ownerId,
        propertyId:props.propertyId,
        duration:1,
        price:1,
        mode:"ORDER"
    })

    useEffect(()=>{
        PropertyServices.getProperty(props.propertyId)
        .then(data=>setFormData({...formData,price:data.price}))
    },[])

    const updateFormData=e=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=()=>{
        return formData
    }

    useImperativeHandle(ref,()=>({handleSubmit}))


    return(
        <MDBValidation className="px-5">
            <h1 className="mb-5">Rent this property</h1>
            <MDBValidationItem  invalid feedback="Invalid price input">
                <MDBInput name="price" label="Price"min={1} onChange={e=>updateFormData(e)} type="number" value={formData.price}/>
            </MDBValidationItem>
            <MDBValidationItem invalid feedback="Invalid duration input">
                <MDBInput name="duration" label="Durations in months" min={1} onChange={e=>updateFormData(e)} type="number" value={formData.duration}/>
            </MDBValidationItem>
        </MDBValidation>
    )

})

export default OrderProperty;