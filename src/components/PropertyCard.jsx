import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { FaBell, FaEdit, FaEuroSign, FaTrash } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";

export default function PropertyCard(props) {
    const [counter,setCounter]=useState(0);
    const [notification,setNotifications]=useState("")
    useEffect(()=>{
        if (counter==0) {
            setNotifications("")

        }else if(counter<100){
            setNotifications(<MDBBadge color='danger' light pill className='position-absolute translate-middle my-3 mx-3' style={{zIndex:"1"}}>
            {counter}
            <span className="visually-hidden">unread messages</span>
        </MDBBadge>)
        } else {
            setNotifications(<MDBBadge color='danger' light pill className='position-absolute translate-middle my-3 mx-3' style={{zIndex:"1"}}>
            99+
            <span className="visually-hidden">unread messages</span>
        </MDBBadge>)
        }
    },[counter])
    let buttons;
    if (props.role=="OWNER") {
        buttons=(<>
            <MDBBtn id={`edit_property_${props.property.id}`} color="warning" className="px-3 my-3 mx-3" onClick={()=>props.openModal(props.property.id,"EDIT")}><FaEdit size={28}/></MDBBtn>
            <MDBBtn color="danger" id={`delete_property_${props.property.id}`} className="px-3 my-3 mx-3" onClick={()=>props.openModal(props.property.id,"DELETE")}><FaTrash size={28}/></MDBBtn>

            <div>
            {notification}
            <MDBBtn color="primary" className="px-3 my-3 mx-3" onClick={()=>props.openModal(props.property.id,"DETAIL")}><FaBell size={28}/></MDBBtn>
            </div>
        </>)
    }else if(props.role=="CUSTOMER"){
        buttons=(<MDBBtn  color="primary" id={`order_property_${props.property.id}`} className="ps-4 my-5" onClick={()=>props.openModal(props.property.id,"ORDER")}><FaHouseCircleCheck size={28}/><br/>RENT</MDBBtn>)
    }
    

    return(
        <MDBCard style={{ maxWidth: '540px' }} className=" mx-5 my-3">
            <MDBRow className='g-0'>
                <MDBCol md='5' className="h-100 d-flex align-items-center">
                <MDBCardImage className="object-fit-cover w-100" style={{height:"16vw"}} src={props.property.imageUrl} alt='...' />
                </MDBCol>
                <MDBCol md='5'>
                <MDBCardBody className="pt-5">
                    <MDBCardTitle >{props.property.cityName}</MDBCardTitle>
                    <MDBCardText>{props.property.streetName}</MDBCardText>
                    <MDBCardText><FaEuroSign className="mb-1"/>{props.property.price}/month</MDBCardText>
                    <MDBCardText>
                    <small className='text-muted'>{props.property.area} m<sup>2</sup></small>
                    </MDBCardText>
                    <MDBCardText><u>{props.property.ownerName}</u></MDBCardText>
                </MDBCardBody>
                </MDBCol>
                <MDBCol md='2' className="my-4 d-flex flex-column">
                    {buttons}
                </MDBCol>
            </MDBRow>
        </MDBCard>
    )
}