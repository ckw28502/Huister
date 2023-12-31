import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FaEdit, FaEuroSign, FaInfo, FaTrash } from "react-icons/fa";

export default function PropertyCard(props) {
    let buttons;
    if (props.role=="OWNER") {
        buttons=(<>
            <MDBBtn color="warning" className="px-3 my-3 mx-3" onClick={()=>props.openModal(props.property.id,"EDIT")}><FaEdit size={28}/></MDBBtn>
            <MDBBtn color="danger" className="px-3 my-3 mx-3" onClick={()=>props.openModal(props.property.id,"DELETE")}><FaTrash size={28}/></MDBBtn>
        </>)
    }else if(props.role=="CUSTOMER"){
        buttons=(<MDBBtn color="primary" className="px-3 my-5 mx-3"><FaInfo size={28}/></MDBBtn>)
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