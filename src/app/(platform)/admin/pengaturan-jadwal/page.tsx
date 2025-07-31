"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import SectionHeader from "@/components/font/headerSectionText";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type JadwalKuliah = {
  id: string;
  mataKuliah: string;
  dosen: string;
  ruangan: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
  aktif: boolean;
};

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

const ITEMS_PER_PAGE = 6;

export default function ManajemenJadwalKuliah() {
  const [jadwalList, setJadwalList] = useState<JadwalKuliah[]>([]);
  const [search, setSearch] = useState("");
  const [filterHari, setFilterHari] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalKuliah | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setJadwalList(initialJadwal);
  }, []);

  const hariOptions = Array.from(new Set(jadwalList.map((j) => j.hari)));

  const filtered = jadwalList.filter((j) => {
    const matchesSearch = j.mataKuliah.toLowerCase().includes(search.toLowerCase()) || j.dosen.toLowerCase().includes(search.toLowerCase()) || j.ruangan.toLowerCase().includes(search.toLowerCase());
    const matchesHari = filterHari === "all" || j.hari === filterHari;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && j.aktif) || (filterStatus === "inactive" && !j.aktif);
    return matchesSearch && matchesHari && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterHari, filterStatus]);

  const openEditModal = (item: JadwalKuliah) => {
    setSelectedJadwal({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedJadwal) {
      setJadwalList((prev) => prev.map((j) => (j.id === selectedJadwal.id ? selectedJadwal : j)));
      setIsDialogOpen(false);
      setSelectedJadwal(null);
    }
  };

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Pengaturan Jadwal Kuliah" description="Kelola jadwal kuliah, dosen, ruangan, dan status aktif." />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari Mata Kuliah, Dosen, atau Ruangan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />

        <div className="flex gap-2">
          <Select value={filterHari} onValueChange={setFilterHari}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter Hari" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Hari</SelectItem>
              {hariOptions.map((hari) => (
                <SelectItem key={hari} value={hari}>
                  {hari}
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
              <SelectItem value="inactive">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>Dosen</TableHead>
            <TableHead>Ruangan</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead>Jam</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length ? (
            paginated.map((j) => (
              <TableRow key={j.id} className={!j.aktif ? "opacity-60" : ""}>
                <TableCell>{j.mataKuliah}</TableCell>
                <TableCell>{j.dosen}</TableCell>
                <TableCell>{j.ruangan}</TableCell>
                <TableCell>{j.hari}</TableCell>
                <TableCell>
                  {j.jamMulai} - {j.jamSelesai}
                </TableCell>
                <TableCell className="text-green-700 font-semibold">{j.aktif ? "Aktif" : "Nonaktif"}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => openEditModal(j)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Tidak ada data ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

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
