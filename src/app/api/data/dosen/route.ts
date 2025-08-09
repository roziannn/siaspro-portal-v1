import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const dosen = await prisma.dataDosen.findMany({
      include: {
        mahasiswa: true,
      },
    });
    return NextResponse.json(dosen);
  } catch (error) {
    console.error("Fetch dosen error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch dosen" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.nip || !data.nama || !data.email) {
      return NextResponse.json({ error: "NIP, Nama, dan Email wajib diisi" }, { status: 400 });
    }

    const newDosen = await prisma.dataDosen.create({
      data: {
        nip: data.nip,
        nama: data.nama,
        email: data.email,
        kontak: data.kontak ?? "",
        pendidikan: data.pendidikan ?? "",
        gelar: data.gelar ?? "",
        kampus: data.kampus ?? "",
        jabatan: data.jabatan ?? "",
        pangkat: data.pangkat ?? "",
        alamat: data.alamat ?? "",
        isActive: data.isActive ?? true,
        fotoUrl: data.fotoUrl ?? null,
        tahunMasuk: data.tahunMasuk ?? null,
        tanggalMasuk: data.tanggalMasuk ?? null,
      },
    });

    return NextResponse.json(newDosen, { status: 201 });
  } catch (error) {
    console.error("Create dosen error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create dosen" }, { status: 500 });
  }
}
