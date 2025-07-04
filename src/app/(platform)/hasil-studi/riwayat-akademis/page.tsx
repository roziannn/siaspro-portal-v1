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
    <div className="px-4 lg:px-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Akademik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-auto rounded-lg border">
            <table className="table-auto w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th rowSpan={2} className="border p-1 min-w-[120px]">
                    Thn-Smt
                  </th>
                  <th rowSpan={2} className="border p-1 min-w-[80px]">
                    Status
                  </th>
                  <th colSpan={5} className="border p-2">
                    Semester
                  </th>
                  <th colSpan={4} className="border p-2">
                    Kumulatif
                  </th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border p-2 min-w-[40px]">MK</th>
                  <th className="border p-2 min-w-[40px]">SKS</th>
                  <th className="border p-2 min-w-[60px]">SKS Lulus</th>
                  <th className="border p-2 min-w-[40px]">Mutu</th>
                  <th className="border p-2 min-w-[40px]">IP</th>
                  <th className="border p-2 min-w-[40px]">MK</th>
                  <th className="border p-2 min-w-[60px]">SKS Lulus</th>
                  <th className="border p-2 min-w-[40px]">Mutu</th>
                  <th className="border p-2 min-w-[40px]">IPK</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="border-b p-1">{item.tahun}</td>
                    <td className="border-b p-1">{item.status}</td>
                    <td className="border-b p-1">{item.JumlahMK}</td>
                    <td className="border-b p-1">{item.JumlahSKS}</td>
                    <td className="border-b p-1">{item.JumlahSKSLulus}</td>
                    <td className="border-b p-1">{item.JumlahMutu}</td>
                    <td className="border-b p-1">{item.ip.toFixed(2)}</td>
                    <td className="border-b p-1">{item.kumulatifMK}</td>
                    <td className="border-b p-1">{item.kumulatifSKSLulus}</td>
                    <td className="border-b p-1">{item.kumulatifMutu}</td>
                    <td className="border-b p-1">{item.ipk.toFixed(2)}</td>
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
