import { connectDb } from "@/config/connectdb";
import { Usermodel } from "@/models/usermodel";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import *as jwt from 'jsonwebtoken';
import { cookies } from "next/headers";



export async function POST(request,{params}) {
  await connectDb(); 

  try {
    const body = await request.json(); 
    const cookiestore = await cookies()
    const salt = await bcrypt.genSalt(10);
    const para = await params;
    const Role = para.Role;
    
    const { Name, Email, Section, Password } = body;
    const hashedPassword = await bcrypt.hash(Password,salt)

    const user = await Usermodel.create({
      Name,
      Email,
      Section,
      Password:hashedPassword,
      Role
    });
    const token =  jwt.sign(Email,process.env.JWT_SECRET)
    cookiestore.set('token',token,{
      httpOnly:true,
      secure:true,
       maxAge: 60 * 60 * 24,
       path: '/'
    })
    return NextResponse.json({user},{status:200})

  } catch (err) {
    if(err.code ==11000) return NextResponse.json({message:"User with same email exist try to login."},{status:400})
    return NextResponse.json({message:err.message},{status:500})
  }
}
