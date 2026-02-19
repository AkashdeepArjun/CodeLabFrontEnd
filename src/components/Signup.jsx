
import { useState } from "react"
import styles from "./Signup.module.css"
import { api_signup } from "../services/ProductServices";
import { Navigate, useNavigate } from "react-router-dom";


export default function Signup(){

    const navigate = useNavigate();

    const [loading_state,setLoading] = useState(false);

    const [error_state,setSignupError] = useState(null);

    const [user ,setUser] =  useState({
        email:'',
        password:''
    })

    const handle_input = (e) =>{

        
        setUser({...user,[e.target.name]:e.target.value})


    }


    const signup =  async (e) =>{
  e.preventDefault();
        setLoading(true);
      
        try {
            
            const response = await api_signup(user);
            

            localStorage.setItem("token",response.data.token);

            localStorage.setItem("user",JSON.stringify(response.data.user));


            navigate("/products");




           
            


        } catch (error) {

            setLoading(false);
            setSignupError(error);



        }finally{
             setLoading(false);
        }






    }




    return (

        <div className={styles["parent"]}> 


        <input type="email" name="email" value= {user.email} placeholder=" Enter user mail" onChange={handle_input}/>

        <input type="password" name="password" value={user.password} placeholder="Enter User password" onChange={handle_input}/>

        <button onClick={signup}> SIGNUP </button>


        </div>




    )  











}
