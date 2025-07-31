"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconEye } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";

type Props = {
  params: Promise<{
    tipe: string;
  }>;
};

type TugasData = {
  namaTugas: string;
  slug: string;
  mataKuliah: string;
  kelas: string;
  status: "Selesai" | "Belum Selesai";
  terkumpul: number;
  dueDate: string;
};

export default function KelolaNilaiPage({ params }: Props) {
  const { tipe } = use(params);

  const titleMap: Record<string, string> = {
    tugas: "Nilai Tugas dan Kuis",
    uts: "Ujian Tengah Semester (UTS)",
    uas: "Ujian Akhir Semester (UAS)",
  };

  const isValid = Object.keys(titleMap).includes(tipe);
  if (!isValid) notFound();

  const dataMap: Record<string, TugasData[]> = {
    tugas: [
      {
        slug: "pengenalan-web-programming",
        namaTugas: "Pengenalan Web Programming",
        mataKuliah: "Pemrograman Web",
        kelas: "TI-3A",
        status: "Selesai",
        terkumpul: 25,
        dueDate: "2025-08-01T23:59",
      },
      {
        slug: "tugas-1",
        namaTugas: "Tugas 1",
        mataKuliah: "Struktur Data",
        kelas: "TI-3B",
        status: "Belum Selesai",
        terkumpul: 18,
        dueDate: "2025-08-05T17:00",
      },
    ],
    uts: [
      {
        slug: "uts-pemrograman",
        namaTugas: "UTS Pemrograman",
        mataKuliah: "Pemrograman Web",
        kelas: "TI-3A",
        status: "Selesai",
        terkumpul: 30,
        dueDate: "2025-08-10T10:00",
      },
    ],
    uas: [
      {
        slug: "uas-struktur-data",
        namaTugas: "UAS Struktur Data",
        mataKuliah: "Struktur Data",
        kelas: "TI-3B",
        status: "Belum Selesai",
        terkumpul: 22,
        dueDate: "2025-08-20T13:30",
      },
    ],
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const filteredData = useMemo(() => {
    return dataMap[tipe].filter((item) => {
      const matchesSearch = item.namaTugas.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "Semua Status" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, tipe]);

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title={titleMap[tipe]} description="Kelola nilai pada mata kuliah Anda." />

      <div className="flex items-center justify-between gap-2">
        <Input placeholder="Cari nama tugas..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-sm" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Semua Status">Semua Status</SelectItem>
            <SelectItem value="Selesai">Selesai</SelectItem>
            <SelectItem value="Belum Selesai">Belum Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1">No.</TableHead>
            <TableHead>{tipe === "tugas" ? "Nama Tugas" : "Nama Ujian"}</TableHead>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.namaTugas}</TableCell>
                <TableCell>{item.mataKuliah}</TableCell>
                <TableCell>{item.kelas}</TableCell>

                <TableCell>
                  {new Date(item.dueDate).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{item.terkumpul}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Selesai" ? "success" : "warning"}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/dosen/kelola-nilai/${tipe}/${item.slug}`}>
                    <Button variant="outline" size="icon">
                      <IconEye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
