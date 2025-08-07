"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled, IconEdit } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import JadwalModal from "./jadwalModal";

type JadwalKuliah = {
  id: number;
  mataKuliah: string;
  dosen: string;
  ruangan: string;
  hari: string;
  jamMulai: string;
  jamSelesai: string;
  aktif: boolean;
  createdById: number;
  updatedById: number;
};

const ITEMS_PER_PAGE = 6;

export default function ManajemenJadwalKuliah() {
  const [jadwalList, setJadwalList] = useState<JadwalKuliah[]>([]);
  const [search, setSearch] = useState("");
  const [filterHari, setFilterHari] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [selectedJadwal, setSelectedJadwal] = useState<JadwalKuliah | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadJadwals() {
      setLoading(true);
      try {
        const res = await fetch("/api/jadwal-kuliah");
        if (!res.ok) throw new Error("Gagal memuat data jadwal");
        const data: JadwalKuliah[] = await res.json();
        setJadwalList(data);
        const maxId = data.reduce((max, e) => (e.id > max ? e.id : max), 0);
        setLastId(maxId);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadJadwals();
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

  // Handler untuk membuka modal edit
  const handleEdit = (jadwal: JadwalKuliah) => {
    setIsEditMode(true);
    setSelectedJadwal({ ...jadwal });
    setIsDialogOpen(true);
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      if (!res.ok) throw new Error("Gagal ambil user");

      const data = await res.json();
      const user = data.user;

      if (!user || !user.id) {
        alert("Gagal mengambil user login. Harap login ulang.");
        return;
      }

      const newId = lastId + 1;
      setIsEditMode(false);
      setSelectedJadwal({
        id: newId,
        mataKuliah: "test-1",
        dosen: "test",
        ruangan: "test",
        hari: "Senin",
        jamMulai: "10-06-2025",
        jamSelesai: "10-06-2025",
        aktif: true,
        createdById: user.id,
        updatedById: user.id,
      });
      setLastId(newId);
      setIsDialogOpen(true);
    } catch (error) {
      alert("Gagal mengambil user login. Harap login ulang.");
    }
  };

  const openEditModal = (item: JadwalKuliah) => {
    setSelectedJadwal({ ...item });
    setIsDialogOpen(true);
  };

  async function addJadwal(jadwal: JadwalKuliah): Promise<JadwalKuliah> {
    const res = await fetch("/api/jadwal-kuliah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jadwal),
    });
    if (!res.ok) throw new Error("Gagal menambah jadwal kuliah");
    return res.json();
  }

  async function updateJadwal(jadwal: JadwalKuliah): Promise<JadwalKuliah> {
    const res = await fetch("/api/jadwal-kuliah", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jadwal),
    });
    if (!res.ok) throw new Error("Gagal memperbarui jadwal kuliah");
    return res.json();
  }

  const handleSave = async (jadwal: JadwalKuliah) => {
    try {
      if (isEditMode) {
        const updated = await updateJadwal(jadwal);
        setJadwalList((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
        toast.success("Jadwal berhasil diperbarui!");
      } else {
        const added = await addJadwal(jadwal);
        setJadwalList((prev) => [...prev, added]);
        setLastId((id) => Math.max(id, added.id));
        toast.success("Jadwal berhasil ditambahkan!");
      }
      setIsDialogOpen(false);
      setSelectedJadwal(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Pengaturan Jadwal Kuliah" description="Kelola jadwal kuliah, dosen, ruangan, dan status aktif." />
        <Button onClick={handleAdd}>
          <IconCirclePlusFilled /> Tambah Jadwal
        </Button>
      </div>
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

      {loading ? (
        <div className="text-center py-6">Memuat data...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>No.</TableHead> */}
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
              paginated.map((j, index) => (
                <TableRow key={j.id}>
                  {/* <TableCell className="w-1">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell> */}
                  <TableCell>{j.mataKuliah}</TableCell>
                  <TableCell>{j.dosen}</TableCell>
                  <TableCell>{j.ruangan}</TableCell>
                  <TableCell>{j.hari}</TableCell>
                  <TableCell>
                    {j.jamMulai} - {j.jamSelesai}
                  </TableCell>
                  <TableCell>
                    {j.aktif ? (
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
                    <Button size="sm" variant="outline" onClick={() => handleEdit(j)}>
                      <IconEdit />
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
      )}

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <JadwalModal open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSave} jadwal={selectedJadwal} editMode={isEditMode} />
    </div>
  );
}
