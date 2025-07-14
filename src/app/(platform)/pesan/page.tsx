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
    <div className="px-1 lg:px-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-lg font-semibold">Kotak Pesan</h1>
          <Input placeholder="Cari pesan..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent className="space-y-0 sm:space-y-4">
          {filteredPesan.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Tidak ada pesan.</p>}

          {filteredPesan.map((pesan) => (
            <Link href={`/pesan/${pesan.id}`} key={pesan.id} className="block">
              <div
                className={`
              flex items-center gap-3 sm:gap-4
              p-3 sm:p-4
              cursor-pointer
              ${pesan.status === "Belum dibaca" ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-gray-900"}
              border-b
              hover:bg-blue-100 dark:hover:bg-blue-800
              rounded-none sm:rounded-lg
              mb-3 md:mb-0
            `}
              >
                {/* Avatar */}
                <Avatar className="flex-shrink-0">
                  <AvatarFallback>
                    {pesan.nama
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Isi Pesan */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate leading-snug">{pesan.nama}</p>
                    <Badge className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${pesan.status === "Belum dibaca" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-600 border border-gray-300"}`}>
                      {pesan.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate mb-1 leading-relaxed">{pesan.isi}</p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {new Date(pesan.waktu).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
