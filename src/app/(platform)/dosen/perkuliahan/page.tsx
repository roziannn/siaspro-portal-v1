"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import SectionHeader from "@/components/font/headerSectionText";
import Link from "next/link";

const jadwalDosen = [
  {
    id: 1,
    mataKuliah: "Pemrograman Web Lanjut",
    slug: "pemrograman-web-lanjut",
    kelas: "TI-3A",
    hari: "Senin",
    jam: "08:00 - 10:00",
    ruangan: "Lab 2",
  },
  {
    id: 2,
    mataKuliah: "Basis Data",
    slug: "basis-data",
    kelas: "TI-2B",
    hari: "Selasa",
    jam: "10:00 - 12:00",
    ruangan: "Ruang 204",
  },
  {
    id: 3,
    mataKuliah: "Pemrograman Mobile",
    slug: "pemrograman-mobile",
    kelas: "TI-3C",
    hari: "Rabu",
    jam: "13:00 - 15:00",
    ruangan: "Lab 3",
  },
  {
    id: 4,
    mataKuliah: "Etika Profesi",
    slug: "etika-profesi",
    kelas: "TI-1A",
    hari: "Jumat",
    jam: "09:00 - 11:00",
    ruangan: "Ruang 101",
  },
];

export default function JadwalMengajarPage() {
  const [search, setSearch] = useState("");
  const [filterHari, setFilterHari] = useState("Semua Hari");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const hariOptions = ["Semua Hari", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  const filteredData = jadwalDosen
    .filter((item) => {
      const keyword = `${item.mataKuliah} ${item.kelas} ${item.hari}`.toLowerCase();
      return keyword.includes(search.toLowerCase());
    })
    .filter((item) => {
      if (filterHari === "Semua Hari") return true;
      return item.hari === filterHari;
    });

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Perkuliahan" description="Berikut adalah daftar jadwal perkuliahan yang Anda ampu." />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input placeholder="Cari mata kuliah, kelas, atau hari..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-sm" />

        <Select value={filterHari} onValueChange={setFilterHari}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter Hari" />
          </SelectTrigger>
          <SelectContent>
            {hariOptions.map((hari) => (
              <SelectItem key={hari} value={hari}>
                {hari}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2">No.</TableHead>
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
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell> {/* Nomor urut */}
                <TableCell>{item.mataKuliah}</TableCell>
                <TableCell>{item.kelas}</TableCell>
                <TableCell>{item.hari}</TableCell>
                <TableCell>{item.jam}</TableCell>
                <TableCell>{item.ruangan}</TableCell>
                <TableCell className="text-center">
                  <Link href={`/dosen/perkuliahan/${item.slug}`}>
                    <Button variant="outline" size="sm">
                      <IconPencil className="w-4 h-4 mr-1" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-sm text-muted-foreground">
          Halaman {page} dari {totalPages}
        </p>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
