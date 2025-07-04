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
    <div className="px-4 lg:px-6 w-full mx-auto space-y-6">
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
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border px-2 py-1">No.</th>
                  <th className="border px-2 py-1">Kode</th>
                  <th className="border px-2 py-1">Nama Mata Kuliah</th>
                  <th className="border px-2 py-1">SKS</th>
                  <th className="border px-2 py-1">Dosen</th>
                  <th className="border px-2 py-1">Nilai</th>
                  <th className="border px-2 py-1">Mutu</th>
                  <th className="border px-2 py-1">Ulang</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .find((s) => s.id === activeSemesterId)
                  ?.mataKuliah.map((mk, i) => (
                    <tr key={mk.kode} className={`${mk.ulang ? "bg-red-100 dark:bg-red-900 font-semibold" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{mk.kode}</td>
                      <td className="border px-2 py-1 text-left">{mk.nama}</td>
                      <td className="border px-2 py-1">{mk.sks}</td>
                      <td className="border px-2 py-1">{mk.dosen}</td>
                      <td className="border px-2 py-1">{mk.nilai}</td>
                      <td className="border px-2 py-1">{mk.mutu.toFixed(2)}</td>
                      <td className="border px-2 py-1">{mk.ulang ? "Ya" : "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
