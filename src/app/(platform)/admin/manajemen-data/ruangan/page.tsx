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

import ruanganData from "./data.json";

const ITEMS_PER_PAGE = 6;

type Ruangan = {
  id: string;
  nama: string;
  kapasitas: number;
  lokasi: string;
  aktif: boolean;
};

export default function RuanganPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ruangan, setRuangan] = useState<Ruangan[]>([]); // kosong dulu
  const [selectedRoom, setSelectedRoom] = useState<Ruangan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setRuangan(ruanganData);
  }, []);

  const filtered = ruangan.filter((r) => `${r.nama} ${r.lokasi}`.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleEditClick = (room: Ruangan) => {
    setSelectedRoom({ ...room });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedRoom) {
      setRuangan((prev) => prev.map((r) => (r.id === selectedRoom.id ? selectedRoom : r)));
      setIsDialogOpen(false);
      setSelectedRoom(null);
    }
  };

  return (
    <div className="px-1 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold">Data Ruangan</h1>
          <Input type="text" placeholder="Cari ruangan..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto md:rounded-md md:border">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Nama Ruangan</th>
                  <th className="px-4 py-2 text-left">Kapasitas</th>
                  <th className="px-4 py-2 text-left">Lokasi</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-2">{r.nama}</td>
                    <td className="px-4 py-2">{r.kapasitas}</td>
                    <td className="px-4 py-2">{r.lokasi}</td>
                    <td className="px-4 py-2">
                      <Badge className={r.aktif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>{r.aktif ? "Aktif" : "Nonaktif"}</Badge>
                    </td>
                    <td className="px-4 py-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(r)}>
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
