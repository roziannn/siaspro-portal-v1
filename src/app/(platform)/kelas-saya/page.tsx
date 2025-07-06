"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { Download } from "lucide-react";

type ClassItem = {
  namaKelas: string;
  kodeKelas: string;
  dosen: string;
  semester: string;
  status: "Tidak Ada Tugas" | "Quiz" | "Ada Materi Baru";
};

import rawData from "./data.json";

const dataKelas: ClassItem[] = rawData as ClassItem[];

export default function MyClassesPage() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const filteredKelas = dataKelas.filter((kelas) => kelas.namaKelas.toLowerCase().includes(search.toLowerCase()) || kelas.kodeKelas.toLowerCase().includes(search.toLowerCase()));

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Tidak Ada Tugas":
        return "bg-green-100 text-green-700";
      case "Quiz":
        return "bg-yellow-100 text-yellow-700";
      case "Ada Materi Baru":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Kelas Sedang Berjalan</h1>
        <Input type="text" placeholder="Cari kelas atau kode..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredKelas.length > 0 ? (
          filteredKelas.map((kelas, index) => (
            <Card key={index} className="p-3 hover:shadow transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{kelas.namaKelas}</h3>
                      <p className="text-xs text-muted-foreground">{kelas.kodeKelas}</p>
                    </div>
                    <Badge className={`${getBadgeColor(kelas.status)} text-xs`}>{kelas.status}</Badge>
                  </div>
                  <p className="text-sm">
                    <strong>Dosen:</strong> {kelas.dosen}
                  </p>
                  <p className="text-sm">
                    <strong>Semester:</strong> {kelas.semester}
                  </p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedClass(kelas)}>
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">Tidak ada kelas ditemukan.</p>
        )}
      </div>

      {/* MODAL DETAIL KELAS */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm" onClick={() => setSelectedClass(null)}>
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl max-w-4xl w-full shadow-2xl border border-gray-200 dark:border-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{selectedClass.namaKelas}</h2>
              <span className="text-sm text-muted-foreground">{selectedClass.semester}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-200">
              {/* Bagian Kiri */}
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">👨‍🏫 Dosen Pengampu</p>
                  <p className="font-medium">{selectedClass.dosen}</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">📚 Silabus</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>HTML, CSS & JavaScript</li>
                    <li>Framework & Backend (Laravel)</li>
                    <li>Final Project & Presentasi</li>
                  </ul>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">📦 Modul Materi</p>
                  <a href="/modul/pemrograman-web.pdf" download className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                    <Download size={16} />
                    Unduh Modul PDF
                  </a>
                </div>
              </div>

              {/* Bagian Kanan */}
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">📅 Riwayat Pertemuan</p>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    <li>Pertemuan 1: Pengenalan Web</li>
                    <li>Pertemuan 2: Struktur HTML</li>
                    <li>Pertemuan 3: CSS Layouting</li>
                  </ul>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">📝 Catatan</p>
                  <p className="leading-snug">Harap mengikuti deadline tugas mingguan yang diumumkan di LMS.</p>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">✅ Kehadiran Saya</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                      <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">3 Hadir / 4 Pertemuan</p>
                  </div>
                  <ul className="text-xs space-y-1 mt-1 text-muted-foreground pl-2">
                    <li>🟢 Pertemuan 1 - Hadir</li>
                    <li>🔴 Pertemuan 2 - Tidak Hadir</li>
                    <li>🟢 Pertemuan 3 - Hadir</li>
                    <li>🟡 Pertemuan 4 - Belum Diisi</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setSelectedClass(null)}>Tutup</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
