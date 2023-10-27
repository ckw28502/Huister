import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"properties"

function getAllProperties(id) {
    return axios.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function getRentedNotRentedRatio(id) {
     return axios.get(`${hostName}/dashboard/rentedRatio/${id}`)
    .then(response=>response.data)
}

export default {
    getAllProperties,
    getRentedNotRentedRatio
}