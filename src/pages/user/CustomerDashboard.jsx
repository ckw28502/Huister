import { MDBBtn, MDBBtnGroup, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import OrderServices from "../../services/OrderServices";
import OrderCard from "../../components/OrderCard";
import Order from "../../models/Order";
import UserServices from "../../services/UserServices";


export default function CustomerDashboard(){
    const [orders,setOrders]=useState(null)
    const [pendingColor,setPendingColor]=useState("primary")
    const [rejectedColor,setRejectedColor]=useState("secondary")
    const [acceptedColor,setAcceptedColor]=useState("secondary")
    const [showedOrders,setShowedOrders]=useState([])

    const changeTab=tab=>{
        switch (tab) {
            case "CREATED":
                setPendingColor("primary")
                setRejectedColor("secondary")
                setAcceptedColor("secondary")
                break;
            case "REJECTED":
                setPendingColor("secondary")
                setRejectedColor("primary")
                setAcceptedColor("secondary")
                break;
            case "ACCEPTED":
                setPendingColor("secondary")
                setRejectedColor("secondary")
                setAcceptedColor("primary")
                break;
            default:
                break;
        }
        updateOrder(tab)
        
    }

    const updateOrder=tab=>{
        console.log(orders.getOrders());
        setShowedOrders(orderConverter(orders.getOrders().filter(order=>order.status==tab)))
    }

    const cancelOrder=id=>{
        orders.removeOrder(id)
        updateOrder("CREATED")
    }

    const orderConverter=filteredOrders=>{
        return filteredOrders.map((order,index)=><OrderCard order={order} cancelOrder={()=>cancelOrder(order.id)} key={index}/>)
    }


    useEffect(()=>{
        OrderServices.getAllOrders()
        .then(data=>{
            setOrders(new Order(data))
        }).then()
    },[])

    useEffect(()=>{
        if (orders) {
            orders.subscribe(UserServices.getUserFromToken().id)
            updateOrder("CREATED")
        }
    },[orders])

    
    return(
        <MDBContainer fluid className="mx-3">
            <h1>Your Orders</h1>
            <MDBBtnGroup className="my-5">
                <MDBBtn color={pendingColor} onClick={e=>changeTab(e.target.value)} value="CREATED">PENDING</MDBBtn>
                <MDBBtn color={rejectedColor} onClick={e=>changeTab(e.target.value)} value="REJECTED">REJECTED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">ACCEPTED</MDBBtn>
            </MDBBtnGroup>
            <MDBRow className="mx-5">{showedOrders}</MDBRow>
        </MDBContainer>
    )
}