import { useEffect,useState } from "react";

import styles from './ProductsList.module.css';

import { getProducts,addProduct,removeProduct ,updateProduct, api_logout, get_current_user } from "../services/ProductServices";

import axios from "axios";
import ProductForm from "./ProductForm";
import Skeleton from "./Skeleton";
import ModalDialog from "./ModalDialog";
import { useNavigate } from "react-router-dom";

 export default function ProductsList(){


     const navigate = useNavigate();

    const [products,setProducts] =  useState([]);

     const [user_query,updateUserQuery] = useState('');

     const [debounced_query,updateDebouncedQuery]  = useState(user_query);

    const [min_price,updateMinPrice] =useState("");

    const [max_price,updateMaxPrice] = useState("");

     const [loading,setLoading] = useState(true);

     const [isEditDialogOpen ,setEditDialogOpen] =useState(false);

    const [selectedProduct ,setSelectedProduct] = useState(null);



     const openEditDialog = (product) =>{
         setSelectedProduct(product);
         setEditDialogOpen(true);

     }


     const logout = async (e) =>{

        e.preventDefault();

         try {

 
            const response = await api_logout();

             console.log(response);

            localStorage.removeItem("token");
             localStorage.removeItem("user");
             navigate('/login');

          



            
         } catch (error) {
            console.log(" THE ERROR HAVE VISTED ",error);
         }
         
           

         


     }




     // pagination logic 
     
     const  [pagination ,updatePagination] = useState(null);
     const [page,updatePage] = useState(1);


     const delete_product = async (id) => {

         if(!window.confirm('are you sure')){
             return;
         }
         try {
            
            
             await removeProduct(id);

             fetch_products();



         } catch (error) {
            
             console.log("could not delete given product",error);
         }


     }


     const handle_update_product = async (id,product) =>{

         await updateProduct(id,product);
         setEditDialogOpen(false);
         fetch_products();
         


     }





     const fetch_products = async ()=>{
            
            console.log(" FETCHING PRODUCTS WITH TOKEN ",localStorage.getItem("token"));
            try{ 
            const res = await getProducts({
            search: debounced_query,min_price:min_price,max_price:max_price,page:page});  
            console.log("response we got was ",res);
             setProducts(res.data.data);
            setLoading(false)
            
         updatePagination(res.data);
            }catch(error){
                 console.log("ERROR SPOOTTED ", error);
             }

     };

     const addNewProduct = async(product) =>{
         // console.log("new product is ",product);
         
        try { 
             setProducts(old_array =>[product, ...old_array]);
         }catch(error){

             console.log(error);
         }



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


        

        <div className={styles["parent"]} >

        {isEditDialogOpen && (<ModalDialog
            product={selectedProduct}
            onClose={()=>setEditDialogOpen(false)}
            onUpdate={handle_update_product}


            />)}



    
        <div >


        


        <button disabled={!pagination?.prev_page_url} onClick={()=>updatePage(p=>p-1)} > PREVIOUS </button>

        <span> CURRENT PAGE {pagination?.current_page} OF {pagination?.last_page} </span>

       <button disabled={!pagination?.next_page_url} onClick={()=>updatePage(p=>p+1)} > NEXT </button> 




        </div>

        <button className={styles["logout_button"]} onClick={logout}> LOGOUT </button>

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
                
                <button className={styles["edit_button"]} onClick={()=> openEditDialog(product) }> EDIT</button>

                </div>




            ))



        ) }




        

      
            


        </div>





    )





















}
