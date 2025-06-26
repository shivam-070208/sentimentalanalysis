import feedbackmodel from "@/models/feedbackmodel";
import { Usermodel } from "@/models/usermodel";
import * as jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(request){
    const {TeacherId,Ratings,Feedback} = await request.json();
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token').value;
  
        
        const Student =  jwt.verify(token,process.env.JWT_SECRET)
        const feedback = await feedbackmodel.create({
            TeacherId,
            Student,
            Ratings,
            Feedback
        });
       
        return new Response(JSON.stringify({message:"Feedback Submitted Successfully"}),{status:200});
    }catch(err){
        console.log("Error submitting feedback:", err);
        return new Response(JSON.stringify({message:"Failed to submit feedback"}),{status:500});
    }
}