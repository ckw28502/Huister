import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default class WebSocketService{
    constructor(){
        this.stompClient=null;
        this.orders=[]
        this.orderCallbacks=[]
    }

    subscribeToOrder(callback){
        this.orderCallbacks.push(callback)
    }

    notifyOrderCallbacks(){
        this.orderCallbacks.forEach(callback=>callback(this.orders))
    }

    connect(propertyId){
        const socket=new SockJS("/ws")
        this.stompClient=Stomp.over(socket)

        this.stompClient.connect({},()=>{
            this.stompClient.subscribe(`/notifications/order/${propertyId}`,orderJson=>{
                const newOrder=JSON.parse(orderJson.body)
                this.orders.push=[...this.orders,newOrder]
                this.notifyOrderCallbacks()
            })
        })
    }

    disconnect(){
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
    }

}