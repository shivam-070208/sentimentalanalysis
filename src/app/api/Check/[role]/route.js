import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { Usermodel } from "@/models/usermodel";
import { connectDb } from "@/config/connectdb";


export async function POST(request,{params}) {
  await connectDb();

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized: Token not found" }), { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded;

   const p = await params;
   
   const role = p.role;
  

    if (!role || !["Student", "Faculty"].includes(role)) {
      return new Response(JSON.stringify({ message: "Invalid or missing role" }), { status: 400 });
    }
    
    const user = await Usermodel.findOne({ Email: email, Role: role });

    if (!user) {
      return new Response(JSON.stringify({ exists: false, message: "User not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        exists: true,
        user: {
          Name: user.Name,
          Email: user.Email,
          Role: user.Role,
        },
      }),
      { status: 200 }
    );
  } catch (err) {

    console.log(err);
    
    return new Response(JSON.stringify({ message: "Server error", error: err.message }), {
      status: 500,
    });
  }
}
