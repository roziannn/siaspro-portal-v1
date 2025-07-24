"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setDosenList(dummyDosen);
  }, []);

  // Daftar unik fakultas & jurusan
  const fakultasOptions = Array.from(new Set(dosenList.map((d) => d.fakultas)));
  const jurusanOptions = Array.from(new Set(dosenList.map((d) => d.jurusan)));

  // Filter data
  const filtered = dosenList.filter((d) => {
    const matchesSearch =
      d.nip.toLowerCase().includes(search.toLowerCase()) || d.nama.toLowerCase().includes(search.toLowerCase()) || d.fakultas.toLowerCase().includes(search.toLowerCase()) || d.jurusan.toLowerCase().includes(search.toLowerCase());

    const matchesFakultas = filterFakultas === "all" || d.fakultas === filterFakultas;
    const matchesJurusan = filterJurusan === "all" || d.jurusan === filterJurusan;

    return matchesSearch && matchesFakultas && matchesJurusan;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset halaman jika filter/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterFakultas, filterJurusan]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="px-1 lg:px-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl font-semibold">Data Dosen</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
              <Input placeholder="Cari NIP, Nama, Fakultas, Jurusan..." value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-xs" />
              <Select value={filterFakultas} onValueChange={setFilterFakultas}>
                <SelectTrigger>
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
                <SelectTrigger>
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
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-auto rounded-md border">
              <table className="w-full text-sm border-collapse min-w-[800px]">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border px-4 py-2 text-left">Foto</th>
                    <th className="border px-4 py-2 text-left">NIP</th>
                    <th className="border px-4 py-2 text-left">Nama</th>
                    <th className="border px-4 py-2 text-left">Fakultas</th>
                    <th className="border px-4 py-2 text-left">Jurusan</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length ? (
                    paginated.map((dosen) => (
                      <tr key={dosen.nip} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!dosen.isActive ? "opacity-60" : ""} cursor-pointer`}>
                        <td className="border px-4 py-2">
                          <img src={dosen.fotoUrl ?? ""} alt={dosen.nama} className="w-12 h-12 rounded-sm object-cover" />
                        </td>
                        <td className="border px-4 py-2">{dosen.nip}</td>
                        <td className="border px-4 py-2">{dosen.nama}</td>
                        <td className="border px-4 py-2">{dosen.fakultas}</td>
                        <td className="border px-4 py-2">{dosen.jurusan}</td>
                        <td className="border px-4 py-2">{dosen.email}</td>
                        <td className="border px-4 py-2">{dosen.isActive ? "Aktif" : "Tidak Aktif"}</td>
                        <td className="border px-4 py-2">
                          <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manajemen-data/dosen/${dosen.nip}`)}>
                            Detail
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-6 text-muted-foreground">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-4">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
