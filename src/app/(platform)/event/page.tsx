"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";

import dataEvent from "./data.json";

const ITEMS_PER_PAGE = 8;

type EventItem = {
  id: string;
  nama: string;
  tanggal: string;
  jenis: "Workshop" | "Bootcamp" | "Kuliah Umum" | "Lomba" | "Seminar";
  lokasi: string;
  kuota: number;
};

const eventList: EventItem[] = dataEvent.map((e) => ({
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
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [userEnrolls, setUserEnrolls] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = eventList.filter((event) => `${event.nama} ${event.jenis}`.toLowerCase().includes(search.toLowerCase()));

  const handleEnroll = (id: string) => {
    setUserEnrolls((prev) => [...prev, id]);
    setSelectedEvent(null);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedData = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="px-1 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold">Event Kampus</h1>
          <Input type="text" placeholder="Cari event..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="md:rounded-md md:border md:overflow-x-auto">
            <table className="min-w-full text-sm border-collapse hidden sm:table">
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
                        {isEnrolled ? (
                          <Link href={`/event/${event.id}`}>
                            <Button size="sm" variant="outline">
                              Detail
                            </Button>
                          </Link>
                        ) : (
                          <Button size="sm" onClick={() => setSelectedEvent(event)}>
                            Enroll
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* MOBILE VERSION */}
            <div className="sm:hidden space-y-4">
              {paginatedData.map((event) => {
                const tanggal = new Date(event.tanggal);
                const isEnrolled = userEnrolls.includes(event.id);
                const kuotaTersisa = event.kuota - userEnrolls.filter((e) => e === event.id).length;

                return (
                  <div key={event.id} className="border rounded-md p-4 shadow-sm bg-white dark:bg-gray-900">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-500">Jenis</span>
                      <Badge className={getJenisBadgeColor(event.jenis)}>{event.jenis}</Badge>
                    </div>
                    <div className="text-base font-medium text-gray-800 dark:text-white mb-3 sm:mb-2">{event.nama}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-1">
                      <strong>Tanggal:</strong> {tanggal.toLocaleDateString("id-ID")} - {tanggal.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-1">
                      <strong>Lokasi:</strong> {event.lokasi}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-1">
                      <strong>Kuota:</strong> {kuotaTersisa}/{event.kuota}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-3">
                      <strong>Status:</strong> {isEnrolled ? <Badge className="bg-green-100 text-green-700">Sudah Enroll</Badge> : <Badge className="bg-gray-100 text-gray-600">Belum Enroll</Badge>}
                    </div>
                    <div>
                      {isEnrolled ? (
                        <Link href={`/event/${event.id}`}>
                          <Button size="sm" variant="outline" className="w-full">
                            Detail
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" className="w-full" onClick={() => setSelectedEvent(event)}>
                          Enroll
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      {/* Modal Enroll */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Konfirmasi Enroll</h2>
            <p>
              <strong>Nama:</strong> {selectedEvent.nama}
            </p>
            <p>
              <strong>Jenis:</strong> {selectedEvent.jenis}
            </p>
            <p>
              <strong>Tanggal:</strong> {new Date(selectedEvent.tanggal).toLocaleString("id-ID")}
            </p>
            <p>
              <strong>Lokasi:</strong> {selectedEvent.lokasi}
            </p>
            <p>
              <strong>Kuota tersedia:</strong> {selectedEvent.kuota - userEnrolls.filter((e) => e === selectedEvent.id).length}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Batal
              </Button>
              <Button size="sm" onClick={() => handleEnroll(selectedEvent.id)}>
                Konfirmasi Enroll
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
