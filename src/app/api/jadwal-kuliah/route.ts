import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Trying to fetch jadwals");

    const jadwals = await prisma.jadwalKuliah.findMany();
    return NextResponse.json(jadwals);
  } catch (error) {
    console.error("Fetch jadwals error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch jadwals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validasi fields wajib
    if (!data.mataKuliah || !data.dosen || !data.ruangan || !data.hari || !data.jamMulai || !data.jamSelesai || typeof data.aktif !== "boolean") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newJadwal = await prisma.jadwalKuliah.create({ data });
    return NextResponse.json(newJadwal);
  } catch (error) {
    console.error("Create Jadwal Kuliah error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create Jadwal Kuliah" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing Jadwal Kuliah ID" }, { status: 400 });
    }

    const updatedJadwal = await prisma.jadwalKuliah.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedJadwal);
  } catch (error) {
    console.error("Update Jadwal Kuliah error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: `Jadwal Kuliah with ID ${error.meta?.cause || "unknown"} not found` }, { status: 404 });
      }
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update Jadwal Kuliah" }, { status: 500 });
  }
}
