"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled, IconEdit } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";
import toast from "react-hot-toast";

import RuanganModal, { Ruangan } from "./ruanganModal";

const ITEMS_PER_PAGE = 10;

export default function ManajemenDataRuangan() {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<Ruangan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    async function fetchRuangans() {
      setLoading(true);
      try {
        const res = await fetch("/api/data/ruangan");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Gagal mengambil data ruangan");
        }
        const data: Ruangan[] = await res.json();
        setRuanganList(data);
        // update lastId buat generate id baru klo mslnya ditambah
        const maxId = data.reduce((max, r) => (parseInt(r.id) > max ? parseInt(r.id) : max), 0);
        setLastId(maxId);
      } catch (error) {
        toast.error(`Gagal memuat data ruangan: ${(error as Error).message}`);
        setRuanganList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRuangans();
  }, []);

  const filtered = ruanganList.filter((r) => {
    const nama = r.nama ?? "";
    const lokasi = r.lokasi ?? "";
    const matchesSearch = nama.toLowerCase().includes(search.toLowerCase()) || lokasi.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || (filterStatus === "tersedia" && r.status === "tersedia") || (filterStatus === "tidak tersedia" && r.status !== "tersedia");
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Handler edit
  const handleEditClick = (room: Ruangan) => {
    setSelectedRoom(room);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  // Handler tambah
  const handleAddClick = () => {
    const newId = (lastId + 1).toString();
    setSelectedRoom({
      id: newId,
      nama: "",
      kapasitas: "",
      lokasi: "",
      status: "tersedia",
      fasilitas: "",
    });
    setIsEditMode(false);
    setLastId(lastId + 1);
    setIsDialogOpen(true);
  };

  async function submitRuangan(data: Ruangan): Promise<Ruangan> {
    try {
      const method = isEditMode ? "PUT" : "POST";
      const url = "/api/data/ruangan";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menyimpan data ruangan");
      }

      const savedRuangan = await res.json();
      return savedRuangan;
    } catch (error) {
      console.error("Submit ruangan error:", error);
      throw error;
    }
  }

  async function handleSave(data: Ruangan) {
    try {
      const saved = await submitRuangan(data);

      if (isEditMode) {
        // update list
        setRuanganList((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
        toast.success("Data ruangan berhasil diperbarui!");
      } else {
        // tambah ke list
        setRuanganList((prev) => [...prev, saved]);
        setLastId((id) => Math.max(id, parseInt(saved.id)));
        toast.success("Data ruangan berhasil ditambahkan!");
      }

      setIsDialogOpen(false);
      setCurrentPage(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(`Gagal menyimpan data ruangan: ${(error as Error).message}`);
    }
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Ruangan" description="Kelola informasi ruangan dan statusnya." />
        <Button onClick={handleAddClick}>
          <IconCirclePlusFilled /> Tambah Ruangan
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari nama atau lokasi ruangan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" aria-label="Cari nama atau lokasi ruangan" />
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="tersedia">Tersedia</SelectItem>
              <SelectItem value="tidak tersedia">Tidak Tersedia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6">Memuat data...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Ruangan</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Fasilitas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length ? (
              paginated.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.nama}</TableCell>
                  <TableCell>{r.kapasitas}</TableCell>
                  <TableCell>{r.lokasi}</TableCell>
                  <TableCell>
                    {r.fasilitas?.split(",").map((f, i) => (
                      <Badge key={i} className="bg-yellow-100 text-yellow-700 mr-1 mb-1 inline-flex items-center px-2 py-1 rounded-md">
                        {f.trim()}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    {r.status === "tersedia" ? (
                      <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                        <IconCircleCheckFilled className="w-4 h-4" />
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
                        <IconCircleXFilled className="w-4 h-4" />
                        Not Available
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleEditClick(r)} aria-label={`Edit ${r.nama}`}>
                      <IconEdit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
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

      <RuanganModal isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSave} initialData={selectedRoom} />
    </div>
  );
}
