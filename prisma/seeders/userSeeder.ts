import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
    {
      id: 1,
      name: "Administrator",
      email: "admin@example.com",
      password: "admin123",
      roles: ["administrator"],
    },
    {
      id: 2,
      name: "Dosen Wali",
      email: "dosenwali@example.com",
      password: "dosen123",
      roles: ["dosen_wali"],
    },
    {
      id: 3,
      name: "Mahasiswa",
      email: "mahasiswa@example.com",
      password: "mahasiswa123",
      roles: ["mahasiswa"],
    },
    {
      id: 4,
      name: "Multi Role User",
      email: "multi@example.com",
      password: "multi123",
      roles: ["dosen", "dosen_wali"],
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isActive: true,
      },
    });

    // Hubungkan user dengan roles
    for (const roleName of user.roles) {
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      if (role) {
        await prisma.userRole.upsert({
          where: {
            userId_roleId: {
              userId: createdUser.id,
              roleId: role.id,
            },
          },
          update: {},
          create: {
            userId: createdUser.id,
            roleId: role.id,
          },
        });
      }
    }
  }
}
