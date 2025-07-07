"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import rawData from "./data.json";

type ClassItem = {
  id: number;
  namaKelas: string;
  kodeKelas: string;
  dosen: string;
  semester: string;
  status: "Tidak Ada Tugas" | "Quiz" | "Materi Baru";
};

const dataKelas: ClassItem[] = rawData as ClassItem[];

export default function MyClassesPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredKelas = dataKelas.filter((kelas) => kelas.namaKelas.toLowerCase().includes(search.toLowerCase()) || kelas.kodeKelas.toLowerCase().includes(search.toLowerCase()));

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Tidak Ada Tugas":
        return "bg-green-100 text-green-700";
      case "Quiz":
        return "bg-yellow-100 text-yellow-700";
      case "Materi Baru":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="px-4 lg:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Kelas Sedang Berjalan</h1>
        <Input type="text" placeholder="Cari kelas atau kode..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredKelas.length > 0 ? (
          filteredKelas.map((kelas, index) => (
            <Card key={index} className="p-3 hover:shadow transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{kelas.namaKelas}</h3>
                      <p className="text-xs text-muted-foreground">{kelas.kodeKelas}</p>
                    </div>
                    <Badge className={`${getBadgeColor(kelas.status)} text-xs`}>{kelas.status}</Badge>
                  </div>
                  <p className="text-sm">
                    <strong>Dosen:</strong> {kelas.dosen}
                  </p>
                  <p className="text-sm">
                    <strong>Semester:</strong> {kelas.semester}
                  </p>
                  <div className="pt-2">
                    <Button size="sm" variant="outline" onClick={() => router.push(`/kelas-saya/${kelas.id}`)}>
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">Tidak ada kelas ditemukan.</p>
        )}
      </div>
    </div>
  );
}
