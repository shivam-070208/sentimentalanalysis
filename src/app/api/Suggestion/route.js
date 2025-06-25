import suggestionmodel from "@/models/suggestionmodel";

export async function POST(request) {
    const {Type,Description,StudentId} = request.json();
    try{
        const suggestion = await suggestionmodel.create({
            Type,
            Description,StudentId});    
        return new Response(JSON.stringify({message:"Suggestion Submitted Successfully"}),{status:200});
    }catch(err){
        console.error("Error submitting suggestion:", err);
        return new Response(JSON.stringify({message:"Failed to submit suggestion"}),{status:500});
    }    
}