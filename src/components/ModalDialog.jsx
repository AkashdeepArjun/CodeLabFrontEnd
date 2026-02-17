import { useState } from "react"

import styles from "./ModalDialog.module.css"

export default function ModalDialog( { product ,onClose,onUpdate}){

    const [form_data,setFormData] = useState({
        name:product.name,
        price:product.price
    });

    const handle_update = (e) =>{

        setFormData({...form_data,[e.target.name]:e.target.value});



    };


    const handle_submit = ()=>{
        onUpdate(product.id,form_data);
    }




    return (
        
        <div className={styles["modal-overlay"]} >

            <div className={styles["modal"]}>

                <h2>Edit {product.name} </h2>

                <input name="name" value={form_data.name} onChange={handle_update}   />
                
                <input name="price" value={form_data.price} onChange={handle_update}   />
        
                <button className={styles["submit_button"]} onClick={handle_submit}>UPDATE </button>

                <button className={styles["close_button"]} onClick={onClose}>CANCEL </button>


            




            </div>






        </div>
        


    )

}
