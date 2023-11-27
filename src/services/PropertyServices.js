import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"properties"

function getAllProperties() {
    return axios.get(`${hostName}`)
    .then(response=>response.data)
}

function getProperty(id){
    return axios.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function getRentedNotRentedRatio() {
     return axios.get(`${hostName}/dashboard/rentedRatio`)
    .then(response=>response.data)
}

function deleteProperty(id){
    return axios.delete(`${hostName}/${id}`)
    
}

function createProperty(formData) {
    return axios.post(`${hostName}`,formData)
}
function updateProperty(id,formData) {
    return axios.put(`${hostName}/${id}`,formData)
}

export default {
    getAllProperties,
    getProperty,
    getRentedNotRentedRatio,
    deleteProperty,
    createProperty,
    updateProperty
}