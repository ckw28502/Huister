import { useEffect, useState } from "react"
import { forwardRef } from "react"
import OrderItem from "../../components/OrderItem"

const PropertyOrder=forwardRef(function PropertyOrder(props,ref){
    const [mappedOrders,setMappedOrders]=useState([])
    const [orders,setOrders]=useState(props.orders)

    const removeOrder=id=>{
        setOrders(orders.filter(order=>order.id!=id))
        props.removeOrder(id)
    }

    useEffect(()=>{
        setMappedOrders(orders.map((order,index)=><OrderItem key={index} removeOrder={removeOrder} id={order.id} customerName={order.customerName} price={order.price}/>))
    },[orders])

    useEffect(()=>{
        setOrders(props.orders)
    },[props.orders])

    return(
       <>
            <h2>ALL ORDER RENTS</h2>
            {mappedOrders}

       </>
    )
})

export default PropertyOrder