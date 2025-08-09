import "dotenv/config";

import { seedRoles } from "./seeders/roleSeeder";
import { seedUsers } from "./seeders/userSeeder";
import { seedEvents } from "./seeders/eventSeeder";
import { seedDosens } from "./seeders/dosenSeeder";
import { seedMahasiswas } from "./seeders/mahasiswaSeeder";
import { seedRuangans } from "./seeders/ruanganSeeder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding started...");
  await seedRoles();
  await seedUsers();
  await seedEvents();
  await seedDosens();
  await seedMahasiswas();
  await seedRuangans();
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
