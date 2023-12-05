import axios from "axios";

const hostName=import.meta.env.VITE_HUISTER_API_URL
const axiosInstance=axios.create({
    baseURL:hostName,
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token= JSON.parse(sessionStorage.getItem("token"))
        if (token) {
            config.headers["Authorization"]=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    async (error)=>{
        const originalConfig=error.config;
        if (error.response.status==401) {
            originalConfig._retry=true;
            const oldToken=JSON.parse(sessionStorage.getItem("token"))
            sessionStorage.clear()
            try{
                const refreshTokenPromise=await axios.post(hostName+"users/token",{
                    token:oldToken
                })
    
                const {token}=refreshTokenPromise.data;
    
                sessionStorage.setItem("token",JSON.stringify(token))
                return axiosInstance(originalConfig);
            }catch(_error){
                return Promise.reject(_error)
            }
        }
        return Promise.reject(error)
        
    }
)

export default axiosInstance