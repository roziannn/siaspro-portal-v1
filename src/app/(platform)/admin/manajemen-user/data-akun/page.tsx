"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/font/headerSectionText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled, IconEdit } from "@tabler/icons-react";
import { formatType } from "./utils";
import { numberToRole } from "./utils";

import AkunModal from "./akunModal";

const ITEMS_PER_PAGE = 8;

type AkunType = "all" | "mahasiswa" | "dosen" | "akademik";

type Akun = {
  nama: string;
  email: string;
  type: string;
  isActive: boolean;
};

export default function MasterAkunPage() {
  const [filter, setFilter] = useState<AkunType>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Akun[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState<Akun | null>(null);

  useEffect(() => {
    fetch("/api/user-akun")
      .then((res) => res.json())
      .then((users) => {
        const mapped = users.map((user: any) => ({
          nama: user.name,
          email: user.email,
          type: numberToRole(user.role),
          isActive: user.isActive,
        }));
        setData(mapped);
      })
      .catch(() => toast.error("Gagal mengambil data akun"));
  }, []);

  const filtered = data.filter((item) => (filter === "all" || item.type === filter) && `${item.nama} ${item.email}`.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const openEditModal = (item: Akun) => {
    setIsEditMode(true);
    setSelectedAkun(item);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedAkun({ nama: "", email: "", type: "mahasiswa", isActive: true });
    setIsDialogOpen(true);
  };

  const handleSave = async (akun: Akun) => {
    try {
      const url = "/api/user-akun";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: akun.email,
          name: akun.nama,
          role: akun.type,
          isActive: akun.isActive,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan akun");

      const result = await res.json();

      if (isEditMode) {
        setData((prev) => prev.map((u) => (u.email === akun.email ? akun : u)));
        toast.success("Akun berhasil diperbarui!");
      } else {
        setData((prev) => [...prev, akun]);
        toast.success("Akun berhasil ditambahkan!");
      }

      setIsDialogOpen(false);
      setSelectedAkun(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Akun" description="Daftar akun pengguna berdasarkan jenis dan status." />
        <Button onClick={handleAdd}>
          <IconCirclePlusFilled /> Tambah Akun
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <Input placeholder="Cari nama/email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />
        <Select defaultValue="all" onValueChange={(val) => setFilter(val as AkunType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Role</SelectItem>
            <SelectItem value="administrator">Administrator</SelectItem>
            <SelectItem value="dosen">Dosen</SelectItem>
            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
            <SelectItem value="dosen_wali">Dosen Wali</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((item, idx) => (
              <TableRow key={idx} className="cursor-pointer" onClick={() => openEditModal(item)}>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="capitalize">{formatType(item.type)}</TableCell>
                <TableCell>
                  {item.isActive ? (
                    <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                      <IconCircleCheckFilled className="w-4 h-4" /> Aktif
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                      <IconCircleXFilled className="w-4 h-4" /> Nonaktif
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(item);
                    }}
                  >
                    <IconEdit />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <AkunModal open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSave} akun={selectedAkun} editMode={isEditMode} />
    </div>
  );
}
