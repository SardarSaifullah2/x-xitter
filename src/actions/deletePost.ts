'use server'
import Connect from "@/libs/connect";
import serverAuth from "@/libs/serverAuth";
import { Post } from "@/schema/postSchema";

export async function DeletePosts(id:string){
    const currentUser = await serverAuth()
    if(!currentUser){
        return null
    }
    await Connect()
    const findPost = await Post.findByIdAndDelete(id)
    const findParentPost = await Post.findOneAndDelete({parent : id})
    console.log('done')
    return true
}