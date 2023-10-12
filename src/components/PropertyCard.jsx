import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FaEdit, FaEuroSign, FaInfo, FaTrash } from "react-icons/fa";

export default function PropertyCard(props) {
    let buttons;
    if (props.role=="OWNER") {
        buttons=(<>
            <MDBBtn color="warning" onClick={()=>props.openModal(props.property,"edit")} className="px-3 my-3 mx-3"><FaEdit size={28}/></MDBBtn>
            <MDBBtn color="danger" className="px-3 my-3 mx-3"><FaTrash size={28}/></MDBBtn>
        </>)
    }else{
        buttons=(<MDBBtn color="primary" className="px-3 my-5 mx-3" onClick={()=>props.openModal(props.property,"detail")}><FaInfo size={28}/></MDBBtn>)
    }

    return(
        <MDBCard style={{ maxWidth: '540px' }} className="d-flex flex-column">
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage className="h-100 w-100" src={props.property.imageUrl} alt='...' fluid />
                </MDBCol>
                <MDBCol md='6'>
                <MDBCardBody>
                    <MDBCardTitle >{props.property.cityName}</MDBCardTitle>
                    <MDBCardText>{props.property.streetName}</MDBCardText>
                    <MDBCardText><FaEuroSign className="mb-1"/>{props.property.price}</MDBCardText>
                    <MDBCardText>
                    <small className='text-muted'>{props.property.area} m<sup>2</sup></small>
                    </MDBCardText>
                </MDBCardBody>
                </MDBCol>
                <MDBCol md='2' className="my-4 d-flex flex-column">
                    {buttons}
                </MDBCol>
            </MDBRow>
        </MDBCard>
    )
}