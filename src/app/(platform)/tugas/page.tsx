"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type TugasItem = {
  id: string;
  judul: string;
  deadline: string;
  status: "Belum Dikerjakan" | "Sudah Dikerjakan";
  score?: number;
  dosen: string;
};

const tugasList: TugasItem[] = [
  { id: "1", judul: "Frontend Pemrograman Web", deadline: "2025-07-10T23:59:00", status: "Belum Dikerjakan", dosen: "Dosen A" },
  { id: "2", judul: "Struktur Data Tugas 3", deadline: "2025-07-12T15:00:00", status: "Sudah Dikerjakan", score: 85, dosen: "Dosen B" },
  { id: "3", judul: "Pertemuan Basis Data", deadline: "2025-07-15T12:30:00", status: "Belum Dikerjakan", dosen: "Dosen C" },
];

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "Belum Dikerjakan":
      return "bg-yellow-100 text-yellow-800";
    case "Sudah Dikerjakan":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getScoreBadgeColor(score?: number) {
  if (score === undefined) return "bg-gray-100 text-gray-700";
  if (score >= 85) return "bg-green-200 text-green-900";
  if (score >= 60) return "bg-yellow-200 text-yellow-900";
  return "bg-red-200 text-red-900";
}

export default function TugasPage() {
  const [search, setSearch] = useState("");

  const filteredTugas = tugasList.filter((tugas) => tugas.judul.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold">Daftar Tugas</h1>
          <Input type="text" placeholder="Cari tugas..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-auto rounded-md border">
            <table className="w-full min-w-[800px] text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border-b px-4 py-2 text-left">Dosen</th>
                  <th className="border-b px-4 py-2 text-left">Nama</th>
                  <th className="border-b px-4 py-2 text-left">Maks. Pengumpulan</th>
                  <th className="border-b px-4 py-2 text-left">Status</th>
                  <th className="border-b px-4 py-2 text-left">Score</th>
                  <th className="border-b px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTugas.map((tugas) => {
                  const deadline = new Date(tugas.deadline);
                  return (
                    <tr key={tugas.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="border-b px-4 py-2">{tugas.dosen}</td>
                      <td className="border-b px-4 py-2">{tugas.judul}</td>
                      <td className="border-b px-4 py-2">
                        {deadline.toLocaleDateString("id-ID", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {deadline.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border-b px-4 py-2">
                        <Badge className={getStatusBadgeColor(tugas.status)}>{tugas.status}</Badge>
                      </td>
                      <td className="border-b px-4 py-2">{tugas.score !== undefined ? <Badge className={getScoreBadgeColor(tugas.score)}>{tugas.score}</Badge> : <span className="text-muted-foreground">-</span>}</td>
                      <td className="border-b px-4 py-2">
                        <Link href={`/tugas/${tugas.id}`}>
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {filteredTugas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-muted-foreground">
                      Tidak ada tugas ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
