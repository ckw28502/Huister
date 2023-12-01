import axiosInstance from "./AxiosService"

const hostName="cities"

function getAllCities(){
    return axiosInstance.get(`${hostName}`)
    .then(response=>response.data)
}

export default{
    getAllCities
}