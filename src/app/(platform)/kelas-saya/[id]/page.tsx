"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import rawData from "../data.json";

type ClassItem = {
  id: number;
  namaKelas: string;
  kodeKelas: string;
  dosen: string;
  semester: string;
  status: "Tidak Ada Tugas" | "Quiz" | "Ada Materi Baru" | "Materi Baru";
};

const pertemuanList = [
  {
    id: 1,
    nama: "Pertemuan 1: Pengenalan Web",
    attachment: "/modul/pertemuan1.pdf",
  },
  {
    id: 2,
    nama: "Pertemuan 2: Struktur HTML",
    attachment: "/modul/pertemuan2.pdf",
  },
  {
    id: 3,
    nama: "Pertemuan 3: CSS Layouting",
    attachment: "/modul/pertemuan3.pdf",
  },
  {
    id: 4,
    nama: "Pertemuan 4: JavaScript Dasar",
    attachment: "/modul/pertemuan4.pdf",
  },
];

// Simulasi kehadiran saya per pertemuan
const kehadiranSaya: Record<number, "hadir" | "tidak hadir" | "belum isi"> = {
  1: "hadir",
  2: "tidak hadir",
  3: "hadir",
  4: "belum isi",
};

export default function DetailKelasPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const kelas = (rawData as ClassItem[]).find((k) => k.id === id);

  if (!kelas) {
    return <p className="text-center py-10 text-muted-foreground">Kelas tidak ditemukan.</p>;
  }

  const getStatusBadgeClass = (status: string) => {
    if (status === "hadir") return "bg-green-100 text-green-700";
    if (status === "tidak hadir") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700"; // belum isi
  };

  return (
    <div className="px-4 lg:px-6 space-y-8">
      {/* Header dengan judul dan tombol Kembali */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold leading-tight">{kelas.namaKelas}</h1>
          <Badge className={`${kelas.status === "Tidak Ada Tugas" ? "bg-green-100 text-green-700" : kelas.status === "Quiz" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"} text-sm font-semibold py-1 px-3 rounded-full`}>
            {kelas.status}
          </Badge>
        </div>

        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Kiri - Info Kelas */}
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="font-semibold">Info Kelas</h2>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
            <p>
              <strong>Kode Kelas:</strong> {kelas.kodeKelas}
            </p>
            <p>
              <strong>Dosen Pengampu:</strong> {kelas.dosen}
            </p>
            <p>
              <strong>Semester:</strong> {kelas.semester}
            </p>

            <div>
              <p className="font-semibold mb-1">📚 Silabus</p>
              <ul className="list-disc list-inside pl-5 space-y-1">
                <li>HTML, CSS & JavaScript</li>
                <li>Framework & Backend (Laravel)</li>
                <li>Final Project & Presentasi</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-1">📦 Modul Materi</p>
              <a href="/modul/pemrograman-web.pdf" download className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 transition-colors duration-150">
                <Download size={16} />
                Unduh Modul PDF
              </a>
            </div>

            <div>
              <p className="font-semibold mb-1">📝 Catatan</p>
              <p>Harap mengikuti deadline tugas mingguan yang diumumkan.</p>
            </div>
          </CardContent>
        </Card>

        {/* Card Kanan - Riwayat & Kehadiran */}
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="font-semibold">Riwayat Kehadiran</h2>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-200 text-sm overflow-y-auto pr-3">
            {pertemuanList.map((p) => {
              const status = kehadiranSaya[p.id] || "belum isi";
              return (
                <div key={p.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md">
                  <div className="flex items-center gap-3">
                    <span>{p.nama}</span>
                    <Badge className={`${getStatusBadgeClass(status)} text-xs font-semibold py-0.5 px-2 rounded-full`}>{status}</Badge>
                  </div>
                  <a href={p.attachment} download className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-xs font-medium">
                    <Download size={14} />
                    Modul PDF
                  </a>
                </div>
              );
            })}

            {/* Avatar dan Nama Dosen di bawah */}
            <div className="flex items-center gap-3 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <Avatar>
                <AvatarFallback>
                  {kelas.dosen
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{kelas.dosen}</p>
                <p className="text-xs text-muted-foreground">Dosen Pengampu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
