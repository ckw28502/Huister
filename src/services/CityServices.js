import axios from "axios"

const hostName="http://localhost:8080/cities"

function getAllCities(userId){
    return axios.get(`${hostName}/${userId}`)
    .then(response=>response.data)
}

export default{
    getAllCities
}