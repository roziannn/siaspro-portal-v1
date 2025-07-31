"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import dataKRS from "../data.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

function getBadgeVariant(status: string) {
  switch (status) {
    case "Disetujui":
      return "success";
    case "Belum Disetujui":
      return "warning";
    case "Belum Mengajukan":
      return "secondary";
    default:
      return "outline";
  }
}

export default function VerifikasiKRSDetailPage() {
  const params = useParams();
  const { id } = params;

  const data = dataKRS.find((item) => item.id.toString() === id);
  if (!data) return notFound();

  const totalSKS = data.krs?.reduce((sum, mk) => sum + mk.sks, 0) ?? 0;

  const [showAlasan, setShowAlasan] = useState(false);
  const [alasan, setAlasan] = useState("");

  const handleSetujui = () => {
    toast.success("KRS berhasil disetujui.");
  };

  const handleTolak = () => {
    if (alasan.trim() === "") {
      toast.error("Silakan masukkan alasan penolakan.");
      return;
    }
    toast.success("KRS ditolak dengan alasan: " + alasan);
    setShowAlasan(false);
    setAlasan("");
  };

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title="Detail Verifikasi KRS" description="Lihat detail informasi dan mata kuliah yang diajukan mahasiswa." />

      <div className="space-y-4">
        <div className="pb-2">
          {/* Desktop Table */}
          <div className="overflow-auto hidden sm:block">
            <div className="overflow-auto hidden sm:block">
              <table className="text-sm table-fixed w-full min-w-[650px]">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium w-1/8">Nama Mahasiswa</td>
                    <td className="py-2 w-2/6">{data.nama}</td>
                    <td className="py-2 font-medium w-1/8">NIM</td>
                    <td className="py-2 w-2/6">{data.nim}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium w-1/8">Angkatan</td>
                    <td className="py-2 w-2/6">{data.angkatan}</td>
                    <td className="py-2 font-medium w-1/8">Semester</td>
                    <td className="py-2 w-2/6">{data.semester}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium w-1/8">Status KRS</td>
                    <td className="py-2 w-2/6">
                      <Badge variant={getBadgeVariant(data.status)}>{data.status}</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-1 text-sm space-y-2 sm:hidden">
            <Info label="Nama Mahasiswa" value={data.nama} />
            <Info label="NIM" value={data.nim} />
            <Info label="Angkatan" value={data.angkatan} />
            <Info label="Semester" value={data.semester} />
            <Info label="Status KRS" value={<Badge variant={getBadgeVariant(data.status)}>{data.status}</Badge>} />
          </div>
        </div>
        <hr />

        {data.status === "Belum Disetujui" && (data.krs?.length ?? 0) > 0 && (
          <div className="pt-6 space-y-4">
            <p className="text-lg font-semibold">Mata Kuliah yang Diajukan:</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1 text-center">No.</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Mata Kuliah</TableHead>
                  <TableHead>SKS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.krs?.map((mk, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="py-3">{mk.kode}</TableCell>
                    <TableCell className="py-3">{mk.nama}</TableCell>
                    <TableCell className="py-3">{mk.sks}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold text-right">
                    Total SKS
                  </TableCell>
                  <TableCell className="font-bold">{totalSKS}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Alasan Tolak */}
            {showAlasan && (
              <div className="space-y-4 border border-dashed border-red-400 rounded-md p-4 bg-red-50">
                <div>
                  <label htmlFor="alasan" className="text-sm font-medium block mb-2">
                    Alasan Penolakan
                  </label>
                  <Input id="alasan" className="bg-white mb-2" placeholder="Masukkan alasan..." value={alasan} onChange={(e) => setAlasan(e.target.value)} />
                </div>
                <div className="text-right">
                  <Button variant="destructive" onClick={handleTolak}>
                    Konfirmasi Tolak
                  </Button>
                </div>
              </div>
            )}

            {/* Button Aksi */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="default" onClick={handleSetujui}>
                Setujui KRS
              </Button>
              <Button variant="destructive" onClick={() => setShowAlasan(!showAlasan)}>
                {showAlasan ? "Batal" : "Tolak KRS"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 font-medium">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}
