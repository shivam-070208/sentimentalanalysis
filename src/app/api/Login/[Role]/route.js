import { connectDb } from "@/config/connectdb";
import { Usermodel } from "@/models/usermodel";
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request,{params}) {
    try{
        await connectDb();
        const para = await params;
    const Role = para.Role;
        const cookieStore = await cookies()
        const {Email,Password} = await request.json();
        const user = await Usermodel.findOne({Email,Role});
        if(!user) return NextResponse.json({message:"user with this email doesnot exist."},{status:404});
        const verify = await bcrypt.compare(Password,user.Password);
        if(verify){
            const token =  jwt.sign(Email,process.env.JWT_SECRET)
            cookieStore.set('token',token,{
                httpOnly:true,
                maxAge:86400*30,
                path:'/',
                secure:true
            })
            return NextResponse.json({user},{status:200})
        }
         return NextResponse.json({message:"Password is Invalid"},{status:401})

    }catch(err){
        
        return NextResponse.json({message:"server side error"},{status:400})
    }


}