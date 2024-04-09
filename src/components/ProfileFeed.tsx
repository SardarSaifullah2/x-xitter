'use client'
import { GetInfinite } from "@/libs/inifiniteScroll";
import { PostItem } from "./postItem.ui";
import { user } from "@/type/type";
import InViewLoader from "./inViewLoader";

const ProfileFeed = ({userId , currentUser}:{userId:string , currentUser: user}) =>{
    let PageData ;
    if(userId){
        const data = GetInfinite({url:`/api/posts?userId=${userId}&`})
        PageData = data
    }
    return(
        <main>
            {
                PageData && PageData?.pagedata?.map((item , index)=>{
                    return(
                        <PostItem CurrentUser={currentUser} post={item} key={index}/>
                    )
                })
            }
             {!PageData?.IsReachEnd && <InViewLoader size={PageData?.size!} setSize={PageData?.setSize}/>}

            {PageData?.IsReachEnd === true ? (<div className="flex flex-col gap-1 items-center pb-[60px] mt-4"><h1 className="font-bold text-[30px] text-black">No More Posts</h1><p className="text-lg text-gray font-semibold">Refresh to see posts again</p></div> ) : ""}
        </main>
    )
}
export default ProfileFeed; 