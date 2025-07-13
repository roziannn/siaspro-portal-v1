"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import dataIRS from "./data.json";
import { Pagination } from "@/components/ui/pagination";

type MataKuliah = {
  kode: string;
  nama: string;
  dosen: string;
  sks: number;
  jadwal: string;
};

const ITEMS_PER_PAGE = 8;

export default function IRSPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = dataIRS.filter((mk) => mk.nama.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCheckboxChange = (kode: string) => {
    setSelected((prev) => (prev.includes(kode) ? prev.filter((k) => k !== kode) : [...prev, kode]));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="px-1 lg:px-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-lg">Isian Rencana Studi (IRS)</CardTitle>
            <Input
              placeholder="Cari mata kuliah..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-auto border rounded-lg">
            <table className="w-full text-sm text-left border-collapse min-w-[700px]">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b">
                <tr>
                  <th className="p-3"></th>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Mata Kuliah</th>
                  <th className="p-3">Dosen Pengampu</th>
                  <th className="p-3">SKS</th>
                  <th className="p-3">Jadwal</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((mk) => (
                    <tr key={mk.kode} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">
                        <Checkbox checked={selected.includes(mk.kode)} onCheckedChange={() => handleCheckboxChange(mk.kode)} />
                      </td>
                      <td className="p-3">{mk.kode}</td>
                      <td className="p-3">{mk.nama}</td>
                      <td className="p-3">{mk.dosen}</td>
                      <td className="p-3">{mk.sks}</td>
                      <td className="p-3">{mk.jadwal}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-4">
                      Mata kuliah tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center py-4">
            <p className="text-sm text-muted-foreground">Total dipilih: {selected.length} mata kuliah</p>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={goToPage} />
          </div>

          <div className="flex justify-end">
            <Button>Simpan IRS</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
