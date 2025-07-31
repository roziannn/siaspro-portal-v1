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

type Mahasiswa = {
  nama: string;
  nim: string;
  kelas: string;
  semester: string;
  topik: string;
  status: "Selesai" | "Sedang Berjalan";
};

export default function BimbinganDetailPage({ params }: Props) {
  const { tipe } = use(params);

  const titleMap: Record<string, string> = {
    "magang-mandiri": "Bimbingan Magang Mandiri",
    "praktik-industri": "Bimbingan Praktik Industri",
    skripsi: "Bimbingan Skripsi / Tugas Akhir",
  };

  const subtitleMap: Record<string, string> = {
    "magang-mandiri": "Kelola bimbingan mahasiswa magang mandiri.",
    "praktik-industri": "Kelola bimbingan praktik industri mahasiswa.",
    skripsi: "Kelola bimbingan skripsi atau tugas akhir mahasiswa.",
  };

  const isValid = Object.keys(titleMap).includes(tipe);
  if (!isValid) notFound();

  const dataMap: Record<string, Mahasiswa[]> = {
    "magang-mandiri": [
      { nama: "Aulia Rahma", nim: "20201001", kelas: "TI-3A", semester: "6", topik: "Web Dev di Startup", status: "Selesai" },
      { nama: "Bayu Saputra", nim: "20201002", kelas: "TI-3A", semester: "6", topik: "Data Analyst", status: "Sedang Berjalan" },
    ],
    "praktik-industri": [
      { nama: "Citra Ayu", nim: "20201011", kelas: "TI-3B", semester: "5", topik: "IoT di Manufaktur", status: "Sedang Berjalan" },
      { nama: "Dede Firmansyah", nim: "20201012", kelas: "TI-3B", semester: "5", topik: "DevOps Tools", status: "Sedang Berjalan" },
    ],
    skripsi: [
      { nama: "Aulia Rahma", nim: "20201001", kelas: "TI-3A", semester: "6", topik: "Monitoring IoT Perkebunan Sawit", status: "Selesai" },
      { nama: "Eka Prasetya", nim: "20201021", kelas: "TI-3A", semester: "7", topik: "Machine Learning", status: "Selesai" },
      { nama: "Fira Lestari", nim: "20201022", kelas: "TI-3A", semester: "7", topik: "UI/UX Evaluasi", status: "Sedang Berjalan" },
    ],
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const filteredData = useMemo(() => {
    return dataMap[tipe].filter((item) => {
      const matchesSearch = item.nama.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "Semua Status" ? true : item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, tipe]);

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title={titleMap[tipe]} description={subtitleMap[tipe]} />
      <div className="flex items-center justify-between gap-2">
        <Input placeholder="Cari nama mahasiswa..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-sm" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Semua Status">Semua Status</SelectItem>
            {["Selesai", "Sedang Berjalan"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1">No.</TableHead>
            <TableHead>Nama Mahasiswa</TableHead>
            <TableHead>NIM</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Topik Bimbingan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.nim}</TableCell>
                <TableCell>{item.kelas}</TableCell>
                <TableCell>{item.semester}</TableCell>
                <TableCell>{item.topik}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Selesai" ? "success" : "warning"} className="text-xs">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/dosen/bimbingan/${tipe}/${item.nim}`}>
                    <Button variant="outline" size="icon">
                      <IconEye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
