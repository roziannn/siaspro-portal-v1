"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/font/headerSectionText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import toast from "react-hot-toast";

import dataEvent from "./data.json";

const ITEMS_PER_PAGE = 8;

type EventItem = {
  id: string;
  nama: string;
  tanggal: string;
  jenis: "Workshop" | "Bootcamp" | "Kuliah Umum" | "Lomba" | "Seminar" | "Kampus";
  lokasi: string;
  kuota: number;
};

const initialEvents: EventItem[] = dataEvent.map((e) => ({
  ...e,
  jenis: e.jenis as EventItem["jenis"],
}));

function getJenisBadgeColor(jenis: string) {
  switch (jenis) {
    case "Workshop":
      return "bg-blue-100 text-blue-800";
    case "Bootcamp":
      return "bg-green-100 text-green-800";
    case "Kuliah Umum":
      return "bg-yellow-100 text-yellow-800";
    case "Lomba":
      return "bg-red-100 text-red-800";
    case "Seminar":
      return "bg-purple-100 text-purple-800";
    case "Kampus":
      return "bg-slate-900 text-slate-100";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function ManajemenEvent() {
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState<string>("all");
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [userEnrolls, setUserEnrolls] = useState<string[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = `${event.nama} ${event.jenis}`.toLowerCase().includes(search.toLowerCase());
    const matchesJenis = filterJenis === "all" || event.jenis === filterJenis;
    return matchesSearch && matchesJenis;
  });

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedData = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterJenis]);

  const handleEdit = (event: EventItem) => {
    setIsEditMode(true);
    setSelectedEvent({ ...event });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedEvent({
      id: crypto.randomUUID(),
      nama: "",
      tanggal: new Date().toISOString(),
      jenis: "Workshop",
      lokasi: "",
      kuota: 0,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedEvent) return;

    if (isEditMode) {
      setEvents((prev) => prev.map((e) => (e.id === selectedEvent.id ? selectedEvent : e)));
      toast.success("Event berhasil diperbarui!");
    } else {
      setEvents((prev) => [...prev, selectedEvent]);
      toast.success("Event berhasil ditambahkan!");
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 px-4 py-3">
      <SectionHeader title="Event Kampus" description="Kelola daftar event kampus, termasuk tambah dan edit event." />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari event..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />

        <div className="flex items-center gap-2">
          <Select value={filterJenis} onValueChange={setFilterJenis}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Jenis Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenis</SelectItem>
              {["Workshop", "Bootcamp", "Kuliah Umum", "Lomba", "Seminar", "Kampus"].map((jenis) => (
                <SelectItem key={jenis} value={jenis}>
                  {jenis}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleAdd}>Tambah Event</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jenis</TableHead>
            <TableHead>Nama Event</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Kuota</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((event) => {
              const tanggal = new Date(event.tanggal);
              const kuotaTersisa = event.kuota - userEnrolls.filter((e) => e === event.id).length;

              return (
                <TableRow key={event.id} className={`${kuotaTersisa === 0 ? "opacity-60" : ""}`}>
                  <TableCell>
                    <Badge className={getJenisBadgeColor(event.jenis)}>{event.jenis}</Badge>
                  </TableCell>
                  <TableCell>{event.nama}</TableCell>
                  <TableCell>
                    {tanggal.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {tanggal.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{event.lokasi}</TableCell>
                  <TableCell>
                    {kuotaTersisa}/{event.kuota}
                  </TableCell>
                  <TableCell>{tanggal >= new Date() ? <Badge className="bg-green-100 text-green-700">Aktif</Badge> : <Badge className="bg-gray-300 text-gray-700">Selesai</Badge>}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Event" : "Tambah Event"}</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input id="nama" value={selectedEvent.nama} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, nama: e.target.value })} required />
              </div>

              <div>
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input id="tanggal" type="datetime-local" value={new Date(selectedEvent.tanggal).toISOString().slice(0, 16)} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, tanggal: e.target.value })} required />
              </div>

              <div>
                <Label htmlFor="jenis">Jenis</Label>
                <Select value={selectedEvent.jenis} onValueChange={(val) => setSelectedEvent((prev) => prev && { ...prev, jenis: val as EventItem["jenis"] })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih jenis event" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Workshop", "Bootcamp", "Kuliah Umum", "Lomba", "Seminar", "Kampus"].map((jenis) => (
                      <SelectItem key={jenis} value={jenis}>
                        {jenis}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input id="lokasi" value={selectedEvent.lokasi} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, lokasi: e.target.value })} required />
              </div>

              <div>
                <Label htmlFor="kuota">Kuota</Label>
                <Input id="kuota" type="number" min={0} value={selectedEvent.kuota} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, kuota: +e.target.value })} required />
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
