import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let stompClient=null

function connect(){
    if(!stompClient){
        const socket=new SockJS(import.meta.env.VITE_HUISTER_WEBSOCKET_URL+"ws")
        stompClient=Stomp.over(socket)
    }
}




function disconnect(){
    if (stompClient) {
        stompClient.disconnect();
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