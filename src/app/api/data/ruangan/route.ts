import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ruangans = await prisma.ruangan.findMany();
    return NextResponse.json(ruangans);
  } catch (error) {
    console.error("Fetch ruangan error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to fetch ruangan" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.nama || !data.kapasitas || !data.lokasi || !data.status) {
      return NextResponse.json({ error: "Field nama, kapasitas, lokasi, dan status wajib diisi" }, { status: 400 });
    }

    const newRuangan = await prisma.ruangan.create({
      data: {
        nama: data.nama,
        kapasitas: Number(data.kapasitas),
        lokasi: data.lokasi,
        status: data.status,
        fasilitas: data.fasilitas ?? "",
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ data: newRuangan }, { status: 201 });
  } catch (error) {
    console.error("Create ruangan error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: `Database error: ${error.code} - ${error.message}` }, { status: 500 });
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create ruangan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID ruangan wajib disertakan" }, { status: 400 });
    }

    if (!data.nama || !data.kapasitas || !data.lokasi || !data.status) {
      return NextResponse.json({ error: "Field nama, kapasitas, lokasi, dan status wajib diisi" }, { status: 400 });
    }

    const updatedRuangan = await prisma.ruangan.update({
      where: { id: Number(data.id) },
      data: {
        nama: data.nama,
        kapasitas: Number(data.kapasitas),
        lokasi: data.lokasi,
        status: data.status,
        fasilitas: data.fasilitas ?? "",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedRuangan);
  } catch (error) {
    console.error("Update ruangan error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data ruangan" }, { status: 500 });
  }
}
