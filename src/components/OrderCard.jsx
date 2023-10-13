import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FaEuroSign } from "react-icons/fa";

export default function OrderCard(props) {
    let buttons;
    if (props.role=="OWNER") {
        buttons=(<>
            <MDBBtn color="success" className="px-3 my-3 mx-3">ACCEPT</MDBBtn>
            <MDBBtn color="danger" className="px-3 my-3 mx-3">REJECT</MDBBtn>
        </>)
    }else{
        buttons=(<MDBBtn color="primary" disabled={props.isAccepted}className="w-75 my-5 mx-3">CANCEL</MDBBtn>)
    }

    return(
        <MDBCard style={{ maxWidth: '540px' }} className="d-flex flex-column">
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage className="h-100 w-100" src={props.order.imageUrl} alt='...' fluid />
                </MDBCol>
                <MDBCol md='4'>
                <MDBCardBody>
                    <MDBCardTitle >{props.order.cityName}</MDBCardTitle>
                    <MDBCardText>{props.order.streetName}</MDBCardText>
                    <MDBCardText><FaEuroSign className="mb-1"/>{props.order.price}/month</MDBCardText>
                    <MDBCardText>
                    <small className='text-muted'>Until {props.order.endRent}</small>
                    </MDBCardText>
                </MDBCardBody>
                </MDBCol>
                <MDBCol md='4' className="my-4 d-flex flex-column">
                    {buttons}
                </MDBCol>
            </MDBRow>
        </MDBCard>
    )
}