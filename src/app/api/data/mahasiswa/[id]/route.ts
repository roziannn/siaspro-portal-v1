import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const mahasiswa = await prisma.dataMahasiswa.findUnique({
      where: { id },
      include: { dosenWali: true },
    });

    if (!mahasiswa) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(mahasiswa);
  } catch (error) {
    console.error("Error fetching mahasiswa:", error);
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

    if (!data.nim || !data.nama || !data.email) {
      return NextResponse.json({ error: "Field nim, nama, dan email wajib diisi" }, { status: 400 });
    }

    const updatedMahasiswa = await prisma.dataMahasiswa.update({
      where: { id },
      data: {
        nim: data.nim,
        nama: data.nama,
        angkatan: data.angkatan,
        fakultas: data.fakultas,
        jurusan: data.jurusan,
        email: data.email,
        isActive: data.isActive,
        fotoUrl: data.fotoUrl,
        agama: data.agama,
        alamat: data.alamat,
        telp: data.telp,
        asalSekolah: data.asalSekolah,
        jalurMasuk: data.jalurMasuk,
        tahunMasuk: data.tahunMasuk,
        tanggalMasuk: data.tanggalMasuk,

        dosenWaliId: data.dosenWaliId, // get dr fe dan diupdate
      },
      include: {
        dosenWali: true,
      },
    });
    return NextResponse.json(updatedMahasiswa);
  } catch (error) {
    console.error("Error updating mahasiswa:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Data mahasiswa tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Terjadi kesalahan saat update" }, { status: 500 });
  }
}
