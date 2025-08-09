import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const dosen = await prisma.dataDosen.findUnique({
      where: { id },
      include: { mahasiswa: true },
    });

    if (!dosen) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(dosen);
  } catch (error) {
    console.error("Error fetching dosen:", error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const data = await request.json();

    if (!data.nip || !data.nama || !data.email) {
      return NextResponse.json({ error: "Field nip, nama, dan email wajib diisi" }, { status: 400 });
    }

    const updatedDosen = await prisma.dataDosen.update({
      where: { id },
      data: {
        nip: data.nip,
        nama: data.nama,
        email: data.email,
        kontak: data.kontak,
        pendidikan: data.pendidikan,
        gelar: data.gelar,
        kampus: data.kampus,
        jabatan: data.jabatan,
        pangkat: data.pangkat,
        alamat: data.alamat,
        isActive: data.isActive,
        fotoUrl: data.fotoUrl,
        tahunMasuk: data.tahunMasuk,
        tanggalMasuk: data.tanggalMasuk ? new Date(data.tanggalMasuk) : null,
      },
      include: {
        mahasiswa: true,
      },
    });

    return NextResponse.json(updatedDosen);
  } catch (error) {
    console.error("Error updating dosen:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Data dosen tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Terjadi kesalahan saat update" }, { status: 500 });
  }
}
