'use client'
import { SetUsername } from "@/actions/profileData";
import Button from "@/components/ui/button.2.0";
import Input from "@/components/ui/input";
import { SwrData } from "@/hooks/swr";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function Username(){
  const {data:currentUser} = SwrData('/api/currentUser')
    const [username , setUsername] = useState<string>('')
  const [AlreadyTaken , setAlreadyTaken] = useState(false)
    const handle = useMemo(() => {
       return currentUser && currentUser.username ? true : false;
    }, [currentUser]);
    const router = useRouter()
    if(handle){
      router.push('/')
    }
    const submitUsername  = async() =>{
      if(username === '' || username === undefined){
        toast.error('Your Field is Empty')
        return null
      }
      else{
        const result = await SetUsername(username) 
        if(result){
          toast.success(`Well Done..!`)
          router.push(`/`)
        }else{
          setAlreadyTaken(true)
        }
        
      }
    }
    return(
      <>
      {currentUser && 
        <div className="w-screen h-screen flex  ">
                <div className="w-[80%] mx-auto mt-60 flex flex-col gap-5">
                  {AlreadyTaken && <div className="text-[18px] text-red-800">Username already Taken</div>}
                <Input id="username" value={username} Fn={setUsername} type="text" placeholder="Enter Your Username ....!" label="" inputProp={'text-[40px] tracking-widest border-transparent border-b border-b-gray/50 rounded-none'} />
                <Button title="Let's Rock" sumbit={submitUsername}  /> 
            </div>
        </div> 
}
      </>
    )
}