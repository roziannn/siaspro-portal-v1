"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/font/headerSectionText";
import CreateModal from "./createModal";

import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled } from "@tabler/icons-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IconEye, IconPhotoCircle } from "@tabler/icons-react";
import toast from "react-hot-toast";

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  angkatan: string;
  jurusan: string;
  fakultas: string;
  email: string;
  isActive: boolean;
  fotoUrl?: string;
};

const ITEMS_PER_PAGE = 10;

export default function ManajemenDataMahasiswa() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [search, setSearch] = useState("");
  const [filterJurusan, setFilterJurusan] = useState<string>("all");
  const [filterAngkatan, setFilterAngkatan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchMahasiswa() {
      setLoading(true);
      try {
        const res = await fetch("/api/data/mahasiswa");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch mahasiswa");
        }
        const data: Mahasiswa[] = await res.json();
        setMahasiswaList(data);
      } catch (error) {
        toast.error(`Gagal memuat data mahasiswa: ${(error as Error).message}`);
        setMahasiswaList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMahasiswa();
  }, []);

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  async function handleCreateSubmit(newMahasiswa: Mahasiswa) {
    try {
      const savedMahasiswa = await submitMahasiswa(newMahasiswa);
      setMahasiswaList((prev) => [savedMahasiswa, ...prev]);
      setIsCreateModalOpen(false);
      setCurrentPage(1);
      toast.success("Data mahasiswa berhasil ditambahkan!");
    } catch (error) {
      const message = (error as Error).message || "Gagal tambah data";
      toast.error(`Error: ${message}`);
    }
  }

  const jurusanOptions = Array.from(new Set(mahasiswaList.map((m) => m.jurusan)));
  const angkatanOptions = Array.from(new Set(mahasiswaList.map((m) => m.angkatan)));

  const filtered = mahasiswaList.filter((m) => {
    const matchesSearch = m.nim.toLowerCase().includes(search.toLowerCase()) || m.nama.toLowerCase().includes(search.toLowerCase()) || m.jurusan.toLowerCase().includes(search.toLowerCase()) || m.angkatan.includes(search);

    const matchesJurusan = filterJurusan === "all" || m.jurusan === filterJurusan;
    const matchesAngkatan = filterAngkatan === "all" || m.angkatan === filterAngkatan;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && m.isActive) || (filterStatus === "inactive" && !m.isActive);

    return matchesSearch && matchesJurusan && matchesAngkatan && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterJurusan, filterAngkatan, filterStatus]);

  async function submitMahasiswa(newMahasiswa: Mahasiswa) {
    try {
      const res = await fetch("/api/data/mahasiswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMahasiswa),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit mahasiswa");
      }

      const savedMahasiswa = await res.json();
      return savedMahasiswa;
    } catch (error) {
      console.error("Submit mahasiswa error:", error);
      throw error;
    }
  }

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Mahasiswa" description="Kelola informasi mahasiswa aktif dan nonaktif." />
        <Button onClick={openCreateModal}>
          <IconCirclePlusFilled /> Tambah Data
        </Button>
      </div>

      {/* Modal Create */}
      <CreateModal open={isCreateModalOpen} onClose={closeCreateModal} onSubmit={handleCreateSubmit} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari NIM, Nama, Jurusan, Angkatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />
        <div className="flex gap-2">
          <Select value={filterJurusan} onValueChange={setFilterJurusan}>
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[160px]">
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

      {loading ? (
        <div className="text-center py-6">Memuat data...</div>
      ) : (
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Fakultas</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Jurusan</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length ? (
              paginated.map((mhs) => (
                <TableRow key={mhs.nim} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!mhs.isActive ? "opacity-60" : ""}`}>
                  <TableCell>
                    {mhs.fotoUrl ? (
                      <img src={mhs.fotoUrl} alt={mhs.nama} className="w-12 h-12 rounded-sm object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-sm bg-gray-300 flex items-center justify-center text-gray-500">
                        <IconPhotoCircle className="w-6 h-6" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{mhs.nim}</TableCell>
                  <TableCell>{mhs.nama}</TableCell>
                  <TableCell>{mhs.fakultas}</TableCell>
                  <TableCell>{mhs.jurusan}</TableCell>
                  <TableCell>{mhs.angkatan}</TableCell>
                  <TableCell>{mhs.email}</TableCell>
                  <TableCell>
                    {mhs.isActive ? (
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
                    <Button size="sm" variant="outline" onClick={() => router.push(`/admin/manajemen-data/mahasiswa/${mhs.id}`)}>
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
      )}

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
