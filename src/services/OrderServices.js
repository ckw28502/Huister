import axios from "axios"

const hostName="http://localhost:8080/orders"

function getAllOrders(userId) {
    return axios.get(`${hostName}/${userId}`)
    .then(response=>response.data)
}

export default {
    getAllOrders
}