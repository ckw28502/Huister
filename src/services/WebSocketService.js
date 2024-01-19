import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let stompClient=null

function connect(){
    if(!stompClient){
        const socket=new SockJS(import.meta.env.VITE_HUISTER_WEBSOCKET_URL+"ws")
        stompClient=Stomp.over(socket)
        console.log("connected");
    }
}

function disconnect(){
    if (stompClient) {
        stompClient.deactivate( );
        stompClient=null;
    }
}

function getStompClient() {
    return stompClient
}

export default {
    connect,
    disconnect,
    getStompClient
}