'use client'

import { promises } from "dns"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { FaSketch } from "react-icons/fa6"

const Button = ({title , sumbit}:{title:string , sumbit: ()=> void}) =>{
    const [disable , setDisable] = useState(false)
    const submitHandle = () =>{
        setDisable(true)
    }

    return(
        <>
             <button disabled={disable} type='submit' onClick={()=>submitHandle()} className="disabled:bg-black bg-blue-500 hover:bg-blue-400 transition duration-500 py-4 px-14 text-white rounded-full" >
                {title}
            </button> 
        </>
    )
}

export default Button;