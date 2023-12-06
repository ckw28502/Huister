import { MDBBtn, MDBBtnGroup, MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import OrderServices from "../../services/OrderServices";
import OrderCard from "../../components/OrderCard";


export default function CustomerDashboard(){
    const [orders,setOrders]=useState([])
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
        setShowedOrders(orderConverter(orders.filter(order=>order.status==tab)))
    }

    const orderConverter=filteredOrders=>{
        return filteredOrders.map((order,index)=><OrderCard order={order} key={index}/>)
    }

    useEffect(()=>{
        OrderServices.getAllOrders()
        .then(data=>{
            setOrders(data)
            const pendingOrders=data.filter(order=>order.status=="CREATED")
            setShowedOrders(orderConverter(pendingOrders))
        })
    },[])
    
    return(
        <MDBContainer fluid>
            <h1>Your Orders</h1>
            <MDBBtnGroup className="my-5">
                <MDBBtn color={pendingColor} onClick={e=>changeTab(e.target.value)} value="CREATED">PENDING</MDBBtn>
                <MDBBtn color={rejectedColor} onClick={e=>changeTab(e.target.value)} value="REJECTED">REJECTED</MDBBtn>
                <MDBBtn color={acceptedColor} onClick={e=>changeTab(e.target.value)} value="ACCEPTED">ACCEPTED</MDBBtn>
            </MDBBtnGroup>
            {showedOrders}
        </MDBContainer>
    )
}