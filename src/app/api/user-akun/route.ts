import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const roleMap: Record<string, number> = {
  administrator: 1,
  dosen: 2,
  dosen_wali: 3,
  mahasiswa: 4,
};

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        userrole: {
          select: {
            roleId: true,
          },
        },
      },
    });

    const mappedUsers = users.map((user) => ({
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      role: user.userrole[0]?.roleId ?? null,
    }));

    return NextResponse.json(mappedUsers);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, name, role, isActive } = await request.json();

    if (!email || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const roleId = roleMap[role];

    const defaultPassword = "password";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10); // 10 = salt rounds

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isActive,
        userrole: {
          create: {
            roleId,
          },
        },
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, name, role, isActive } = await request.json();

    if (!email || !role) {
      return NextResponse.json({ error: "Missing email or role" }, { status: 400 });
    }

    const roleId = roleMap[role];

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        isActive,
        userrole: {
          deleteMany: {},
          create: {
            roleId,
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
