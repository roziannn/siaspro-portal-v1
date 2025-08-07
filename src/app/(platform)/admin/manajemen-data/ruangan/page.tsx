"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/font/headerSectionText";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

type Ruangan = {
  id: string;
  nama: string;
  kapasitas: number;
  lokasi: string;
  aktif: boolean;
};

import ruanganData from "./data.json";
import { IconCirclePlusFilled, IconEdit, IconPencil } from "@tabler/icons-react";

const ITEMS_PER_PAGE = 6;

export default function ManajemenDataRuangan() {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [search, setSearch] = useState("");
  const [filterLokasi, setFilterLokasi] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState<Ruangan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setRuanganList(ruanganData);
  }, []);

  const lokasiOptions = Array.from(new Set(ruanganList.map((r) => r.lokasi)));

  const filtered = ruanganList.filter((r) => {
    const matchesSearch = r.nama.toLowerCase().includes(search.toLowerCase()) || r.lokasi.toLowerCase().includes(search.toLowerCase());
    const matchesLokasi = filterLokasi === "all" || r.lokasi === filterLokasi;
    const matchesStatus = filterStatus === "all" || (filterStatus === "active" && r.aktif) || (filterStatus === "inactive" && !r.aktif);
    return matchesSearch && matchesLokasi && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterLokasi, filterStatus]);

  const handleEditClick = (room: Ruangan) => {
    setSelectedRoom({ ...room });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedRoom) {
      setRuanganList((prev) => prev.map((r) => (r.id === selectedRoom.id ? selectedRoom : r)));
      setIsDialogOpen(false);
      setSelectedRoom(null);
    }
  };

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Ruangan" description="Kelola informasi ruangan dan statusnya." />
        <Button>
          <IconCirclePlusFilled /> Tambah Ruangan
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari nama atau lokasi ruangan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />

        <div className="flex gap-2">
          <Select value={filterLokasi} onValueChange={setFilterLokasi}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Lokasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Lokasi</SelectItem>
              {lokasiOptions.map((lokasi) => (
                <SelectItem key={lokasi} value={lokasi}>
                  {lokasi}
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
            <TableHead>Nama Ruangan</TableHead>
            <TableHead>Kapasitas</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length ? (
            paginated.map((r) => (
              <TableRow key={r.id} className={!r.aktif ? "opacity-60" : ""}>
                <TableCell>{r.nama}</TableCell>
                <TableCell>{r.kapasitas}</TableCell>
                <TableCell>{r.lokasi}</TableCell>
                <TableCell>
                  <span className={r.aktif ? "text-green-700 font-semibold" : "text-gray-500 font-semibold"}>{r.aktif ? "Aktif" : "Nonaktif"}</span>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => handleEditClick(r)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Ruangan</DialogTitle>
          </DialogHeader>

          {selectedRoom && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <Label className="mb-3" htmlFor="nama">
                  Nama Ruangan
                </Label>
                <Input id="nama" name="nama" placeholder="Nama Ruangan" value={selectedRoom.nama} onChange={(e) => setSelectedRoom((prev) => (prev ? { ...prev, nama: e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="kapasitas">
                  Kapasitas
                </Label>
                <Input id="kapasitas" name="kapasitas" type="number" placeholder="Kapasitas" value={selectedRoom.kapasitas} onChange={(e) => setSelectedRoom((prev) => (prev ? { ...prev, kapasitas: +e.target.value } : prev))} required />
              </div>

              <div>
                <Label className="mb-3" htmlFor="lokasi">
                  Lokasi
                </Label>
                <Input id="lokasi" name="lokasi" placeholder="Lokasi" value={selectedRoom.lokasi} onChange={(e) => setSelectedRoom((prev) => (prev ? { ...prev, lokasi: e.target.value } : prev))} required />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={selectedRoom.aktif} onCheckedChange={(val) => setSelectedRoom((prev) => (prev ? { ...prev, aktif: val } : prev))} />
                <label htmlFor="isActive" className="select-none">
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
