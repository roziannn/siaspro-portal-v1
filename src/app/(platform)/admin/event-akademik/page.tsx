"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import SectionHeader from "@/components/font/headerSectionText";
import toast from "react-hot-toast";
import EventModal from "./eventModal";
import { IconCircleCheckFilled, IconCirclePlusFilled, IconCircleXFilled, IconClockFilled, IconEdit } from "@tabler/icons-react";

const ITEMS_PER_PAGE = 10;

type EventItem = {
  id: number;
  nama: string;
  tanggal: string;
  jenis: string;
  lokasi: string;
  kuota: number;
  status: string;
  totalJoin: number;
  createdById: number;
};

export default function ManajemenEvent() {
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState<string>("all");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [userEnrolls, setUserEnrolls] = useState<string[]>([]); // contoh: ["1", "2"]

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Gagal memuat data event");
        const data: EventItem[] = await res.json();
        setEvents(data);
        // update lastId supaya tetap unik (ambil max id dari data event)
        const maxId = data.reduce((max, e) => (e.id > max ? e.id : max), 0);
        setLastId(maxId);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Filter dan pagination
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

  // Handler untuk membuka modal edit
  const handleEdit = (event: EventItem) => {
    setIsEditMode(true);
    setSelectedEvent({ ...event });
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
      setSelectedEvent({
        id: newId,
        nama: "",
        tanggal: new Date().toISOString(),
        jenis: "Workshop",
        lokasi: "",
        kuota: 0,
        status: "OPEN",
        totalJoin: 0,
        createdById: user.id,
      });
      setLastId(newId);
      setIsDialogOpen(true);
    } catch (error) {
      alert("Gagal mengambil user login. Harap login ulang.");
    }
  };

  // Fungsi tambah event ke API
  async function addEvent(event: EventItem): Promise<EventItem> {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Gagal menambah event");
    return res.json();
  }

  // Fungsi update event ke API
  async function updateEvent(event: EventItem): Promise<EventItem> {
    const res = await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Gagal memperbarui event");
    return res.json();
  }

  // Simpan data event (tambah atau edit)
  const handleSave = async (event: EventItem) => {
    try {
      if (isEditMode) {
        const updated = await updateEvent(event);
        setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        toast.success("Event berhasil diperbarui!");
      } else {
        const added = await addEvent(event);
        setEvents((prev) => [...prev, added]);
        setLastId((id) => Math.max(id, added.id)); // pastikan lastId updated
        toast.success("Event berhasil ditambahkan!");
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // Warna badge berdasarkan jenis event
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

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Event Akademik" description="Kelola daftar event kampus, termasuk tambah dan edit event." />
        <Button onClick={handleAdd}>
          <IconCirclePlusFilled /> Tambah Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Input placeholder="Cari nama event..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:max-w-sm" />
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
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6">Memuat data...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>No.</TableHead> */}
              <TableHead>Nama Event</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Kuota</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((event, index) => {
                const tanggal = new Date(event.tanggal);
                const kuotaTersisa = event.kuota - userEnrolls.filter((e) => e === event.id.toString()).length;

                return (
                  <TableRow key={event.id} className={`${kuotaTersisa === 0 ? "opacity-60" : ""}`}>
                    {/* <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell> */}
                    <TableCell>{event.nama}</TableCell>
                    <TableCell>
                      <Badge className={getJenisBadgeColor(event.jenis)}>{event.jenis}</Badge>
                    </TableCell>
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
                    <TableCell>{event.kuota}</TableCell>
                    <TableCell>{event.totalJoin}</TableCell>
                    <TableCell>
                      {event.status === "OPEN" && (
                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                          <IconCircleCheckFilled className="w-4 h-4" />
                          Open
                        </Badge>
                      )}
                      {event.status === "ONGOING" && (
                        <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                          <IconClockFilled className="w-4 h-4" />
                          Ongoing
                        </Badge>
                      )}
                      {event.status === "CLOSED" && (
                        <Badge className="bg-gray-200 text-gray-700 flex items-center gap-1">
                          <IconCircleXFilled className="w-4 h-4" />
                          Closed
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                        <IconEdit />
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
      )}

      <div className="flex justify-end pt-4">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <EventModal open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSave} event={selectedEvent} editMode={isEditMode} />
    </div>
  );
}
