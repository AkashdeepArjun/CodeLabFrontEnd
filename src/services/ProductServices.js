
import axios from "axios";

const API = "http://127.0.0.1:8000/api/products";

export const getProducts = (params) =>axios.get(API,{params});
export const addProduct = (data) => axios.post(API,data);

export const removeProduct = (id)=>axios.delete(`${API}/${id}`);

export const updateProduct =(id,data)=>axios.put(`${API}/${id}`,data);




