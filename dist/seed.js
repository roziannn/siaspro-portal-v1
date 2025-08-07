"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSeeder_1 = require("./seeders/userSeeder");
const eventSeeder_1 = require("./seeders/eventSeeder");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🚀 Seeding started...");
    await (0, userSeeder_1.seedUsers)();
    await (0, eventSeeder_1.seedEvents)();
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
