"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { IconQuestionMark } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const pembayaranMahasiswa = {
  nama: "Firda Rosiana",
  nim: "2021000123",
  fakultas: "Teknologi Informasi",
  prodi: "Sistem Informasi",
  semester: "Genap",
  tahunAjar: "2024/2025",
  totalBiaya: 9860000,
};

const riwayatPembayaran = [
  {
    tanggal: "2024-06-01",
    semester: "2023/2024 Ganjil",
    jumlah: 5500000,
    status: "Terverifikasi",
  },
  {
    tanggal: "2023-12-01",
    semester: "2022/2023 Genap",
    jumlah: 5250000,
    status: "Terverifikasi",
  },
];

export default function PembayaranPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4 px-4 py-3">
      <div className="flex justify-between items-center">
        <SectionHeader title="Informasi Pembayaran UKT" description="Detail pembayaran UKT mahasiswa." />
        <Button variant="outline" onClick={() => setShowModal(true)} className="whitespace-nowrap">
          <IconQuestionMark className="w-4 h-4 mr-2" />
          Cara Pembayaran
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 text-sm pb-5">
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="font-medium w-40">Nama</span>
            <span>{pembayaranMahasiswa.nama}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium w-40">NIM</span>
            <span>{pembayaranMahasiswa.nim}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium w-40">Fakultas</span>
            <span>{pembayaranMahasiswa.fakultas}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium w-40">Prodi</span>
            <span>{pembayaranMahasiswa.prodi}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-4">
            <span className="font-medium w-40">Tahun Ajar</span>
            <span>{pembayaranMahasiswa.tahunAjar}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium w-40">Semester</span>
            <span>{pembayaranMahasiswa.semester}</span>
          </div>
          <div className="flex gap-4 pt-2 border-t border-muted">
            <span className="font-medium w-40">Total Biaya</span>
            <span className="text-lg font-semibold">Rp {pembayaranMahasiswa.totalBiaya.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Cara Pembayaran UKT</h2>
            <p className="mb-4 text-sm">Silakan transfer biaya UKT ke salah satu rekening universitas berikut sesuai dengan bank pilihan Anda:</p>
            <table className="w-full text-sm mb-4 border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border px-3 py-2 text-left">Bank</th>
                  <th className="border px-3 py-2 text-left">Nomor Rekening</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Bank BNI</td>
                  <td className="border px-3 py-2">1234567890</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Bank BCA</td>
                  <td className="border px-3 py-2">0987654321</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Bank Mandiri</td>
                  <td className="border px-3 py-2">1122334455</td>
                </tr>
              </tbody>
            </table>
            <div className="mb-4">
              <p className="font-semibold">Kode Bayar:</p>
              <div className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded font-mono select-all">20240707012345</div>
            </div>
            <ul className="text-sm space-y-1 mb-4 list-decimal pl-4">
              <li>Gunakan kode bayar yang tertera di atas saat melakukan transfer.</li>
              <li>Simpan bukti transfer sebagai bukti pembayaran.</li>
              <li>Verifikasi akan dilakukan otomatis dalam 1x24 jam.</li>
            </ul>
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setShowModal(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <SectionHeader title="Riwayat Pembayaran" description="Daftar riwayat pembayaran mahasiswa." />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riwayatPembayaran.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>{item.semester}</TableCell>
                <TableCell>Rp {item.jumlah.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  {item.status === "Terverifikasi" ? (
                    <Badge className="flex items-center gap-1 p-1 bg-green-500 text-white">
                      <CheckCircle2 size={14} />
                      Terverifikasi
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Belum Verifikasi</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
