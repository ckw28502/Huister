import axiosInstance from "./AxiosService"

const hostName="orders"

function getAllOrders() {
    return axiosInstance.get(`${hostName}`)
    .then(response=>response.data)
}

function createOrder(formData) {
    return axiosInstance.post(`${hostName}`,formData)
}

function updateOrder(id,status) {
    return axiosInstance.put(`${hostName}/${id}`,{status:status})
}

export default {
    getAllOrders,
    createOrder,
    updateOrder
}