"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const roleSeeder_1 = require("./seeders/roleSeeder");
const userSeeder_1 = require("./seeders/userSeeder");
const eventSeeder_1 = require("./seeders/eventSeeder");
const dosenSeeder_1 = require("./seeders/dosenSeeder");
const mahasiswaSeeder_1 = require("./seeders/mahasiswaSeeder");
const ruanganSeeder_1 = require("./seeders/ruanganSeeder");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🚀 Seeding started...");
    await (0, roleSeeder_1.seedRoles)();
    await (0, userSeeder_1.seedUsers)();
    await (0, eventSeeder_1.seedEvents)();
    await (0, dosenSeeder_1.seedDosens)();
    await (0, mahasiswaSeeder_1.seedMahasiswas)();
    await (0, ruanganSeeder_1.seedRuangans)();
    console.log("✅ Seeding completed!");
}
main()
    .catch((err) => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
