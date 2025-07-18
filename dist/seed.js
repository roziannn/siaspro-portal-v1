"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
  const roles = ["ADMIN", "DOSEN", "DOSEN_WALI", "MAHASISWA"];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }
  // seed User
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123", // plain, akan di-hash
      roles: ["ADMIN"],
    },
    {
      id: 2,
      name: "Dosen Wali",
      email: "dosenwali@example.com",
      password: "dosen123",
      roles: ["DOSEN_WALI"],
    },
    {
      id: 3,
      name: "Mahasiswa",
      email: "mahasiswa@example.com",
      password: "mahasiswa123",
      roles: ["MAHASISWA"],
    },
    {
      id: 4,
      name: "Multi Role User",
      email: "multi@example.com",
      password: "multi123",
      roles: ["DOSEN", "DOSEN_WALI"],
    },
  ];
  for (const user of users) {
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    // create user
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
    // assign roles
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
main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
