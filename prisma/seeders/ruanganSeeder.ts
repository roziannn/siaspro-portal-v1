// prisma/seed/ruanganSeeder.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedRuangans() {
  const ruangans = [
    {
      id: 1,
      nama: "Ruang Rapat 1",
      kapasitas: 20,
      lokasi: "Lantai 1 - Gedung A",
      status: "tersedia",
      fasilitas: "Proyektor, AC, Papan Tulis",
    },
    {
      id: 2,
      nama: "Ruang Rapat 2",
      kapasitas: 15,
      lokasi: "Lantai 1 - Gedung A",
      status: "tersedia",
      fasilitas: "AC, Papan Tulis",
    },
    {
      id: 3,
      nama: "Lab Komputer 1",
      kapasitas: 30,
      lokasi: "Lantai 2 - Gedung B",
      status: "tersedia",
      fasilitas: "Komputer, Proyektor, AC",
    },
    {
      id: 4,
      nama: "Lab Komputer 2",
      kapasitas: 25,
      lokasi: "Lantai 2 - Gedung B",
      status: "tidak tersedia",
      fasilitas: "Komputer, Proyektor, AC",
    },
    {
      id: 5,
      nama: "Aula Utama",
      kapasitas: 100,
      lokasi: "Lantai 1 - Gedung C",
      status: "tersedia",
      fasilitas: "Panggung, Sound System, Proyektor",
    },
    {
      id: 6,
      nama: "Ruang Multimedia",
      kapasitas: 40,
      lokasi: "Lantai 3 - Gedung B",
      status: "tersedia",
      fasilitas: "Komputer, Proyektor, AC, Speaker",
    },
    {
      id: 7,
      nama: "Ruang Guru",
      kapasitas: 25,
      lokasi: "Lantai 1 - Gedung A",
      status: "tersedia",
      fasilitas: "Meja, Kursi, AC",
    },
    {
      id: 8,
      nama: "Perpustakaan",
      kapasitas: 50,
      lokasi: "Lantai 1 - Gedung D",
      status: "tersedia",
      fasilitas: "Rak Buku, Meja Baca, AC",
    },
    {
      id: 9,
      nama: "Ruang Musik",
      kapasitas: 20,
      lokasi: "Lantai 2 - Gedung E",
      status: "tersedia",
      fasilitas: "Alat Musik, AC",
    },
    {
      id: 10,
      nama: "Studio Rekaman",
      kapasitas: 10,
      lokasi: "Lantai 2 - Gedung E",
      status: "tidak tersedia",
      fasilitas: "Peralatan Rekaman, AC, Soundproof",
    },
    {
      id: 11,
      nama: "Ruang Olahraga Indoor",
      kapasitas: 80,
      lokasi: "Lantai Dasar - Gedung F",
      status: "tersedia",
      fasilitas: "Lapangan, Papan Skor, Pencahayaan",
    },
    {
      id: 12,
      nama: "Lab Sains",
      kapasitas: 35,
      lokasi: "Lantai 2 - Gedung C",
      status: "tersedia",
      fasilitas: "Mikroskop, Peralatan Kimia, AC",
    },
    {
      id: 13,
      nama: "Ruang Seminar",
      kapasitas: 60,
      lokasi: "Lantai 3 - Gedung C",
      status: "tersedia",
      fasilitas: "Proyektor, Sound System, AC",
    },
    {
      id: 14,
      nama: "Ruang Workshop",
      kapasitas: 30,
      lokasi: "Lantai 1 - Gedung G",
      status: "tersedia",
      fasilitas: "Meja Kerja, Peralatan, AC",
    },
    {
      id: 15,
      nama: "Ruang Diskusi",
      kapasitas: 12,
      lokasi: "Lantai 1 - Gedung A",
      status: "tersedia",
      fasilitas: "Meja Bundar, Papan Tulis, AC",
    },
  ];

  for (const ruangan of ruangans) {
    await prisma.ruangan.upsert({
      where: { id: ruangan.id },
      update: {},
      create: {
        ...ruangan,
        createdAt: new Date(),
      },
    });
  }
}
