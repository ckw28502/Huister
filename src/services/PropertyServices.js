import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"properties"

function getAllProperties() {
    return axios.get(`${hostName}`)
    .then(response=>response.data)
}

function getRentedNotRentedRatio() {
     return axios.get(`${hostName}/dashboard/rentedRatio`)
    .then(response=>response.data)
}

function deleteProperty(id){
    return axios.delete(`${hostName}/${id}`)
    
}

export default {
    getAllProperties,
    getRentedNotRentedRatio,
    deleteProperty
}