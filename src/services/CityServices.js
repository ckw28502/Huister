import axios from "axios"

const hostName=import.meta.env.VITE_HUISTER_API_URL+"cities"

function getAllCities(){
    return axios.get(`${hostName}`)
    .then(response=>response.data)
}

export default{
    getAllCities
}