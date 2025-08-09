import "dotenv/config";

import { seedRoles } from "./seeders/roleSeeder";
import { seedUsers } from "./seeders/userSeeder";
import { seedEvents } from "./seeders/eventSeeder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding started...");
  await seedRoles();
  await seedUsers();
  await seedEvents();
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
