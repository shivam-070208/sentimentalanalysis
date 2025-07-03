import feedbackmodel from "@/models/feedbackmodel";
import { Usermodel } from "@/models/usermodel";

import * as jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { connectDb } from "@/config/connectdb";

export async function POST(request) {
  const { TeacherId, Ratings, Feedback } = await request.json();
 await connectDb()

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Unauthorized");

    const studentData = jwt.verify(token, process.env.JWT_SECRET);
    const User = await Usermodel.findOne({ Email: studentData});
    if (!User) throw new Error("User not found");

    const Teacher = await Usermodel.findById(TeacherId);
    if (!Teacher) throw new Error("Teacher not found");

    // Save feedback
    await feedbackmodel.create({
      TeacherId,
      Student: studentData,
      Ratings,
      Feedback,
    });

    // Add recent feedback activity
    User.Feedbackgiven.push({
      date: new Date(),
      teacherName: Teacher.Name,
      TeacherId,
      course: Teacher.Course || Teacher.Department,
    });
    await User.save();

    return new Response(
      JSON.stringify({ message: "Feedback Submitted Successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({ message: "Failed to submit feedback" }),
      { status: 500 }
    );
  }
}
