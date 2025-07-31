"use client";

import { useState } from "react";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";

type RiwayatAkademik = {
  semester: string;
  tahun: string;
  status: string;
  JumlahMK: number;
  JumlahSKS: number;
  JumlahSKSLulus: number;
  JumlahMutu: number;
  ip: number;
  kumulatifMK: number;
  kumulatifSKSLulus: number;
  kumulatifMutu: number;
  ipk: number;
};

import dataRiwayat from "./data.json";

const ITEMS_PER_PAGE = 8;

export default function RiwayatAkademikPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataRiwayat.length / ITEMS_PER_PAGE);
  const paginatedData = dataRiwayat.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Riwayat Akademik" description="Riwayat akademik semester perkuliahan Anda." />

      <Table className="min-w-[900px] text-sm text-center">
        <TableHeader>
          <TableRow className="bg-muted border-b">
            <TableHead rowSpan={2} className="p-3 min-w-[120px] align-middle">
              Thn-Smt
            </TableHead>
            <TableHead rowSpan={2} className="p-3 min-w-[80px] align-middle">
              Status
            </TableHead>
            <TableHead colSpan={5} className="p-3 text-center">
              Semester
            </TableHead>
            <TableHead colSpan={4} className="p-3 text-center">
              Kumulatif
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="p-3 min-w-[40px]">MK</TableHead>
            <TableHead className="p-3 min-w-[40px]">SKS</TableHead>
            <TableHead className="p-3 min-w-[60px]">SKS Lulus</TableHead>
            <TableHead className="p-3 min-w-[40px]">Mutu</TableHead>
            <TableHead className="p-3 min-w-[40px]">IP</TableHead>
            <TableHead className="p-3 min-w-[40px]">MK</TableHead>
            <TableHead className="p-3 min-w-[60px]">SKS Lulus</TableHead>
            <TableHead className="p-3 min-w-[40px]">Mutu</TableHead>
            <TableHead className="p-3 min-w-[40px]">IPK</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index} className="border-b hover:bg-muted/50">
              <TableCell className="p-3">{item.tahun}</TableCell>
              <TableCell className="p-3">{item.status}</TableCell>
              <TableCell className="p-3">{item.JumlahMK}</TableCell>
              <TableCell className="p-3">{item.JumlahSKS}</TableCell>
              <TableCell className="p-3">{item.JumlahSKSLulus}</TableCell>
              <TableCell className="p-3">{item.JumlahMutu}</TableCell>
              <TableCell className="p-3">{item.ip.toFixed(2)}</TableCell>
              <TableCell className="p-3">{item.kumulatifMK}</TableCell>
              <TableCell className="p-3">{item.kumulatifSKSLulus}</TableCell>
              <TableCell className="p-3">{item.kumulatifMutu}</TableCell>
              <TableCell className="p-3">{item.ipk.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
