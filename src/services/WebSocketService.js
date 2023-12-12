import SockJS from "sockjs-client/dist/sockjs";
import webstomp from "webstomp-client";

let stompClient=null

function connect(){
    if(!stompClient){
        const socket=new SockJS(import.meta.env.VITE_HUISTER_WEBSOCKET_URL+"ws")
        stompClient=webstomp.over(socket)
    }
}

function subscribe(target,callback){
    if (stompClient) {
        stompClient.connect({},()=>{
            stompClient.subscribe(`/notifications`+target,orderJson=>{
                const newOrder=JSON.parse(orderJson.body)
                callback(newOrder)
            })
        })
    }
}

function disconnect(){
    if (stompClient) {
        stompClient.disconnect();
    }
}

export default {
    connect,
    disconnect,
    subscribe,
    stompClient
}