import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mahasiswa = await prisma.dataMahasiswa.findMany();
    return NextResponse.json(mahasiswa);
  } catch (error) {
    console.error("Fetch mahasiswa error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch mahasiswa" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validasi sederhana
    if (!data.nim || !data.nama || !data.angkatan || !data.fakultas || !data.jurusan || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMahasiswa = await prisma.dataMahasiswa.create({
      data: {
        nim: data.nim,
        nama: data.nama,
        angkatan: data.angkatan,
        fakultas: data.fakultas,
        jurusan: data.jurusan,
        email: data.email,
        isActive: data.isActive ?? true,
        fotoUrl: data.fotoUrl ?? null,
      },
    });

    return NextResponse.json(newMahasiswa, { status: 201 });
  } catch (error) {
    console.error("Create mahasiswa error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create mahasiswa" }, { status: 500 });
  }
}
