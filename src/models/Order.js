import ToastServices from "../services/ToastServices";
import WebSocketService from "../services/WebSocketService";

export default class Order{
    constructor(orders){
        this.orders=orders;
    }

    subscribe(target){
        WebSocketService.connect()
        const stompClient=WebSocketService.getStompClient()
        if (stompClient) {
            stompClient.connect({},()=>{
                stompClient.subscribe(`/notifications/order/`+target,orderJson=>{
                    const newOrder=JSON.parse(orderJson.body)
                    switch (newOrder.status) {
                        case "CREATED":
                            this.orders.push(newOrder)
                            ToastServices.Info("A RENT ORDER HAS BEEN RECEIVED\nCLOSE THE MODAL TO SEE THE CHANGE")
                            break;
                        case "CANCELLED":
                            this.removeOrder(newOrder.id)
                            ToastServices.Info("A RENT ORDER HAS BEEN CANCELLED\nCLOSE THE MODAL TO SEE THE CHANGE")
                            break
                        case "ACCEPTED" :
                            this.changeStatus(newOrder.id,newOrder.propertyId,newOrder.status)
                            this.orders.forEach(order=>{
                                if (order.id==newOrder.id) {
                                    order.status=newOrder.status
                                }else if (order.propertyId==newOrder.propertyId) {
                                    order.status="REJECTED"
                                }
                            })
                            ToastServices.Info("A RENT ORDER HAS BEEN ACCEPTED\nOPEN YOUR DASHBOARD TO SEE IT")
                            break
                        case "REJECTED" :
                            this.orders.forEach(order=>{
                                if (order.id==newOrder.id) {
                                    order.status=newOrder.status
                                }
                            })
                            ToastServices.Info("A RENT ORDER HAS BEEN REJECTED\nOPEN YOUR DASHBOARD TO SEE IT")
                            break
                        default:
                            break;
                    }
                })
            })
        }
    }

    removeOrder(id){
        console.log(id);
        this.orders=this.orders.filter(order=>order.id!=id)
    }

    changeStatus(id,propertyId,status){
        
        console.log(this.orders);
    }

    getOrders(){
        return this.orders
    }
}