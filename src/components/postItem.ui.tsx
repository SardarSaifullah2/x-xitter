'use client'

import { PostInt, user } from "@/type/type";
import Image from 'next/image'
import Link from "next/link";
import PostBar from "./ui/postBar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FollowBtn } from "./followbtn";
import { DeletePosts } from "@/actions/deletePost";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  
  
export function  PostItem({post , CurrentUser}:{post:PostInt , CurrentUser:user}){     
const [visible , setVisible] = useState(false)
const date = new Date(post?.createdAt!);

date.setDate(date.getDate() - 1);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formattedDate = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} · ${("0" + date.getDate()).slice(-2)} ${months[date.getMonth()]} ${date.getFullYear()}`;
// post dropdown 
 
   async function DeletePost(){
       const result = await DeletePosts(post?._id)
       if(result) setVisible(true)
   }
    return(

          <main className={`hover:bg-gray/10 w-full border-b border-gray/15`}>
           {!visible && <>
                <div className="flex gap-3 p-4  xl:p-6 ">
                                
                    <div className="w-fit h-fit">
                        {
                            post?.userId?.image && <Image src={post?.userId?.image} width={48} height={48} className="rounded-full l w-[48px] h-[48px] object-cover" alt={"profile image"}></Image>      
                        }
                    </div>
                    <div className="flex-[1] relative">
                            {/* {user profile detail} */}
                        <div className="flex gap-2 items-center select-none">
                            <div className="flex justify-between w-full">
                               
                               {/* post profile tooltip  */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={`/${post?.userId?.username}`}  className="flex items-center gap-1 cursor-pointer">
                                                <h4 className="text-[16px] font-semibold capitalize text-black">{post?.userId?.name}</h4>
                                                <h6 className="text-[16px] font-semibold text-gray">@{post?.userId?.username}</h6>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div className="flex flex-row items-center justify-between">
                                                <div className="flex flex-row gap-1">
                                                    <div>
                                                    {
                                                        post?.userId?.image && <Image src={post?.userId?.image} width={48} height={48} className="rounded-full l w-[48px] h-[48px] object-cover" alt={"profile image"}></Image>      
                                                    }
                                                    </div>
                                                    <div className="flex flex-col items-start gap-1 cursor-pointer">
                                                        <h4 className="text-[16px] font-semibold capitalize text-black">{post?.userId?.name}</h4>
                                                        <h6 className="text-[16px] font-semibold text-gray">@{post?.userId?.username}</h6>
                                                    </div>
                                                </div>
                                                <div><FollowBtn profileUser={post?.userId} currentUser={CurrentUser}/></div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="">{post?.userId?.bio}</p>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                    {/* end  */}
                                <div>
                                {/* dropDown post option  */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="outline-none">
                                            <HiOutlineDotsHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {
                                                post?.userId?._id === CurrentUser?.id! 
                                                ? (
                                                    <>
                                                        <DropdownMenuItem className="cursor-not-allowed">Edit</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={DeletePost}>Delete</DropdownMenuItem>
                                                        
                                                    </>
                                                ) : (
                                                    <>
                                                        <DropdownMenuItem ><FollowBtn profileUser={post?.userId} currentUser={CurrentUser}/></DropdownMenuItem>
                                                    </>
                                                )
                                            }
                                        
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </div>
                            </div>

                        </div>
                            {/* {Post detail} */}
                        <div className="pb-1">
                            <div>
                                <Link href={`/post/${post?._id}`}>
                                    <p className="text-black text-[16px] tracking-[0.02em] break-words de tracking-1 leading-5 max-w-[500px]">{post?.body}</p>
                                </Link>

                                <div className="p-1">
                                    { post?.image &&  <Image src={post?.image} alt="image" className="w-full h-[250px] md:h-[300px] object-cover rounded-xl" width={250} height={150}></Image> }
                                </div>
                                {/* {post time } */}
                                <div className="text-[16px] text-gray hover:underline decoration-gray w-fit tracking-[0.04em] py-2 ">{formattedDate}</div>
                            </div>
                        </div>
                            {/* {like section} */}
                        
                        <div className="">
                            <PostBar post={post} CurrentUser={CurrentUser}/>
                        </div>
                    </div>
                </div>
           </>}  
        </main>
    )
}