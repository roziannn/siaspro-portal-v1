import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = verifyJwtToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profil",
    "/profil/:path*",
    "/overview",
    "/overview/:path*",
    "/event",
    "/event/:path*",
    "/hasil-studi",
    "/hasil-studi/:path*",
    "/kelas-saya",
    "/kelas-saya/:path*",
    "/kelas-saya",
    "/kelas-saya/:path*",
    "/pembayaran",
    "/pembayaran/:path*",
    "/pesan",
    "/pesan/:path*",
    "/rencana-studi",
    "/rencana-studi/:path*",
    "/tugas",
    "/tugas/:path*",
  ],
};
