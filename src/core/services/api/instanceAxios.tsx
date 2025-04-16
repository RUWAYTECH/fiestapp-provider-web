import axios from 'axios'
import Config from '../../config/config'
import Auth from '../auth/auth';

const instanceAxios = axios.create({
    baseURL: Config.baseUrlApi,
    headers: { 'Content-Type': 'application/json' },
})

instanceAxios.interceptors.request.use(config => {
    const token = Auth.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

instanceAxios.interceptors.response.use(
    response => {
        return response;
    },
   function(error){
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest.url != '/accounts/login'){
        Auth.logout();
        window.location.href='/';
    } 
    return Promise.reject(error)
   }
);

export { instanceAxios }
