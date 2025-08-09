"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = seedRoles;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoles() {
    const roles = ["administrator", "dosen", "dosen_wali", "mahasiswa"];
    for (const roleName of roles) {
        await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: { name: roleName },
        });
    }
}
