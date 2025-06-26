import suggestionmodel from "@/models/suggestionmodel";
import { cookies } from "next/headers";
import *as jwt from 'jsonwebtoken';
import { connectDb } from "@/config/connectdb";
export async function POST(request) {
    const {Type,Description} = await request.json();
    try{
      await connectDb()
        const cookieStore = await cookies();
        const token = cookieStore.get('token').value
        const Student = jwt.verify(token,process.env.JWT_SECRET);
        const suggestion = await suggestionmodel.create({
            Type,
            Description,Student});    
        return new Response(JSON.stringify({message:"Suggestion Submitted Successfully"}),{status:200});
    }catch(err){
        console.log("Error submitting suggestion:", err);
        return new Response(JSON.stringify({message:"Failed to submit suggestion"}),{status:500});
    }    
}