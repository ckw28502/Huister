import axios from "axios"
import { jwtDecode } from "jwt-decode";

const hostName=import.meta.env.VITE_HUISTER_API_URL+'users'

if (sessionStorage.getItem("token")!=null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`;
}


function saveUser(formUser) {
    return axios.post(hostName,formUser);
}

function getUserFromToken() {
    return jwtDecode(JSON.parse(sessionStorage.getItem("token")))
}

async function Login(formData){
    const response = await axios.post(`${hostName}/login`, formData)
    .then(response=>{
        const token=response.data.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        sessionStorage.setItem("token",JSON.stringify(token))
        return jwtDecode(token)
    })
    return response
}

function activateAccount(username) {
    axios.put(`${hostName}/activate`,{username})
}

function getUser(id){
    return axios.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function Logout() {
    sessionStorage.clear();
    axios.defaults.common.headers["Authorization"]=null;
}

function getAllOwners() {
    return axios.get(`${hostName}/owners`)
    .then(response=>response.data)
}

export default {
    saveUser,
    Login,
    getAllOwners,
    getUser,
    getUserFromToken,
    Logout,
    activateAccount
}