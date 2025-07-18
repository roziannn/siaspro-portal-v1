"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import data from "./data.json";
import { IconDownload } from "@tabler/icons-react";

type TranskripItem = {
  tahunSemester: string;
  kode: string;
  nama: string;
  sks: number;
  nilai: string;
  angkaMutu: number;
  ulang: boolean;
};

export default function TranskripNilai() {
  const [list] = useState<TranskripItem[]>(data);

  const handleDownload = () => {
    const header = ["No", "Thn-Smt", "Kode", "Mata Kuliah", "SKS", "Nilai", "AM", "SKSxAM", "Ulang"];
    const rows = list.map((item, i) => [i + 1, item.tahunSemester, item.kode, item.nama, item.sks, item.nilai, item.angkaMutu, (item.sks * item.angkaMutu).toFixed(2), item.ulang ? "Ya" : "-"]);

    const csvContent = [header, ...rows].map((r) => r.map((x) => `"${x}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transkrip_sementara.csv";
    link.click();
  };

  return (
    <div className="px-1 lg:px-6 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transkrip Nilai Sementara</h1>
        <Button onClick={handleDownload} size="sm" variant="outline">
          <IconDownload /> Unduh Transkrip
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mata Kuliah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border">
            <table className="w-full text-sm text-left border-collapse min-w-[700px]">
              <thead className="bg-muted  border-b">
                <tr>
                  <th className="p-3 text-center">No</th>
                  <th className="p-3 text-center">Thn-Smt</th>
                  <th className="p-3 text-center">Kode</th>
                  <th className="p-3">Mata Kuliah</th>
                  <th className="p-3 text-center">SKS</th>
                  <th className="p-3 text-center">Nilai</th>
                  <th className="p-3 text-center">AM</th>
                  <th className="p-3 text-center">SKS x AM</th>
                  <th className="p-3 text-center">Ulang</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, i) => (
                  <tr key={`${item.kode}-${i}`} className={`border-b ${item.ulang ? "bg-red-100 dark:bg-red-900 font-semibold text-gray-800 dark:text-white" : "hover:bg-muted/50"}`}>
                    <td className="p-3 text-center">{i + 1}</td>
                    <td className="p-3 text-center">{item.tahunSemester}</td>
                    <td className="p-3 text-center">{item.kode}</td>
                    <td className="p-3">{item.nama}</td>
                    <td className="p-3 text-center">{item.sks}</td>
                    <td className="p-3 text-center">{item.nilai}</td>
                    <td className="p-3 text-center">{item.angkaMutu.toFixed(2)}</td>
                    <td className="p-3 text-center">{(item.angkaMutu * item.sks).toFixed(2)}</td>
                    <td className="p-3 text-center">{item.ulang ? "Ya" : "1x"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Transkrip */}
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 text-sm leading-relaxed">
            {/* Kiri: Info Umum */}
            <div className="space-y-1 sm:min-w-[300px]">
              <div>
                <span className="font-medium">Judul Skripsi</span>: -
              </div>
              <div>
                <span className="font-medium">Perolehan SKS</span>: 146
              </div>
              <div>
                <span className="font-medium">Jumlah Mutu</span>: 539,00
              </div>
              <div>
                <span className="font-medium">IPK/Yudisium</span>: 3,69 / <span className="italic">Pujian</span>
              </div>
              <div>
                <span className="font-medium">Lama Studi</span>: 8 Smt ; MK Ulang: 0
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
