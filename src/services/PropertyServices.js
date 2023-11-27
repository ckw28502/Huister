import axiosInstance from "./AxiosService"

const hostName="properties"

function getAllProperties() {
    return axiosInstance.get(`${hostName}`)
    .then(response=>response.data)
}

function getProperty(id){
    return axiosInstance.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

function getRentedNotRentedRatio() {
     return axiosInstance.get(`${hostName}/dashboard/rentedRatio`)
    .then(response=>response.data)
}

function deleteProperty(id){
    return axiosInstance.delete(`${hostName}/${id}`)
    
}

function createProperty(formData) {
    return axiosInstance.post(`${hostName}`,formData)
}
function updateProperty(id,formData) {
    return axiosInstance.put(`${hostName}/${id}`,formData)
}

export default {
    getAllProperties,
    getProperty,
    getRentedNotRentedRatio,
    deleteProperty,
    createProperty,
    updateProperty
}