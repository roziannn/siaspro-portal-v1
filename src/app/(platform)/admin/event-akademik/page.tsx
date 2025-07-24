"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";

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

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [userEnrolls, setUserEnrolls] = useState<string[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = events.filter((event) => `${event.nama} ${event.jenis}`.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedData = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
    <div className="px-1 lg:px-6">
      <Toaster position="top-right" />
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold">Event Kampus</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input type="text" placeholder="Cari event..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
            <Button onClick={handleAdd}>Tambah Event</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto border rounded-md">
            <table className="w-full min-w-[768px] text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b">
                <tr>
                  <th className="p-3 text-left whitespace-nowrap">Jenis</th>
                  <th className="p-3 text-left">Nama Event</th>
                  <th className="p-3 text-left whitespace-nowrap">Tgl</th>
                  <th className="p-3 text-left whitespace-nowrap">Lokasi</th>
                  <th className="p-3 text-left whitespace-nowrap">Kuota</th>
                  <th className="p-3 text-left whitespace-nowrap">Status</th>
                  <th className="p-3 text-left whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((event) => {
                  const tanggal = new Date(event.tanggal);
                  const isEnrolled = userEnrolls.includes(event.id);
                  const kuotaTersisa = event.kuota - userEnrolls.filter((e) => e === event.id).length;

                  return (
                    <tr key={event.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 whitespace-nowrap">
                        <Badge className={getJenisBadgeColor(event.jenis)}>{event.jenis}</Badge>
                      </td>
                      <td className="p-3">{event.nama}</td>
                      <td className="p-3 whitespace-nowrap">
                        {tanggal.toLocaleDateString("id-ID", {
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {tanggal.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-3 whitespace-nowrap">{event.lokasi}</td>
                      <td className="p-3 whitespace-nowrap">
                        {kuotaTersisa}/{event.kuota}
                      </td>
                      <td className="p-3 whitespace-nowrap">{isEnrolled ? <Badge className="bg-green-100 text-green-700">Sudah Enroll</Badge> : <Badge className="bg-gray-100 text-gray-600">Belum Enroll</Badge>}</td>
                      <td className="p-3 whitespace-nowrap">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      {/* Modal Tambah/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Event" : "Tambah Event"}</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="nama" className="mb-3">
                  Nama
                </Label>
                <Input id="nama" value={selectedEvent.nama} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, nama: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="tanggal" className="mb-3">
                  Tanggal
                </Label>
                <Input id="tanggal" type="datetime-local" value={new Date(selectedEvent.tanggal).toISOString().slice(0, 16)} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, tanggal: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="jenis" className="mb-3">
                  Jenis
                </Label>
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
                <Label htmlFor="lokasi" className="mb-3">
                  Lokasi
                </Label>
                <Input id="lokasi" value={selectedEvent.lokasi} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, lokasi: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="kuota" className="mb-3">
                  Kuota
                </Label>
                <Input id="kuota" type="number" value={selectedEvent.kuota} onChange={(e) => setSelectedEvent((prev) => prev && { ...prev, kuota: +e.target.value })} />
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
