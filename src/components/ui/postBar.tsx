'use client'
import { useLike } from "@/hooks/useLike"
import { PostInt, user } from "@/type/type"
import { ArrowPathIcon, ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/outline"
import { FiShare } from "react-icons/fi"
import PostUpload from "../postUpload"
import { useState } from "react"
import { FaCopy } from "react-icons/fa6"
import toast from "react-hot-toast"
import Image from "next/image"
import { RedirectType, redirect } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { RxCross2 } from "react-icons/rx"


const PostBar = ({post ,CurrentUser}:{post:PostInt ,CurrentUser:user}) =>{
    
    const {hasLiked , toggleLiked} = useLike({postId:  post?._id , userId: CurrentUser?.id!})
    const [Comment , setComment] = useState(false)
    const [Share , setShare] = useState(false)
    const onLike = async() =>{
        toggleLiked();
    }
    const onComment = () =>{
        if(!CurrentUser){
            return redirect('/login' , RedirectType.replace)
        }  
        setComment(!Comment)
    }
    const onShare = () =>{
        setShare(!Share)
    }
    const saveHandler = () =>{
        navigator.clipboard.writeText(`http://localhost:3000/post/${post?._id}`)
        toast.success('copied!')
    }
    return(
        <div>
             <div className="">
                <div className="flex justify-between text-[14px]">
                    <div className={`${hasLiked=== true ? "text-[#F4235E]" : "text-black" } flex items-center `} onClick={onLike} >
                        <div className="rounded-full *has:hover:stroke-[#F4235E] transition duration-500">
                            <HeartIcon width={35} height={35} strokeWidth={1} className={`${hasLiked === true ?'fill-[#F4235E] stroke-[#F4235E]' : ' stroke-[#696464]' } hover:stroke-[#F4235E] cursor-pointer p-2 hover:bg-[#F4235E]/10 rounded-full transition duration-500`}/>
                        </div>
                        {post?.likeId?.length}
                    </div>
                    <div className="flex items-center text-[14px]" onClick={onComment} >
                       
                        <AlertDialog >
                            <AlertDialogTrigger>
                            <div className={`stroke-1	${hasLiked=== true ? "text-[#F4235E]" : "text-black"} flex  items-center`} >
                                <ChatBubbleLeftIcon width={35}  height={35} color="#302f2fc2" className={` p-2 stroke-1  hover:stroke-[#3B8cF6] cursor-pointer hover:bg-[#3B8cF6]/10 rounded-full transition duration-500`} cursor={'pointer'}  />
                            </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader className="flex flex-row justify-between">

                                    <AlertDialogTitle>Enter Your Comment</AlertDialogTitle>
                                    <AlertDialogCancel>
                                        <RxCross2/>
                                    </AlertDialogCancel>

                                </AlertDialogHeader>

                                <div className="">
                                <div className="flex flex-row gap-1 pb-8 pt-1 relative">
                                    <div className="imageContainer">
                                        <Image src={post?.userId?.image || ''} width={50} height={50} className="w-[50px] h-[50px] rounded-full relative z-10" alt="profile_img"/>
                                    </div>
                                    <div className="flex-[1]">
                                        <div className="flex gap-2">
                                            <div className="text-black font-semibold">{post?.userId?.name}</div>
                                            <div  className="text-gray font-semibold">{post?.userId?.username}</div>
                                        </div>
                                        <p>{post?.body}</p>
                                    </div>
                                </div>
                                    <PostUpload parent={post} setComment={setComment}/>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                        {post?.comment?.length}
                    </div>
                    <div className="rounded-full">
                        <FiShare size={35} width={35}  height={35} color="#302f2fc2" cursor={'pointer'} className={` p-2 stroke-1  hover:stroke-[#00b878] cursor-pointer  hover:bg-[#00b878]/10 rounded-full transition duration-500`} onClick={onShare}/>
                    </div>
                    <div className="rounded-full cursor-not-allowed">
                        <ArrowPathIcon  width={35}  height={35} color="#302f2fc2"  className={` p-2 stroke-1  hover:stroke-[#00b878] hover:bg-[#00b878]/10 rounded-full transition duration-500`} onClick={onShare}/>
                    </div>
                </div>
            </div>
            {/* shadcn diologue  */}
                       
        </div>
    )
}

export default PostBar ;