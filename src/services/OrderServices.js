import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"orders"

function getAllOrders(userId) {
    return axios.get(`${hostName}/${userId}`)
    .then(response=>response.data)
}

export default {
    getAllOrders
}