"use client";

import { useState, useMemo } from "react";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";
import dataKRS from "./data.json";

function getBadgeVariant(status: string) {
  switch (status) {
    case "Disetujui":
      return "success";
    case "Belum Disetujui":
      return "warning";
    case "Belum Mengajukan":
      return "secondary";
    default:
      return "outline";
  }
}

const semesterOptions = ["Semua", "1", "2", "3", "4", "5", "6", "7", "8"];
const angkatanOptions = ["Semua", "2020", "2021", "2022", "2023", "2024"];
const statusOptions = ["Semua", "Disetujui", "Belum Disetujui", "Belum Mengajukan"];

export default function VerifikasiKRSPage() {
  const [search, setSearch] = useState("");
  const [filterSemester, setFilterSemester] = useState("Semua");
  const [filterAngkatan, setFilterAngkatan] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return dataKRS.filter((item) => {
      const keywordMatch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.nim.toLowerCase().includes(search.toLowerCase());

      const semesterMatch = filterSemester === "Semua" || item.semester.toString() === filterSemester;
      const angkatanMatch = filterAngkatan === "Semua" || item.angkatan.toString() === filterAngkatan;
      const statusMatch = filterStatus === "Semua" || item.status === filterStatus;

      return keywordMatch && semesterMatch && angkatanMatch && statusMatch;
    });
  }, [search, filterSemester, filterAngkatan, filterStatus]);

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <SectionHeader title="Verifikasi KRS Mahasiswa" description="Lihat dan setujui Kartu Rencana Studi (KRS) mahasiswa bimbingan Anda." />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Cari nama atau NIM mahasiswa..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          <Select
            value={filterSemester}
            onValueChange={(val) => {
              setPage(1);
              setFilterSemester(val);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "Semua" ? "Semua Semester" : `Semester ${s}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterAngkatan}
            onValueChange={(val) => {
              setPage(1);
              setFilterAngkatan(val);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter Angkatan" />
            </SelectTrigger>
            <SelectContent>
              {angkatanOptions.map((a) => (
                <SelectItem key={a} value={a}>
                  {a === "Semua" ? "Semua Angkatan" : a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterStatus}
            onValueChange={(val) => {
              setPage(1);
              setFilterStatus(val);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "Semua" ? "Semua Status" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.nim}</TableCell>
                  <TableCell>{item.angkatan}</TableCell>
                  <TableCell>{item.semester}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/verifikasi-krs/${item.id}`}>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-4">
                  Tidak ada data yang sesuai.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Halaman {page} dari {totalPages || 1}
        </p>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages || totalPages === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
