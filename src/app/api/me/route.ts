import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt"; // <-- gunakan ini

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = verifyJwtToken(token);

  if (!user) {
    return NextResponse.json({ message: "Token tidak valid" }, { status: 401 });
  }

  return NextResponse.json({ user }); // payload dari token
}
