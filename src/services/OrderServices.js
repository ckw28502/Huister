import axiosInstance from "./AxiosService"

const hostName="orders"

function getAllOrders() {
    return axiosInstance.get(`${hostName}`)
    .then(response=>response.data)
}

export default {
    getAllOrders
}