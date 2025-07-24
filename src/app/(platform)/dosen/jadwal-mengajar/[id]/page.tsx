"use client";

import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { IconBook, IconEdit, IconTrash } from "@tabler/icons-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface Jadwal {
  id: number;
  mataKuliah: string;
  kelas: string;
  hari: string;
  jam: string;
  ruangan: string;
}

interface Tugas {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: Date;
  status: "Aktif" | "Arsip";
}

interface Mahasiswa {
  id: number;
  nama: string;
  nim: string;
}

const jadwalDosen: Jadwal[] = [
  { id: 1, mataKuliah: "Pemrograman Web Lanjut", kelas: "TI-3A", hari: "Senin", jam: "08:00 - 10:00", ruangan: "Lab 2" },
  { id: 2, mataKuliah: "Basis Data", kelas: "TI-2B", hari: "Selasa", jam: "10:00 - 12:00", ruangan: "Ruang 204" },
  { id: 3, mataKuliah: "Pemrograman Mobile", kelas: "TI-3C", hari: "Rabu", jam: "13:00 - 15:00", ruangan: "Lab 3" },
  { id: 4, mataKuliah: "Etika Profesi", kelas: "TI-1A", hari: "Jumat", jam: "09:00 - 11:00", ruangan: "Ruang 101" },
];

const peserta: Mahasiswa[] = [
  { id: 1, nama: "Ahmad Fauzi", nim: "1234567890" },
  { id: 2, nama: "Dewi Lestari", nim: "1234567891" },
  { id: 3, nama: "Budi Santoso", nim: "1234567892" },
  { id: 4, nama: "Siti Nurhaliza", nim: "1234567893" },
  { id: 5, nama: "Rizki Ramadhan", nim: "1234567894" },
  { id: 6, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 7, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 8, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 9, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 10, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 11, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 12, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 13, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 14, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 15, nama: "Indah Pratiwi", nim: "1234567895" },
  { id: 16, nama: "Indah Pratiwi", nim: "1234567895" },
];

const initialTugas: Tugas[] = [
  {
    id: 1,
    judul: "Tugas Etika Profesi",
    deskripsi: "Buat makalah tentang kode etik profesi di bidang TI.",
    tanggal: new Date(),
    status: "Aktif",
  },
];

interface PageProps {
  params: {
    id: string;
  };
}

