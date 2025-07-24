"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ITEMS_PER_PAGE = 6;

type JadwalKuliah = {
  id: string;
  mataKuliah: string;
  dosen: string;
  ruangan: string;
  hari: string;
  jamMulai: string; // format: "08:00"
  jamSelesai: string; // format: "09:30"
  aktif: boolean;
};

// contoh data awal, nanti bisa di-load dari file JSON / API
const initialJadwal: JadwalKuliah[] = [
  {
    id: "1",
    mataKuliah: "Pemrograman Web",
    dosen: "Budi Santoso",
    ruangan: "Ruang A101",
    hari: "Senin",
    jamMulai: "08:00",
    jamSelesai: "10:00",
    aktif: true,
  },
  {
    id: "2",
    mataKuliah: "Basis Data",
    dosen: "Sari Dewi",
    ruangan: "Lab Komputer 1",
    hari: "Selasa",
    jamMulai: "10:00",
    jamSelesai: "12:00",
    aktif: true,
  },
  {
    id: "3",
    mataKuliah: "Algoritma",
    dosen: "Joko Widodo",
    ruangan: "Ruang B202",
    hari: "Rabu",
    jamMulai: "13:00",
    jamSelesai: "15:00",
    aktif: false,
  },
];

export default function JadwalKuliahPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jadwal, setJadwal] = useState<JadwalKuliah[]>([]);
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalKuliah | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setJadwal(initialJadwal);
  }, []);

  const filtered = jadwal.filter((j) => `${j.mataKuliah} ${j.dosen} ${j.ruangan} ${j.hari}`.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const openEditModal = (item: JadwalKuliah) => {
    setSelectedJadwal({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedJadwal) {
      setJadwal((prev) => prev.map((j) => (j.id === selectedJadwal.id ? selectedJadwal : j)));
      setIsDialogOpen(false);
      setSelectedJadwal(null);
    }
  };

  return (
    <div className="px-1 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold">Pengaturan Jadwal Kuliah</h1>
          <Input type="text" placeholder="Cari jadwal..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto md:rounded-md md:border">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Mata Kuliah</th>
                  <th className="px-4 py-2 text-left">Dosen</th>
                  <th className="px-4 py-2 text-left">Ruangan</th>
                  <th className="px-4 py-2 text-left">Hari</th>
                  <th className="px-4 py-2 text-left">Jam</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((j) => (
                  <tr key={j.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2">{j.mataKuliah}</td>
                    <td className="px-4 py-2">{j.dosen}</td>
                    <td className="px-4 py-2">{j.ruangan}</td>
                    <td className="px-4 py-2">{j.hari}</td>
                    <td className="px-4 py-2">
                      {j.jamMulai} - {j.jamSelesai}
                    </td>
                    <td className="px-4 py-2">
                      <Badge className={j.aktif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>{j.aktif ? "Aktif" : "Nonaktif"}</Badge>
                    </td>
                    <td className="px-4 py-2">
                      <Button size="sm" variant="outline" onClick={() => openEditModal(j)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      {/* Modal Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Jadwal Kuliah</DialogTitle>
          </DialogHeader>

          {selectedJadwal && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <Label className="mb-3" htmlFor="mataKuliah">
                  Mata Kuliah
                </Label>
                <Input id="mataKuliah" name="mataKuliah" placeholder="Mata Kuliah" value={selectedJadwal.mataKuliah} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, mataKuliah: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="dosen">
                  Dosen
                </Label>
                <Input id="dosen" name="dosen" placeholder="Dosen" value={selectedJadwal.dosen} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, dosen: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="ruangan">
                  Ruangan
                </Label>
                <Input id="ruangan" name="ruangan" placeholder="Ruangan" value={selectedJadwal.ruangan} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, ruangan: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="hari">
                  Hari
                </Label>
                <Input id="hari" name="hari" placeholder="Hari (misal: Senin)" value={selectedJadwal.hari} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, hari: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="jamMulai">
                  Jam Mulai
                </Label>
                <Input id="jamMulai" name="jamMulai" type="time" value={selectedJadwal.jamMulai} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, jamMulai: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="jamSelesai">
                  Jam Selesai
                </Label>
                <Input id="jamSelesai" name="jamSelesai" type="time" value={selectedJadwal.jamSelesai} onChange={(e) => setSelectedJadwal((prev) => (prev ? { ...prev, jamSelesai: e.target.value } : prev))} required />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="aktif" checked={selectedJadwal.aktif} onCheckedChange={(val) => setSelectedJadwal((prev) => (prev ? { ...prev, aktif: val } : prev))} />
                <label htmlFor="aktif" className="select-none">
                  Status Aktif
                </label>
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
