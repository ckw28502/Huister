import { MDBBadge, MDBBtn, MDBCol, MDBListGroupItem } from "mdb-react-ui-kit";
import { FaCheck, FaEuroSign } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import OrderServices from "../services/OrderServices";
import ToastServices from "../services/ToastServices";


export default function OrderItem(props){
    const updateStatus=e=>{
        OrderServices.updateOrder(props.id,e.target.value)
        .then(()=>{
            ToastServices.Success("AN ORDER HAS BEEN SUCCESSFULLY "+e.target.value)
            props.removeOrder(props.id)
        })
    }
    return(
        <MDBCol className="mx-1" xl={8} md={12}>
            <MDBListGroupItem style={{cursor:"pointer"}} className='d-flex border-dark border border-5 rounded-pill bg-light justify-content-between align-items-center px-4 mx-1 mb-3 container-fluid min-w-100'>
                <div className='d-flex align-items-center'>
                <div className='ms-3 mt-2 px-4 d-flex flex-column align-items-center'>
                    <p className='fw-bold mb-1 h6'>{props.customerName} want to order this property</p>
                    <p className='fw-bold mb-1 h6'><FaEuroSign className="mb-1"/>for {props.price}/month</p>
                    <div>
                        <MDBBtn color="danger" onClick={e=>updateStatus(e)} value={"REJECTED"} className="mx-5 mb-3 mt-1"><FaX/></MDBBtn>
                        <MDBBtn color="success" onClick={e=>updateStatus(e)} value={"ACCEPTED"} className="mx-5 mb-3 mt-1"><FaCheck/></MDBBtn>
                    </div>
                </div>
                </div>
            </MDBListGroupItem>
        </MDBCol>
    )
}