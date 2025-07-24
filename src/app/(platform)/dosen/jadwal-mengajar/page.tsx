"use client";

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconEye } from "@tabler/icons-react";
import { useState } from "react";
import Link from "next/link";

const jadwalDosen = [
  {
    id: 1,
    mataKuliah: "Pemrograman Web Lanjut",
    kelas: "TI-3A",
    hari: "Senin",
    jam: "08:00 - 10:00",
    ruangan: "Lab 2",
  },
  {
    id: 2,
    mataKuliah: "Basis Data",
    kelas: "TI-2B",
    hari: "Selasa",
    jam: "10:00 - 12:00",
    ruangan: "Ruang 204",
  },
  {
    id: 3,
    mataKuliah: "Pemrograman Mobile",
    kelas: "TI-3C",
    hari: "Rabu",
    jam: "13:00 - 15:00",
    ruangan: "Lab 3",
  },
  {
    id: 4,
    mataKuliah: "Etika Profesi",
    kelas: "TI-1A",
    hari: "Jumat",
    jam: "09:00 - 11:00",
    ruangan: "Ruang 101",
  },
];

export default function JadwalMengajarPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = jadwalDosen.filter((item) => `${item.mataKuliah} ${item.kelas} ${item.hari}`.toLowerCase().includes(search.toLowerCase()));

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="space-y-6 px-2 lg:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">Jadwal Mengajar</h2>
          <p className="text-muted-foreground">Berikut adalah daftar jadwal perkuliahan yang Anda ampu.</p>
        </div>
        <Input placeholder="Cari mata kuliah, kelas, atau hari..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-md" />
      </div>

      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mata Kuliah</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Hari</TableHead>
              <TableHead>Jam</TableHead>
              <TableHead>Ruangan</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.mataKuliah}</TableCell>
                  <TableCell>{item.kelas}</TableCell>
                  <TableCell>{item.hari}</TableCell>
                  <TableCell>{item.jam}</TableCell>
                  <TableCell>{item.ruangan}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/dosen/jadwal-mengajar/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <IconEye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Halaman {page} dari {totalPages}
        </p>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Sebelumnya
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