const riwayat = [
  { id: 1, tanggal: "2025/07/01", topik: "Pengenalan React", status: "Selesai" },
  { id: 2, tanggal: "2025/07/08", topik: "State & Props", status: "Selesai" },
  { id: 3, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
  { id: 4, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
  { id: 5, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
  { id: 6, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
  { id: 7, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
  { id: 8, tanggal: "2025/07/15", topik: "Hooks Dasar", status: "Belum Mulai" },
];

export default function JadwalDetailPage({ params }: PageProps) {
  const jadwal = jadwalDosen.find((item) => item.id === parseInt(params.id));
  const [tugas, setTugas] = useState<Tugas[]>(initialTugas);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [search, setSearch] = useState("");

  if (!jadwal) notFound();

  const handlePostTugas = () => {
    if (!judul.trim()) return;
    const newTugas: Tugas = {
      id: tugas.length + 1,
      judul,
      deskripsi,
      tanggal: new Date(),
      status: "Aktif",
    };
    setTugas([newTugas, ...tugas]);
    setJudul("");
    setDeskripsi("");
  };

  const [riwayatPertemuan, setRiwayatPertemuan] = useState(riwayat);
  const [newTanggal, setNewTanggal] = useState("");
  const [newTopik, setNewTopik] = useState("");

  const handleTambahPertemuan = () => {
    if (!newTanggal || !newTopik) return;
    const newItem = {
      id: riwayatPertemuan.length + 1,
      tanggal: newTanggal,
      topik: newTopik,
      status: "Belum",
    };
    setRiwayatPertemuan([newItem, ...riwayatPertemuan]);
    setNewTanggal("");
    setNewTopik("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(riwayatPertemuan.length / itemsPerPage);

  const paginatedData = riwayatPertemuan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const pesertaPerPage = 10;
  const [currentPesertaPage, setCurrentPesertaPage] = useState(1);

  const filteredPeserta = peserta.filter((p) => p.nama.toLowerCase().includes(search.toLowerCase()) || p.nim.includes(search));

  const totalPesertaPages = Math.ceil(filteredPeserta.length / pesertaPerPage);
  const paginatedPeserta = filteredPeserta.slice((currentPesertaPage - 1) * pesertaPerPage, currentPesertaPage * pesertaPerPage);

  useEffect(() => {
    setCurrentPesertaPage(1);
  }, [search]);

  return (
    <div className="px-2 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Informasi Jadwal */}
        <div className="md:col-span-8 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-4 md:gap-2">
              <div>
                <CardTitle className="text-xl leading-tight">
                  Detail Jadwal
                  <br />
                  <span className="block mt-3 text-sm font-semibold">Informasi Kelas</span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Tabel desktop */}
              <div className="overflow-auto hidden sm:block">
                <table className="text-sm min-w-[630px]">
                  <tbody>
                    <tr>
                      <td className="p-2 font-medium w-30">Mata Kuliah</td>
                      <td className="p-2">{jadwal.mataKuliah}</td>
                      <td className="p-2 font-medium w-30">Kelas</td>
                      <td className="p-2">{jadwal.kelas}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Waktu</td>
                      <td className="p-2">{`${jadwal.hari}, ${jadwal.jam}`}</td>
                      <td className="p-2 font-medium">Ruangan</td>
                      <td className="p-2">{jadwal.ruangan}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tampilan mobile */}
              <div className="grid grid-cols-1 text-sm space-y-2 sm:hidden">
                <Info label="Mata Kuliah" value={jadwal.mataKuliah} />
                <Info label="Kelas" value={jadwal.kelas} />
                <Info label="Waktu" value={`${jadwal.hari}, ${jadwal.jam}`} />
                <Info label="Ruangan" value={jadwal.ruangan} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Riwayat Pertemuan</CardTitle>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Tambah</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Pertemuan</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="tanggal">Tanggal</label>
                      <Input id="tanggal" type="date" value={newTanggal} onChange={(e) => setNewTanggal(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="topik">Topik</label>
                      <Input id="topik" placeholder="Topik pembahasan" value={newTopik} onChange={(e) => setNewTopik(e.target.value)} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleTambahPertemuan}>Simpan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted text-left">
                    <TableHead className="py-2 px-4">No.</TableHead>
                    <TableHead className="py-2 px-4">Tanggal</TableHead>
                    <TableHead className="py-2 px-4">Topik</TableHead>
                    <TableHead className="py-2 px-4">Status</TableHead>
                    <TableHead className="py-2 px-4">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-2 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell className="py-2 px-4">{item.tanggal}</TableCell>
                      <TableCell className="py-2 px-4">{item.topik}</TableCell>
                      <TableCell className="py-2 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span>
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <button title="Assigment" className="hover:text-primary">
                            <IconBook size={18} stroke={1.5} />
                          </button>
                          <span>|</span>
                          <button title="Edit" className="hover:text-primary">
                            <IconEdit size={18} stroke={1.5} />
                          </button>
                          <span>|</span>
                          <button title="Delete" className="hover:text-destructive">
                            <IconTrash size={18} stroke={1.5} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            {/* Pagination */}
            <div className="flex justify-between items-center px-10 text-sm">
              <span>
                Halaman {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
                  Prev
                </button>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Daftar Peserta */}
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-col gap-2 sm:items-start">
              <CardTitle className="text-xl leading-tight">Daftar Peserta</CardTitle>
              <span className="block text-sm font-semibold">Mahasiswa/i</span>
              <Input placeholder="Cari nama atau NIM..." value={search} onChange={(e) => setSearch(e.target.value)} className="text-sm" />
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">No</th>
                      <th className="text-left py-2">Nama</th>
                      <th className="text-left py-2">NIM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPeserta.map((p, idx) => (
                      <tr key={p.id} className="border-b">
                        <td className="py-2">{(currentPesertaPage - 1) * pesertaPerPage + idx + 1}</td>
                        <td className="py-2">{p.nama}</td>
                        <td className="py-2">{p.nim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center px-2 mt-4 text-sm">
                  <span>
                    Halaman {currentPesertaPage} dari {totalPesertaPages}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentPesertaPage((prev) => Math.max(prev - 1, 1))} disabled={currentPesertaPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
                      Prev
                    </button>
                    <button onClick={() => setCurrentPesertaPage((prev) => Math.min(prev + 1, totalPesertaPages))} disabled={currentPesertaPage === totalPesertaPages} className="px-3 py-1 border rounded disabled:opacity-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 font-medium">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}
