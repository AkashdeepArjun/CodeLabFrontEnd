import axios from "axios";
import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { api_login } from "../services/ProductServices";


export default function Login(){

    const navigate = useNavigate();

    const [loading,setLoading]  = useState(false);

    const [ login_error ,setLoginError] = useState(null);

    const [user,setUser]  = useState({
        email:'',
        password:''
    });

    const handle_user_input = (e) =>{

        setUser({...user,[e.target.name]:e.target.value});
    


    }


    const login = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {

            const response = await api_login(user);


            localStorage.setItem('token',response.data.token);

            console.log("current use token is ",response.data.token);


            localStorage.setItem("user",JSON.stringify(response.data.user));


            axios.defaults.headers.common["Authorization"]= `Bearer ${response.data.token}`;

            navigate('/products');


        } catch (error) {
            setLoginError(error);
            console.log("error have happened ",error);
            
        }finally{
            setUser({...user,email:'',password:''});
            setLoading(false);
        }


    }

    useEffect(()=>{

        const token = localStorage.getItem("token");

        if(token){
            axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
        }


    },[])







return (

    <div className={styles["parent"]}>


        <input type="email" name="email" value={user.email} onChange={handle_user_input} placeholder="Enter user email "/>

        <input type="password" name="password" value={user.password} onChange={handle_user_input} placeholder="Enter user password"/>


        <button className={styles["login_button"]} onClick={login}>LOGIN </button>
        
        <a href="/signup" > <button className={styles["signup_button"]}> DONT HAVE ACCOUNT ? SIGNUP  </button> </a>
        
    

        

        





    </div>



    
)


}
