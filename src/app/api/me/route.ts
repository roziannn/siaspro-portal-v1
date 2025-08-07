// /app/api/me/route.ts
import { verifyJwtToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = verifyJwtToken(token);

  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  return NextResponse.json({ user });
}
