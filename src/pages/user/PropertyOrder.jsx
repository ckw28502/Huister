import { useEffect, useState } from "react"
import { forwardRef } from "react"
import OrderItem from "../../components/OrderItem"

const PropertyOrder=forwardRef(function PropertyOrder(props,ref){
    const [mappedOrders,setMappedOrders]=useState([])

    const removeOrder=id=>{
        props.removeOrder(id)
    }

    useEffect(()=>{
        setMappedOrders(props.orders.map((order,index)=><OrderItem key={index} removeOrder={removeOrder} id={order.id} customerName={order.customerName} price={order.price}/>))
    },[props.orders])

    return(
       <>
            <h2>ALL ORDERS</h2>
            {mappedOrders}

       </>
    )
})

export default PropertyOrder