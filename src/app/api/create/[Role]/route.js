import { connectDb } from "@/config/connectdb";
import { Usermodel } from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(request,{params}) {
  await connectDb(); 

  try {
    const body = await request.json(); 
 
    const Role = params.get('Role')
    const { Name, Email, Section, Password } = body;

    const user = await Usermodel.create({
      Name,
      Email,
      Section,
      Password,
      Role
    });

    return NextResponse.json({user},{status:200})

  } catch (err) {
    if(err.code ==11000) return NextResponse.json({message:"User with same email exist try to login."},{status:400})
    return NextResponse.json({message:err.message},{status:500})
  }
}
