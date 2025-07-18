import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { signJwtToken } from "@/lib/jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: { include: { role: true } },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Email tidak ditemukan" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    const token = signJwtToken({
      id: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role.name),
    });

    // send response termasuk info user
    const response = NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles.map((r) => r.role.name),
      },
    });

    // set cookie JWT (httpOnly)
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
