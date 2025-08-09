"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/font/headerSectionText";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled, IconEye, IconPhotoCircle } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

type Dosen = {
  id: number;
  nip: string;
  nama: string;
  jabatan: string;
  pangkat: string;
  email: string;
  isActive: boolean;
  fotoUrl?: string;
};

const ITEMS_PER_PAGE = 10;

export default function ManajemenDataDosen() {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [search, setSearch] = useState("");
  const [filterJabatan, setfilterJabatan] = useState<string>("all");
  const [filterPangkat, setfilterPangkat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  useEffect(() => {
    async function fetchDosen() {
      try {
        const res = await fetch("/api/data/dosen");
        if (!res.ok) {
          throw new Error(`Gagal fetch dosen: ${res.status}`);
        }
        const data: Dosen[] = await res.json();
        setDosenList(data);
      } catch (error) {
        console.error("Error fetch dosen:", error);
        setDosenList([]);
      }
    }

    fetchDosen();
  }, []);

  const jabatanOptions = Array.from(new Set(dosenList.map((d) => d.jabatan)));
  const pangkatOptions = Array.from(new Set(dosenList.map((d) => d.pangkat)));

  const filtered = dosenList.filter((d) => {
    const matchesSearch =
      d.nip.toLowerCase().includes(search.toLowerCase()) || d.nama.toLowerCase().includes(search.toLowerCase()) || d.jabatan.toLowerCase().includes(search.toLowerCase()) || d.pangkat.toLowerCase().includes(search.toLowerCase());

    const matchesJabatan = filterJabatan === "all" || d.jabatan === filterJabatan;
    const matchesPangkat = filterPangkat === "all" || d.pangkat === filterPangkat;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && d.isActive) || (filterStatus === "inactive" && !d.isActive);

    return matchesSearch && matchesJabatan && matchesPangkat && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterJabatan, filterPangkat, filterStatus]);

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Dosen" description="Kelola informasi dosen aktif dan nonaktif." />
        <Button>
          <IconCirclePlusFilled /> Tambah Data
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari NIP, Nama, Jabatan, Jurusan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />

        <div className="flex gap-2">
          <Select value={filterJabatan} onValueChange={setfilterJabatan}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Jabatan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jabatan</SelectItem>
              {jabatanOptions.map((jabatan) => (
                <SelectItem key={jabatan} value={jabatan}>
                  {jabatan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterPangkat} onValueChange={setfilterPangkat}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter Pangkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Pangkat</SelectItem>
              {pangkatOptions.map((pangkat) => (
                <SelectItem key={pangkat} value={pangkat}>
                  {pangkat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="min-w-[800px] text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>NIP</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Pangkat</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length ? (
            paginated.map((dosen) => (
              <TableRow key={dosen.nip} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!dosen.isActive ? "opacity-60" : ""}`}>
                <TableCell>
                  {dosen.fotoUrl ? (
                    <img src={dosen.fotoUrl} alt={dosen.nama} className="w-12 h-12 rounded-sm object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-sm bg-gray-300 flex items-center justify-center text-gray-500">
                      <IconPhotoCircle className="w-6 h-6" />
                    </div>
                  )}
                </TableCell>
                <TableCell>{dosen.nip}</TableCell>
                <TableCell>{dosen.nama}</TableCell>
                <TableCell>{dosen.jabatan}</TableCell>
                <TableCell>{dosen.pangkat}</TableCell>
                <TableCell>{dosen.email}</TableCell>
                <TableCell>
                  {dosen.isActive ? (
                    <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                      <IconCircleCheckFilled className="w-4 h-4" />
                      Aktif
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                      <IconCircleXFilled className="w-4 h-4" />
                      Nonaktif
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manajemen-data/dosen/${dosen.id}`)}>
                    <IconEye />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
