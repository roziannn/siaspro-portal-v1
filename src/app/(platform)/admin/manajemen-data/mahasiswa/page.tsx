"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Mahasiswa = {
  nim: string;
  nama: string;
  angkatan: string;
  jurusan: string;
  email: string;
  isActive: boolean;
  fotoUrl?: string;
};

const dummyMahasiswa: Mahasiswa[] = [
  {
    nim: "230101",
    nama: "Andi Saputra",
    angkatan: "2023",
    jurusan: "Teknik Informatika",
    email: "andi@example.com",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=1",
  },
  {
    nim: "220202",
    nama: "Rina Kurnia",
    angkatan: "2022",
    jurusan: "Sistem Informasi",
    email: "rina@example.com",
    isActive: false,
    fotoUrl: "https://i.pravatar.cc/100?img=2",
  },
  {
    nim: "210303",
    nama: "Bayu Wijaya",
    angkatan: "2021",
    jurusan: "Teknik Elektro",
    email: "bayu@example.com",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=3",
  },
];

const ITEMS_PER_PAGE = 5;

export default function ManajemenDataMahasiswa() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [search, setSearch] = useState("");
  const [filterJurusan, setFilterJurusan] = useState<string>("all");
  const [filterAngkatan, setFilterAngkatan] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setMahasiswaList(dummyMahasiswa);
  }, []);

  // Daftar unik jurusan & angkatan
  const jurusanOptions = Array.from(new Set(mahasiswaList.map((m) => m.jurusan)));
  const angkatanOptions = Array.from(new Set(mahasiswaList.map((m) => m.angkatan)));

  // Filter data
  const filtered = mahasiswaList.filter((m) => {
    const matchesSearch = m.nim.toLowerCase().includes(search.toLowerCase()) || m.nama.toLowerCase().includes(search.toLowerCase()) || m.jurusan.toLowerCase().includes(search.toLowerCase()) || m.angkatan.includes(search);

    const matchesJurusan = filterJurusan === "all" || m.jurusan === filterJurusan;
    const matchesAngkatan = filterAngkatan === "all" || m.angkatan === filterAngkatan;

    return matchesSearch && matchesJurusan && matchesAngkatan;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset halaman jika filter/search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterJurusan, filterAngkatan]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="px-1 lg:px-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl font-semibold">Data Mahasiswa</h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
              <Input placeholder="Cari NIM, Nama, Jurusan, Angkatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-xs" />
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

              <Select value={filterAngkatan} onValueChange={setFilterAngkatan}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Angkatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Angkatan</SelectItem>
                  {angkatanOptions.map((angk) => (
                    <SelectItem key={angk} value={angk}>
                      {angk}
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
                    <th className="border px-4 py-2 text-left">NIM</th>
                    <th className="border px-4 py-2 text-left">Nama</th>
                    <th className="border px-4 py-2 text-left">Angkatan</th>
                    <th className="border px-4 py-2 text-left">Jurusan</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length ? (
                    paginated.map((mhs) => (
                      <tr key={mhs.nim} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!mhs.isActive ? "opacity-60" : ""} cursor-pointer`}>
                        <td className="border px-4 py-2">
                          <img src={mhs.fotoUrl} alt={mhs.nama} className="w-12 h-12 rounded-sm object-cover" />
                        </td>
                        <td className="border px-4 py-2">{mhs.nim}</td>
                        <td className="border px-4 py-2">{mhs.nama}</td>
                        <td className="border px-4 py-2">{mhs.angkatan}</td>
                        <td className="border px-4 py-2">{mhs.jurusan}</td>
                        <td className="border px-4 py-2">{mhs.email}</td>
                        <td className="border px-4 py-2">{mhs.isActive ? "Aktif" : "Tidak Aktif"}</td>
                        <td className="border px-4 py-2">
                          <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manajemen-data/mahasiswa/${mhs.nim}`)}>
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
