"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MataKuliah = {
  kode: string;
  nama: string;
  sks: number;
  dosen: string;
  nilai: string;
  mutu: number;
  ulang: boolean;
};

type SemesterData = {
  id: number;
  semester: string;
  sksKontrak: number;
  sksSelesai: number;
  mutu: number;
  ip: number;
  mataKuliah: MataKuliah[];
};

import data from "./data.json";

export default function NilaiPerSemester() {
  const [activeSemesterId, setActiveSemesterId] = useState<number | null>(null);

  return (
    <div className="px-1 lg:px-6 w-full mx-auto space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Nilai Per Semester</h1>

      {/* List semester summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((sem) => (
          <Card key={sem.id} className={`cursor-pointer hover:shadow-lg transition-shadow ${activeSemesterId === sem.id ? "border-blue-500 border-2" : ""}`} onClick={() => setActiveSemesterId(sem.id === activeSemesterId ? null : sem.id)}>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="text-lg font-medium">{sem.semester}</div>
                <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                  <div>
                    SKS Kontrak: <span className="font-semibold">{sem.sksKontrak}</span>
                  </div>
                  <div>
                    SKS Selesai: <span className="font-semibold">{sem.sksSelesai}</span>
                  </div>
                  <div>
                    Mutu: <span className="font-semibold">{sem.mutu.toFixed(2)}</span>
                  </div>
                  <div>
                    IP: <span className="font-semibold">{sem.ip.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail mata kuliah untuk semester yang aktif */}
      {activeSemesterId && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Mata Kuliah Semester {data.find((s) => s.id === activeSemesterId)?.semester}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-lg border">
              <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="p-3">No.</th>
                    <th className="p-3">Kode</th>
                    <th className="p-3">Nama Mata Kuliah</th>
                    <th className="p-3">SKS</th>
                    <th className="p-3">Dosen</th>
                    <th className="p-3">Nilai</th>
                    <th className="p-3">Mutu</th>
                    <th className="p-3">Ulang</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .find((s) => s.id === activeSemesterId)
                    ?.mataKuliah.map((mk, i) => (
                      <tr key={mk.kode} className={`border-b ${mk.ulang ? "bg-red-100 dark:bg-red-900 font-semibold text-gray-800 dark:text-white" : "hover:bg-muted/50"}`}>
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3">{mk.kode}</td>
                        <td className="p-3">{mk.nama}</td>
                        <td className="p-3">{mk.sks}</td>
                        <td className="p-3">{mk.dosen}</td>
                        <td className="p-3">{mk.nilai}</td>
                        <td className="p-3">{mk.mutu.toFixed(2)}</td>
                        <td className="p-3">{mk.ulang ? "Ya" : "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
