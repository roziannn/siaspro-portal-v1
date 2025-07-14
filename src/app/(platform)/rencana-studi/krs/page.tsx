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
    <div className="px-1 lg:px-6 w-full mx-auto">
      <Card className="border shadow-md">
        <CardHeader className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-4 md:gap-2">
          <div>
            <CardTitle className="text-xl leading-tight">
              Kartu Rencana Studi (KRS)
              <br />
              <span className="block mt-3 text-sm font-semibold">Tahun Akademik 2025/2026 - Semester {mahasiswa.semester}</span>
            </CardTitle>
          </div>
          <Button size="sm" variant="outline">
            <IconDownload className="w-4 h-4 mr-2" />
            Unduh KRS
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Desktop Table (md ke atas) */}
          <div className="overflow-auto hidden sm:block">
            {/* Informasi Mahasiswa dalam bentuk tabel sederhana di desktop */}
            <table className="mb-4 w-full text-sm min-w-[700px]">
              <tbody>
                <tr>
                  <td className="p-2 font-medium w-40">NIK</td>
                  <td className="p-2">{mahasiswa.nik}</td>
                  <td className="p-2 font-medium w-40">Program Studi</td>
                  <td className="p-2">{mahasiswa.programStudi}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Nama</td>
                  <td className="p-2">{mahasiswa.nama}</td>
                  <td className="p-2 font-medium">Semester</td>
                  <td className="p-2">{mahasiswa.semester}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">NIM</td>
                  <td className="p-2">{mahasiswa.nim}</td>
                  <td className="p-2 font-medium ">Total SKS</td>
                  <td className="p-2">{totalSks} SKS</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Dosen Pembimbing</td>
                  <td className="p-2">{mahasiswa.dosenPembimbing}</td>
                  <td className="p-2 font-medium">Status KRS</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        mahasiswa.statusKRS === "Terverifikasi" ? "bg-green-100 text-green-700" : mahasiswa.statusKRS === "Menunggu Verifikasi" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {mahasiswa.statusKRS}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Tabel Mata Kuliah */}
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm text-left min-w-[700px]">
                <thead className="bg-muted border-b">
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
          </div>

          {/* Mobile version (sm ke bawah) */}
          <div className="block sm:hidden space-y-6">
            {/* Informasi Mahasiswa vertikal */}
            <div className="space-y-4 text-sm">
              {[
                { label: "NIK", value: mahasiswa.nik },
                { label: "Nama", value: mahasiswa.nama },
                { label: "NIM", value: mahasiswa.nim },
                { label: "Dosen Pembimbing", value: mahasiswa.dosenPembimbing },
                { label: "Program Studi", value: mahasiswa.programStudi },
                { label: "Semester", value: mahasiswa.semester },
                { label: "Total SKS", value: `${totalSks} SKS` },
                {
                  label: "Status KRS",
                  value: mahasiswa.statusKRS,
                  isStatus: true,
                },
              ].map(({ label, value, isStatus }) => (
                <div key={label} className="flex flex-col">
                  <p className="font-medium mb-1">{label}</p>
                  {isStatus ? (
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        value === "Terverifikasi" ? "bg-green-100 text-green-700" : value === "Menunggu Verifikasi" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {value}
                    </span>
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Mata Kuliah versi tabel mobile */}
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left min-w-[600px]">
                <thead className="bg-muted border-b">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
