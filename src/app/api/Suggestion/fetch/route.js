import suggestionmodel from "@/models/suggestionmodel";

import { connectDb } from "@/config/connectdb";
export async function POST(request) {

    try{
      await connectDb()
      
        
        const suggestion =await suggestionmodel.find();  
        console.log(suggestion)
        return new Response(JSON.stringify({suggestion:suggestion}),{status:200});
    }catch(err){
    
        return new Response(JSON.stringify({message:"Failed to submit suggestion"}),{status:500});
    }    
}