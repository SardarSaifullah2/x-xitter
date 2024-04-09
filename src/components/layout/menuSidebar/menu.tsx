'use client'
import { RedirectType, redirect, usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { HiHashtag } from "react-icons/hi2";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiBellAlert } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaEnvelope } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { FaHashtag } from "react-icons/fa";

import { user } from "@/type/type";
import Button from "@/components/ui/button.2.0";
import { useState } from "react";
import PostUpload from "@/components/postUpload";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function Menu({currentUser}:{currentUser:user}){
    const [Post , setPost] = useState(false)
    const pathname  = usePathname()
     if(!currentUser){
        return redirect('/login' , RedirectType.replace)
    }
    const menus = [
        {
            label : "Home" ,
            link : "/" ,
            icons : HiOutlineHome,
            Solid : HiHome ,

        },
        {
            label : "Explore",
            link : `/explore`,
            icons : HiHashtag ,
            Solid : FaHashtag ,
            cursor : 'cursor-not-allowed'
        } ,
        {
            label : "Notification",
            link : `/notification`,
            icons : HiOutlineBellAlert ,
            Solid : HiBellAlert ,
            auth : true,
            cursor : 'cursor-not-allowed'
        } ,
        {
            label : "Profile",
            link : `/${currentUser?.username}`,
            icons : HiOutlineUser ,
            Solid : HiMiniUser ,
            auth : true,

        } ,
        {
            label : "Message",
            link : `/message`,
            icons : HiOutlineEnvelope ,
            Solid: FaEnvelope,
            auth : true,
            cursor : 'cursor-not-allowed'
        } ,
    ] 
    //  Button Click Function 
    const tweetHandle=()=>{
        setPost(!Post)
    }
    const onPost = () =>{
        setPost(!Post)
    }
    return(
            <div className="flex flex-row md:flex-col items-center md:items-start justify-around md:justify-start gap-3 mt-3 fixed bottom-0  md:relative  w-full bg-white  ">
                {menus && menus.map((item , index)=>{
                    const activePath = pathname === item?.link
                    const Icon = item.icons
                    const Solid = item.Solid
                
                    return(
                        <Link href={item.link} className={`flex flex-row gap-2 items-center p-2 w-fit rounded-full ${item.cursor || 'cursor-pointer'} transition duration-1000 hover:bg-[#e5e7eb]/60 `} key={index}>
                            <div className="w-fit h-fit">{activePath ? <Solid className={`w-[28px] h-[28px]`}  />:<Icon className={`w-[28px] h-[28px]`} />}</div>
                            <div className="text-[16px] text-black font-normal hidden lg:block">{item.label}</div>
                        </Link>
                    )
                })}

                {/* popUPload popup */}
                <div className="hidden lg:block">
                    <AlertDialog >
                            <AlertDialogTrigger onClick={tweetHandle} className="bg-blue-500 hover:bg-blue-400 transition duration-500 py-4 px-14 text-white rounded-full">
                                Tweet
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader className="flex flex-row justify-between">

                                    <AlertDialogTitle>Enter Your Comment</AlertDialogTitle>
                                    <AlertDialogCancel>
                                        <RxCross2/>
                                    </AlertDialogCancel>

                                </AlertDialogHeader>

                                {/* <AlertDialogDescription> */}
                                    <PostUpload/>
                                {/* </AlertDialogDescription> */}
                          
                            </AlertDialogContent>
                        </AlertDialog>


                        
                </div>

            </div>        
    )
}
