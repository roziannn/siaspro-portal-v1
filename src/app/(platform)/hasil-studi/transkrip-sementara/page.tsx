"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import data from "./data.json";

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
    <div className="space-y-3 px-4 py-3">
      <div className="flex justify-between items-center">
        <SectionHeader title="Transkrip Sementara" description="Transkrip nilai sementara Anda." />
        <Button onClick={handleDownload} size="sm" variant="outline">
          <IconDownload className="w-4 h-4 mr-2" />
          Unduh Transkrip
        </Button>
      </div>

      {/* Table */}
      <Table className="min-w-[700px] text-sm">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Thn-Smt</TableHead>
            <TableHead className="text-center">Kode</TableHead>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead className="text-center">SKS</TableHead>
            <TableHead className="text-center">Nilai</TableHead>
            <TableHead className="text-center">AM</TableHead>
            <TableHead className="text-center">SKS x AM</TableHead>
            <TableHead className="text-center">Ulang</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, i) => (
            <TableRow key={`${item.kode}-${i}`} className={item.ulang ? "bg-red-100 dark:bg-red-900 font-semibold text-gray-800 dark:text-white" : "hover:bg-muted/50"}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell className="text-center">{item.tahunSemester}</TableCell>
              <TableCell className="text-center">{item.kode}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell className="text-center">{item.sks}</TableCell>
              <TableCell className="text-center">{item.nilai}</TableCell>
              <TableCell className="text-center">{item.angkaMutu.toFixed(2)}</TableCell>
              <TableCell className="text-center">{(item.angkaMutu * item.sks).toFixed(2)}</TableCell>
              <TableCell className="text-center">{item.ulang ? "Ya" : "1x"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Ringkasan */}
      <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 text-sm leading-relaxed">
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
    </div>
  );
}
