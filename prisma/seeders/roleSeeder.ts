import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = ["ADMIN", "DOSEN", "DOSEN_WALI", "MAHASISWA"];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }
}
