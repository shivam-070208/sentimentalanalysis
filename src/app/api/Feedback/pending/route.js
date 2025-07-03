import { Usermodel } from "@/models/usermodel";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDb } from "@/config/connectdb";
import { NextResponse } from "next/server";

export async function POST() {
  await connectDb();

  try {
    const cookieStore =await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const studentData = jwt.verify(token, process.env.JWT_SECRET); // returns { id: "...", ... }

    const student = await Usermodel.findOne({Email:studentData});
   
    if (!student || student.Role !== "Student") {
  return NextResponse.json({ message: "Unauthorized user" }, { status: 403 });
}

const feedbackGiven = student.Feedbackgiven || [];
    const allFaculty = await Usermodel.find({ Role: "Faculty" });

    const pendingFaculty = allFaculty.filter(
      (faculty) =>
        !student.Feedbackgiven.some(
          (entry) => entry.TeacherId?.toString() === faculty._id.toString()
        )
    );

    return NextResponse.json(pendingFaculty, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
