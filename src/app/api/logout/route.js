// File: app/api/logout/route.js

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
const cookiestore = await cookies();
cookiestore.delete('token');

  return NextResponse.json({message:'logout'},{status:200})
}
