import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"orders"

function getAllOrders() {
    return axios.get(`${hostName}`)
    .then(response=>response.data)
}

export default {
    getAllOrders
}