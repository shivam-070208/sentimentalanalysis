import feedbackmodel from "@/models/feedbackmodel";
import { Usermodel } from "@/models/usermodel";

export async function POST(request){
    const {TeacherId,StudentId,Ratings,Feedback} = await request.json();
    try{
        const feedback = await feedbackmodel.create({
            TeacherId,
            StudentId,
            Ratings,
            Feedback
        });
        const student = await Usermodel.findById(StudentId);
        student.PendingFeedbacks = student.PendingFeedbacks.filter(id => id.toString() !== TeacherId.toString());
        await student.save();
        return new Response(JSON.stringify({message:"Feedback Submitted Successfully"}),{status:200});
    }catch(err){
        console.error("Error submitting feedback:", err);
        return new Response(JSON.stringify({message:"Failed to submit feedback"}),{status:500});
    }
}