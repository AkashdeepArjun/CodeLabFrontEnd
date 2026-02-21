import { useState } from "react";

import  axios from "axios";
 import { addProduct } from "../services/ProductServices";

export default function ProductForm({onProductCreated}){


    const [name,setName] =  useState('');
    
    const [price,setPrice] = useState('');

    const [description,setDesc] = useState('');

    const addProd = async (e) =>{

        e.preventDefault();
        
        const response = await addProduct({

        name,
        price,
        description


        });

        onProductCreated(response.data.data);
        setName("");
        setPrice("");
        setDesc("");
    }

    return(
    
        <form onSubmit={addProd}> 
        
        <input type="text" value= {name} onChange={(e)=>setName(e.target.value)} placeholder="name"/>
        <input type="number" value= {price} onChange={(e)=>setPrice(e.target.value)} placeholder="price"/>
        <input type="text" value= {description} onChange={(e)=>setDesc(e.target.value)} placeholder="description"/>
        
        <button type="submit" >Create </button>



        </form>





    );








}


