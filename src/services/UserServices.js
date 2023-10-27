import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+'users'

function saveUser(formUser) {
    return axios.post(hostName,formUser);
}

async function Login(formData){
    const response = await axios.post(`${hostName}/login`, formData)
    return response.data
}

function getUser(id){
    return axios.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function getAllOwners() {
    return axios.get(`${hostName}/owners`)
    .then(response=>response.data)
}

export default {
    saveUser,
    Login,
    getAllOwners,
    getUser
}