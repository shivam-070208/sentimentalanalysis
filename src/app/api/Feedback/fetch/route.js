import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import *as jwt from 'jsonwebtoken';
import { Usermodel } from "@/models/usermodel";
import Feedbackmodel from "@/models/feedbackmodel";
import { connectDb } from "@/config/connectdb";

export async function  POST(request) {

    try{
        await connectDb()
        const cookieStore = await cookies();
        const token = cookieStore.get('token').value;
        const Email = jwt.verify(token,process.env.JWT_SECRET);
        const user = await Usermodel.findOne({Email});
        const feedback = await Feedbackmodel.find({TeacherId:user._id});

         return  NextResponse.json({feedback:feedback},{status:200})
    }catch(err){
      
        
       return NextResponse.json({message:err.message},{status:400})
    }
}