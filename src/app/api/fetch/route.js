import { connectDb } from "@/config/connectdb";
import { Usermodel } from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDb();
    const faculties = await Usermodel.find({ Role: "Faculty" });
    return NextResponse.json({ data: faculties }, { status: 200 });
  } catch (err) {
    
    return NextResponse.json({ message: "Error at server side" }, { status: 500 });
  }
}
