"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconDownload } from "@tabler/icons-react";

import dataKRS from "./data.json";

type MataKuliahKRS = {
  kode: string;
  nama: string;
  dosen: string;
  sks: number;
  jadwal: string;
  kelas: string;
};

const mahasiswa = {
  nik: "3210050604030005",
  nama: "Firda Rosiana",
  nim: "1234567890",
  dosenPembimbing: "Dr. Michael Thompson",
  programStudi: "D4 - Sistem Informasi Bisnis",
  semester: "Ganjil",
  statusKRS: "Menunggu Verifikasi",
};

export default function KRSPage() {
  const totalSks = dataKRS.reduce((acc, mk) => acc + mk.sks, 0);

  return (
    <div className="px-4 lg:px-6 w-full mx-auto">
      <Card className="border shadow-md">
        <CardHeader className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-2">
          <div>
            <CardTitle className="text-xl leading-tight">
              Kartu Rencana Studi (KRS)
              <br />
              <span className="text-sm text-muted-foreground font-semibold">Tahun Akademik 2025/2026 - Semester {mahasiswa.semester}</span>
            </CardTitle>
          </div>
          <Button size="sm" variant="outline">
            <IconDownload className="w-4 h-4 mr-2" />
            Unduh KRS
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informasi Mahasiswa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm border-b pb-4 border-muted">
            <div className="space-y-2">
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">NIK</p>
                <p>{mahasiswa.nik}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Nama</p>
                <p>{mahasiswa.nama}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">NIM</p>
                <p>{mahasiswa.nim}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Dosen Pembimbing</p>
                <p>{mahasiswa.dosenPembimbing}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Program Studi</p>
                <p>{mahasiswa.programStudi}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Semester</p>
                <p>{mahasiswa.semester}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Total SKS</p>
                <p>{totalSks} SKS</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Status KRS</p>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    mahasiswa.statusKRS === "Terverifikasi" ? "bg-green-100 text-green-700" : mahasiswa.statusKRS === "Menunggu Verifikasi" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {mahasiswa.statusKRS}
                </span>
              </div>
            </div>
          </div>

          {/* Tabel KRS */}
          <div className="overflow-auto rounded-lg border">
            <table className="w-full text-sm text-left border-collapse min-w-[700px]">
              <thead className="bg-muted text-muted-foreground border-b">
                <tr>
                  <th className="p-3">No</th>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Mata Kuliah</th>
                  <th className="p-3">Dosen</th>
                  <th className="p-3">SKS</th>
                  <th className="p-3">Jadwal</th>
                  <th className="p-3">Kelas</th>
                </tr>
              </thead>
              <tbody>
                {dataKRS.map((mk, index) => (
                  <tr key={mk.kode} className="border-b hover:bg-muted/50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{mk.kode}</td>
                    <td className="p-3">{mk.nama}</td>
                    <td className="p-3">{mk.dosen}</td>
                    <td className="p-3">{mk.sks}</td>
                    <td className="p-3">{mk.jadwal}</td>
                    <td className="p-3">{mk.kelas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
