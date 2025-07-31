"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import dataAkun from "./data.json";
import SectionHeader from "@/components/font/headerSectionText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import toast, { Toaster } from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

type AkunType = "all" | "mahasiswa" | "dosen" | "akademik";

type Akun = {
  type: string;
  nama: string;
  email: string;
  isActive: boolean;
  [key: string]: any; // untuk key lain seperti nim, nip, jurusan, dll
};

export default function MasterAkunPage() {
  const [filter, setFilter] = useState<AkunType>("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Akun[]>([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<Akun | null>(null);

  useEffect(() => {
    setData(dataAkun);
  }, []);

  const filtered = data.filter((item) => (filter === "all" || item.type === filter) && `${item.nama} ${item.email}`.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const openEditModal = (item: Akun) => {
    setEditForm(item);
    setIsEditOpen(true);
  };

  // Update form on input change
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Toggle status aktif
  const handleToggleActive = (checked: boolean) => {
    if (!editForm) return;
    setEditForm({ ...editForm, isActive: checked });
  };

  // Submit edit form
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    if (!editForm.nama || !editForm.email) {
      toast.error("Nama dan email harus diisi!");
      return;
    }

    setData((prev) => prev.map((item) => (item.email === editForm.email ? editForm : item)));
    toast.success("Data berhasil diperbarui!");
    setIsEditOpen(false);
    setEditForm(null);
  };

  return (
    <div className="space-y-6 px-4 py-3">
      <SectionHeader title="Data Akun" description="Daftar akun pengguna berdasarkan jenis dan status." />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <Input placeholder="Cari nama/email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />
        <Select defaultValue="all" onValueChange={(val) => setFilter(val as AkunType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Akun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
            <SelectItem value="dosen">Dosen</SelectItem>
            <SelectItem value="akademik">Akademik</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabel Data */}
      <div className="overflow-auto rounded-md border">
        <table className="w-full min-w-[800px] text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border-b px-4 py-2 text-left">Nama</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Jenis</th>
              <th className="border-b px-4 py-2 text-left">Status</th>
              <th className="border-b px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => openEditModal(item)}>
                  <td className="border-b px-4 py-2">{item.nama}</td>
                  <td className="border-b px-4 py-2">{item.email}</td>
                  <td className="border-b px-4 py-2 capitalize">{item.type}</td>
                  <td className="border-b px-4 py-2">{item.isActive ? "Aktif" : "Nonaktif"}</td>
                  <td className="border-b px-4 py-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(item);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-muted-foreground">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Modal Edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Akun</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input name="nama" placeholder="Nama" value={editForm?.nama ?? ""} onChange={handleEditChange} required />
            <Input type="email" name="email" placeholder="Email" value={editForm?.email ?? ""} onChange={handleEditChange} required />
            <div className="flex items-center space-x-2">
              <Switch id="isActive" checked={editForm?.isActive ?? false} onCheckedChange={handleToggleActive} />
              <label htmlFor="isActive" className="select-none">
                Status Aktif
              </label>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
