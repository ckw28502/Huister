import axios from "axios"

const hostName="http://localhost:8080/properties"

function getAllProperties(id) {
    return axios.get(`${hostName}/${id}`)
    .then(response=>response.data)
}

export default {
    getAllProperties
}