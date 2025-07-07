"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

import data from "./data.json";

type Pesan = {
  id: number;
  nama: string;
  isi: string;
  waktu: string; // ISO string format
  status: "Belum dibaca" | "Dibaca";
};

const dataPesan: Pesan[] = data.map((item) => ({
  ...item,
  status: item.status as Pesan["status"],
}));

export default function HalamanPesan() {
  const [search, setSearch] = useState("");

  const filteredPesan: Pesan[] = dataPesan.filter((pesan) => `${pesan.nama} ${pesan.isi}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-lg font-semibold">Kotak Pesan</h1>
          <Input placeholder="Cari pesan..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredPesan.map((pesan) => (
            <Link href={`/pesan/${pesan.id}`} key={pesan.id} className="block">
              <div className="flex gap-4 items-start p-4 rounded-lg border hover:shadow-sm bg-white dark:bg-gray-900 transition cursor-pointer">
                {/* Avatar */}
                <Avatar className="mt-1">
                  <AvatarFallback>
                    {pesan.nama
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Isi Pesan */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{pesan.nama}</div>
                    <Badge className={pesan.status === "Belum dibaca" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-600 border border-gray-300"}>{pesan.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{pesan.isi}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(pesan.waktu).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {filteredPesan.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Tidak ada pesan.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
