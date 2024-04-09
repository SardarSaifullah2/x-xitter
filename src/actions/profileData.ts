'use server'

import Connect from "@/libs/connect";
import serverAuth from "@/libs/serverAuth";
import { User } from "@/schema/userSchema";
import { NextResponse } from "next/server";

export interface FormValueInt {
    [key: string]: string | null | File; 
}
export async function ProfileData(formData:FormData){
    const currentUser = await serverAuth()
    if(!currentUser){
        return NextResponse.json(null)
    }
    const FormLable = ["image" , "profileBanner" , "name" , "passion" , "bio" , "location" , "bod"]
    let FormValue:FormValueInt
     = {}
     for (const field of FormLable) {
        if (formData.has(field) && typeof field === 'string') {
            FormValue[field] = formData.get(field)!;
        }
    }
    Connect()
    
    const FindUser = await User.findOneAndUpdate(
        {_id : currentUser?.id} ,
        FormValue
        ,{new : true}
    )
    return true
}

export async function SetUsername(username : string){
 const currentUser = await serverAuth()
 const checkUsername = await User.findOne({username})
 if(!checkUsername){
     await User.findOneAndUpdate(
       { _id : currentUser?.id } ,
       {username: username} ,
       {new : true}
     )
     return true
 }else{
     return false
 }
}