import { useEffect } from "react"
import { useImperativeHandle } from "react"
import { useState } from "react"
import { forwardRef } from "react"
import OrderServices from "../../services/OrderServices"
import OrderItem from "../../components/OrderItem"

const PropertyOrder=forwardRef(function PropertyOrder(props,ref){
    const [orders,setOrders]=useState(props.orders)
    const mappedOrder=orders.map((order,index)=><OrderItem key={index} id={order.id} customerName={order.customerName} price={order.price}/>)

    return(
       <>
            <h2>ALL ORDERS</h2>
            {mappedOrder}

       </>
    )
})

export default PropertyOrder