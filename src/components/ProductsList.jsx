import { useEffect,useState } from "react";

import styles from './ProductsList.module.css';


import axios from "axios";
import ProductForm from "./ProductForm";
import Skeleton from "./Skeleton";

 export default function ProductsList(){

    const [products,setProducts] =  useState([]);

     const [user_query,updateUserQuery] = useState('');

     const [debounced_query,updateDebouncedQuery]  = useState(user_query);

    const [min_price,updateMinPrice] =useState("");

    const [max_price,updateMaxPrice] = useState("");

     const [loading,setLoading] = useState(true);

     // pagination logic 
     
     const  [pagination ,updatePagination] = useState(null);
     const [page,updatePage] = useState(1);


     const delete_product = async (id) => {

         if(!window.confirm('are you sure')){
             return;
         }
         try {
            
            
             await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);

             fetch_products();



         } catch (error) {
            
             console.log("could not delete given product",error);
         }


     }






     const fetch_products = async ()=>{

            try{  const res = await axios.get(`http://127.0.0.1:8000/api/products?search=${user_query}`,{
                params:{search:debounced_query,min_price:min_price,max_price:max_price,page:page}}
            );
            
            console.log(res.data.data);
             setProducts(res.data.data);
            setLoading(false)
            
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


        

        <div >
    
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

        {loading?(
            Array.from({length:5}).map((_,index)=>(

                <Skeleton key={index}/>




            ))
        ):(

            products.map(product=>(

                <div className={styles["card"]} key={product.id}> 

                <h3 className={styles["name"]}>{product.name}</h3>

                <p className={styles["price"]}>{product.price} </p>

                <button className={styles["del_button"]} onClick={() => delete_product(product.id)}>DELETE </button>


                </div>




            ))



        ) }




        

      
            


        </div>





    )





















}
