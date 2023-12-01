import { jwtDecode } from "jwt-decode";
import axiosInstance from "./AxiosService";

const hostName="users"


function saveUser(formUser) {
    return axiosInstance.post(hostName,formUser);
}

function getUserFromToken() {
    return jwtDecode(JSON.parse(sessionStorage.getItem("token")))
}

async function Login(formData){
    const response = await axiosInstance.post(`${hostName}/login`, formData)
    .then(response=>{
        const token=response.data.token
        sessionStorage.setItem("token",JSON.stringify(token))
        return jwtDecode(token)
    })
    return response
}

function activateAccount(username) {
    axiosInstance.put(`${hostName}/activate`,{username})
}

function getUser(id){
    return axiosInstance.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function Logout() {
    sessionStorage.clear();
}

function getAllOwners() {
    return axiosInstance.get(`${hostName}/owners`)
    .then(response=>response.data)
}

function forgotPassword(username){
    return axiosInstance.post(`${hostName}/forgot`,{username})
}

function changePassword(username,password){
    return axiosInstance.put(`${hostName}/changePassword`,{username,newPassword:password})
}

function updateUser(formData){
    return axiosInstance.put(`${hostName}`,formData)
}

export default {
    saveUser,
    Login,
    getAllOwners,
    getUser,
    getUserFromToken,
    Logout,
    activateAccount,
    forgotPassword,
    changePassword,
    updateUser
}