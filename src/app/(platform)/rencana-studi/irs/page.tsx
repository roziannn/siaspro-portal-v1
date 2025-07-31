"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Pagination } from "@/components/ui/pagination";
import SectionHeader from "@/components/font/headerSectionText";

import dataIRS from "./data.json";

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
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Isian Rencana Studi (IRS)" description="Pilih mata kuliah yang ingin diambil untuk semester ini." />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input
          placeholder="Cari mata kuliah..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:max-w-sm"
        />
        <p className="text-sm text-muted-foreground">Total dipilih: {selected.length} mata kuliah</p>
      </div>

      {/* Tabel Mata Kuliah */}
      <div className="overflow-auto border rounded-md">
        <table className="w-full text-sm border-collapse min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-gray-800 border-b">
            <tr>
              <th className="p-3"></th>
              <th className="p-3 text-left">Kode</th>
              <th className="p-3 text-left">Mata Kuliah</th>
              <th className="p-3 text-left">Dosen</th>
              <th className="p-3 text-left">SKS</th>
              <th className="p-3 text-left">Jadwal</th>
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

      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={goToPage} />
        <Button>Simpan IRS</Button>
      </div>
    </div>
  );
}
