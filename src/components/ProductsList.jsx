import { useEffect,useState } from "react";

import axios from "axios";
import ProductForm from "./ProductForm";

 export default function ProductsList(){

    const [products,setProducts] =  useState([]);

     const [user_query,updateUserQuery] = useState('');

     const [debounced_query,updateDebouncedQuery]  = useState(user_query);

    const [min_price,updateMinPrice] =useState("");

    const [max_price,updateMaxPrice] = useState("");

     // pagination logic 
     
     const  [pagination ,updatePagination] = useState(null);
     const [page,updatePage] = useState(1);






     const fetch_products = async ()=>{

            try{  const res = await axios.get(`http://127.0.0.1:8000/api/products?search=${user_query}`,{
                params:{search:debounced_query,min_price:min_price,max_price:max_price,page:page}}
            );
            
            console.log(res.data.data);
             setProducts(res.data.data);
            
         updatePagination(res.data);
            }catch(error){
                 console.log(error);
             }

     };

     const addNewProduct = (product) =>{
         console.log("new product is ",product);
         setProducts(old_array =>[product, ...old_array]);
     }


    
    useEffect(()=>{
        fetch_products();
    },[debounced_query,min_price,max_price,page]);

     useEffect(()=>{

         const schedule_search  = setTimeout(()=>{

             updateDebouncedQuery(user_query);

         },500);

         return ()=>clearTimeout(schedule_search);
     },[user_query]);

     useEffect(()=>{
         updatePage(1);
     },[debounced_query,min_price,max_price]);


    return (


        

        <div style={{backgroundColor:"brown",overflow:"scroll",width:"20rem",height:"50rem"}}>
    
        <div >


        <button disabled={!pagination?.prev_page_url} onClick={()=>updatePage(p=>p-1)} > PREVIOUS </button>

        <span> CURRENT PAGE {pagination?.current_page} OF {pagination?.last_page} </span>

       <button disabled={!pagination?.next_page_url} onClick={()=>updatePage(p=>p+1)} > NEXT </button> 




        </div>

        <input type="number" placeholder="enter min price" value={min_price} onChange={(e)=>updateMinPrice(e.target.value)}/>
        <input type="number" placeholder="enter max price" value={max_price} onChange={(e)=>updateMaxPrice(e.target.value)}/>

    


        <input type="text" placeholder="search products ...."  value={user_query} onChange={(e)=>updateUserQuery(e.target.value)} />
            


        <h2> Popular Products </h2>

        <ProductForm onProductCreated={addNewProduct}/>

        { products && products.map(p=>(

            <div key={p.id} >

            <h3> {p.name}</h3>

            <p> {p.price} </p>


            </div>


        ))}
            


        </div>





    )





















}
