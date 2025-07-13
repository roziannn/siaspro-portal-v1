"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

import mahasiswaData from "./data.json";

type Mahasiswa = {
  nim: string;
  nama: string;
  jurusan: string;
  angkatan: string;
  email: string;
  isActive: boolean;
};

const ITEMS_PER_PAGE = 8;

export default function MasterMahasiswaPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState<Omit<Mahasiswa, "isActive">>({
    nim: "",
    nama: "",
    jurusan: "",
    angkatan: "",
    email: "",
  });
  const [editIsActive, setEditIsActive] = useState(true);
  const [editingNim, setEditingNim] = useState<string | null>(null);

  // Set data awal dengan isActive true
  useEffect(() => {
    const initialData = mahasiswaData.map((m) => ({ ...m, isActive: true }));
    setMahasiswaList(initialData);
  }, []);

  const filteredData = mahasiswaList.filter((m) => `${m.nim} ${m.nama} ${m.jurusan}`.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Mahasiswa
  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.jurusan || !form.angkatan || !form.email) {
      toast.error("Harap isi semua field!", { duration: 5000 });
      return;
    }
    // Cek duplikat NIM
    if (mahasiswaList.find((m) => m.nim === form.nim)) {
      toast.error("NIM sudah ada!", { duration: 5000 });
      return;
    }
    setMahasiswaList([{ ...form, isActive: true }, ...mahasiswaList]);
    toast.success("Mahasiswa berhasil ditambahkan!", { duration: 5000 });
    setForm({ nim: "", nama: "", jurusan: "", angkatan: "", email: "" });
    setIsAddOpen(false);
  };

  // Mulai edit: isi form + toggle + simpan nim yg diedit
  const startEdit = (mhs: Mahasiswa) => {
    setForm({
      nim: mhs.nim,
      nama: mhs.nama,
      jurusan: mhs.jurusan,
      angkatan: mhs.angkatan,
      email: mhs.email,
    });
    setEditIsActive(mhs.isActive);
    setEditingNim(mhs.nim);
    setIsEditOpen(true);
  };

  // Simpan edit
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.jurusan || !form.angkatan || !form.email) {
      toast.error("Harap isi semua field!", { duration: 5000 });
      return;
    }
    setMahasiswaList((prev) => prev.map((m) => (m.nim === editingNim ? { ...form, isActive: editIsActive } : m)));
    toast.success("Data mahasiswa berhasil diperbarui!", { duration: 5000 });
    setIsEditOpen(false);
    setEditingNim(null);
    setForm({ nim: "", nama: "", jurusan: "", angkatan: "", email: "" });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="px-1 lg:px-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl font-semibold">Master Mahasiswa</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input type="text" placeholder="Cari NIM/Nama/Jurusan..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
              {/* Tambah Dialog */}
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>+ Tambah</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Tambah Mahasiswa</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddSubmit} className="space-y-4">
                    <Input name="nim" placeholder="NIM" value={form.nim} onChange={handleChange} required />
                    <Input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} required />
                    <Input name="jurusan" placeholder="Jurusan" value={form.jurusan} onChange={handleChange} required />
                    <Input name="angkatan" placeholder="Angkatan" value={form.angkatan} onChange={handleChange} required />
                    <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <DialogFooter className="flex justify-end gap-2">
                      <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">Simpan</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-md border">
              <table className="w-full min-w-[900px] text-sm border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border-b px-4 py-2 text-left">NIM</th>
                    <th className="border-b px-4 py-2 text-left">Nama</th>
                    <th className="border-b px-4 py-2 text-left">Jurusan</th>
                    <th className="border-b px-4 py-2 text-left">Angkatan</th>
                    <th className="border-b px-4 py-2 text-left">Email</th>
                    <th className="border-b px-4 py-2 text-left">Status Aktif</th>
                    <th className="border-b px-4 py-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((mhs) => (
                      <tr key={mhs.nim} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${!mhs.isActive ? "opacity-50" : ""}`}>
                        <td className="border-b px-4 py-2">{mhs.nim}</td>
                        <td className="border-b px-4 py-2">{mhs.nama}</td>
                        <td className="border-b px-4 py-2">{mhs.jurusan}</td>
                        <td className="border-b px-4 py-2">{mhs.angkatan}</td>
                        <td className="border-b px-4 py-2">{mhs.email}</td>
                        <td className="border-b px-4 py-2">{mhs.isActive ? "Aktif" : "Tidak Aktif"}</td>
                        <td className="border-b px-4 py-2 space-x-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(mhs)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-muted-foreground">
                        Tidak ada mahasiswa ditemukan.
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

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Mahasiswa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input
                name="nim"
                placeholder="NIM"
                value={form.nim}
                onChange={handleChange}
                disabled // biasanya NIM gak boleh diubah
              />
              <Input name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} required />
              <Input name="jurusan" placeholder="Jurusan" value={form.jurusan} onChange={handleChange} required />
              <Input name="angkatan" placeholder="Angkatan" value={form.angkatan} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={editIsActive} onCheckedChange={(checked) => setEditIsActive(checked === true)} />
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
    </>
  );
}
