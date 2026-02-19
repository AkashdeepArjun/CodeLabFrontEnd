
import axios from "axios";

const API = axios.create({baseURL:"http://127.0.0.1:8000/api"});

API.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }

    return config;

})



export const getProducts = (params) => API.get("/products",{params});

export const addProduct = (data) => API.post('/products',data);

export const removeProduct = (id)=>API.delete(`/products/${id}`);

export const updateProduct =(id,data)=>API.put(`/products/${id}`,data);

export const api_signup  = async (data) =>API.post('/signup',data);

export const api_login = async (data) => API.post(`/login`,data);

export const api_logout = async () => API.post('/logout');

export const get_current_user = () => JSON.parse(localStorage.getItem("user"));


