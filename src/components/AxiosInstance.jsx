import axios from 'axios'


const isDevlopment = import.meta.env.MODE === 'development';
const baseUrl = isDevlopment ? import.meta.env.VITE_API_BASE_URL_LOCALS :  import.meta.env.VITE_API_BASE_URL_DEPLOYS


const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000, 
    headers:{
        "Content-Type":"application/json",
         accept: "application/json"
    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        else{
            config.headers.Authorization = ``
        }
        return config;
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('Token')
        }

    }
)

export default AxiosInstance;