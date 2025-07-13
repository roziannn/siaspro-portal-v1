"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="px-1 lg:px-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Akademik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-auto rounded-lg border">
            <table className="table-auto w-full text-sm text-center border-collapse min-w-[900px]">
              <thead className="bg-muted border-b">
                <tr>
                  <th rowSpan={2} className="p-3 min-w-[120px]">
                    Thn-Smt
                  </th>
                  <th rowSpan={2} className="p-3 min-w-[80px]">
                    Status
                  </th>
                  <th colSpan={5} className="p-3">
                    Semester
                  </th>
                  <th colSpan={4} className="p-3">
                    Kumulatif
                  </th>
                </tr>
                <tr>
                  <th className="p-3 min-w-[40px]">MK</th>
                  <th className="p-3 min-w-[40px]">SKS</th>
                  <th className="p-3 min-w-[60px]">SKS Lulus</th>
                  <th className="p-3 min-w-[40px]">Mutu</th>
                  <th className="p-3 min-w-[40px]">IP</th>
                  <th className="p-3 min-w-[40px]">MK</th>
                  <th className="p-3 min-w-[60px]">SKS Lulus</th>
                  <th className="p-3 min-w-[40px]">Mutu</th>
                  <th className="p-3 min-w-[40px]">IPK</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3">{item.tahun}</td>
                    <td className="p-3">{item.status}</td>
                    <td className="p-3">{item.JumlahMK}</td>
                    <td className="p-3">{item.JumlahSKS}</td>
                    <td className="p-3">{item.JumlahSKSLulus}</td>
                    <td className="p-3">{item.JumlahMutu}</td>
                    <td className="p-3">{item.ip.toFixed(2)}</td>
                    <td className="p-3">{item.kumulatifMK}</td>
                    <td className="p-3">{item.kumulatifSKSLulus}</td>
                    <td className="p-3">{item.kumulatifMutu}</td>
                    <td className="p-3">{item.ipk.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
