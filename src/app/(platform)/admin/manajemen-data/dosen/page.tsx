"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/font/headerSectionText";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type Dosen = {
  nip: string;
  nama: string;
  fakultas: string;
  jurusan: string;
  email: string;
  isActive: boolean;
  fotoUrl?: string;
};

const dummyDosen: Dosen[] = [
  {
    nip: "198501012020031001",
    nama: "Dr. Budi Santoso",
    fakultas: "Teknik",
    jurusan: "Teknik Informatika",
    email: "budi.santoso@univ.ac.id",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=10",
  },
  {
    nip: "197903152019041002",
    nama: "Dr. Sari Wulandari",
    fakultas: "Ekonomi",
    jurusan: "Manajemen",
    email: "sari.wulandari@univ.ac.id",
    isActive: false,
    fotoUrl: "https://i.pravatar.cc/100?img=11",
  },
  {
    nip: "198212052021021003",
    nama: "Prof. Agus Prasetyo",
    fakultas: "Teknik",
    jurusan: "Teknik Elektro",
    email: "agus.prasetyo@univ.ac.id",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=12",
  },
];

const ITEMS_PER_PAGE = 5;

export default function ManajemenDataDosen() {
  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [search, setSearch] = useState("");
  const [filterFakultas, setFilterFakultas] = useState<string>("all");
  const [filterJurusan, setFilterJurusan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setDosenList(dummyDosen);
  }, []);

  const fakultasOptions = Array.from(new Set(dosenList.map((d) => d.fakultas)));
  const jurusanOptions = Array.from(new Set(dosenList.map((d) => d.jurusan)));

  const filtered = dosenList.filter((d) => {
    const matchesSearch =
      d.nip.toLowerCase().includes(search.toLowerCase()) || d.nama.toLowerCase().includes(search.toLowerCase()) || d.fakultas.toLowerCase().includes(search.toLowerCase()) || d.jurusan.toLowerCase().includes(search.toLowerCase());

    const matchesFakultas = filterFakultas === "all" || d.fakultas === filterFakultas;
    const matchesJurusan = filterJurusan === "all" || d.jurusan === filterJurusan;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && d.isActive) || (filterStatus === "inactive" && !d.isActive);

    return matchesSearch && matchesFakultas && matchesJurusan && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterFakultas, filterJurusan, filterStatus]);

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Data Dosen" description="Kelola informasi dosen aktif dan nonaktif." />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari NIP, Nama, Fakultas, Jurusan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />

        <div className="flex gap-2">
          <Select value={filterFakultas} onValueChange={setFilterFakultas}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Fakultas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Fakultas</SelectItem>
              {fakultasOptions.map((fakultas) => (
                <SelectItem key={fakultas} value={fakultas}>
                  {fakultas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterJurusan} onValueChange={setFilterJurusan}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter Jurusan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jurusan</SelectItem>
              {jurusanOptions.map((jurusan) => (
                <SelectItem key={jurusan} value={jurusan}>
                  {jurusan}
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
            <TableHead>Fakultas</TableHead>
            <TableHead>Jurusan</TableHead>
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
                  <img src={dosen.fotoUrl ?? ""} alt={dosen.nama} className="w-12 h-12 rounded-sm object-cover" />
                </TableCell>
                <TableCell>{dosen.nip}</TableCell>
                <TableCell>{dosen.nama}</TableCell>
                <TableCell>{dosen.fakultas}</TableCell>
                <TableCell>{dosen.jurusan}</TableCell>
                <TableCell>{dosen.email}</TableCell>
                <TableCell>{dosen.isActive ? "Aktif" : "Tidak Aktif"}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manajemen-data/dosen/${dosen.nip}`)}>
                    Detail
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
