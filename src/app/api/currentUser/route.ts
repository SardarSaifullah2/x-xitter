import serverAuth from "@/libs/serverAuth"
import { NextResponse } from "next/server"

export async function GET(){
    const currentUser = await serverAuth()
    return NextResponse.json(currentUser)
}