import { MDBCard, MDBCardImage, MDBCardOverlay, MDBCardText, MDBCardTitle, MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import OrderServices from "../../services/OrderServices";
import OrderCard from "../../components/OrderCard";


export default function CustomerDashboard(){
    const user=JSON.parse(sessionStorage.getItem("user"))
    const [rentedOrder,setRentedOrder]=useState([])

    useEffect(()=>{
        OrderServices.getAllOrders(user.id)
        .then(data=>data.filter(order=>order.status=="ACCEPTED"))
        .then(acceptedOrders=>setRentedOrder(acceptedOrders.map((order,index)=><OrderCard order={order} key={index} isAccepted={true}/> )))
    },[])
    
    return(
        <MDBContainer fluid>
            <h1>Property you succesfully get!!!</h1>
            {rentedOrder}
        </MDBContainer>
    )
}