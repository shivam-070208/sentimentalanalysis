import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { Usermodel } from "@/models/usermodel";
import { connectDb } from "@/config/connectdb";


export async function POST() {
  await connectDb();

  try {
    const getcookie = await cookies()
    const token = getcookie.get("token")?.value;
    if (!token) {
       
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await Usermodel.findOne({ Email: decoded });
   
    
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        Name: user.Name,
        Email: user.Email,
        Section: user.Section,
        Department: user.Department,
        Feedbackgiven: user.Feedbackgiven || [],
        Recent: user.Recent || [],
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
