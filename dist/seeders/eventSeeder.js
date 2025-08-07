"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEvents = seedEvents;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedEvents() {
    const events = [
        {
            id: 1,
            jenis: "Workshop",
            nama: "Workshop AI & ML",
            tanggal: new Date("2025-08-15T09:00:00"),
            lokasi: "Aula Utama",
            kuota: 100,
            totalJoin: 0,
            status: client_1.EventStatus.OPEN,
            createdById: 1,
        },
        {
            id: 2,
            jenis: "Seminar",
            nama: "Seminar Nasional Teknologi",
            tanggal: new Date("2025-09-10T13:00:00"),
            lokasi: "Gedung Serbaguna",
            kuota: 200,
            totalJoin: 15,
            status: client_1.EventStatus.CLOSED,
            createdById: 1,
        },
        {
            id: 3,
            jenis: "Pelatihan",
            nama: "Pelatihan Web Development",
            tanggal: new Date("2025-10-05T08:00:00"),
            lokasi: "Lab Komputer 1",
            kuota: 50,
            totalJoin: 10,
            status: client_1.EventStatus.ONGOING,
            createdById: 2,
        },
    ];
    for (const event of events) {
        await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: event,
        });
    }
}
