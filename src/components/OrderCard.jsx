import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FaEuroSign } from "react-icons/fa";
import OrderServices from "../services/OrderServices";
import ToastServices from "../services/ToastServices";

export default function OrderCard(props) {
    let buttons;
    let endRent;

    const cancelOrder=()=>{
        OrderServices.updateOrder(props.order.id,"CANCELLED")
        .then(()=>ToastServices.Success("Order successfully cancelled!"))
    }
    
    if (props.order.status=="CREATED") {
        buttons=(<MDBBtn color="danger" onClick={cancelOrder} className="w-75 my-5 mx-3">CANCEL</MDBBtn>)
    }

    if (props.order.endRent) {
        endRent=`until ${props.order.endRent}`
    }

    return(
        <MDBCard style={{ maxWidth: '540px' }} className="d-flex flex-column">
            <MDBRow className='g-0'>
                <MDBCol md='4'>
                <MDBCardImage className="object-fit-cover w-100" style={{height:"16vw"}} src={props.order.imageUrl} alt='...' />
                </MDBCol>
                <MDBCol md='4'>
                <MDBCardBody>
                    <MDBCardTitle >{props.order.cityName}</MDBCardTitle>
                    <MDBCardText>{props.order.streetName}</MDBCardText>
                    <MDBCardText><FaEuroSign className="mb-1"/>{props.order.price}/month</MDBCardText>
                    <MDBCardText>
                    <small className='text-muted'>{endRent}</small>
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