"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { IconQuestionMark } from "@tabler/icons-react";

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
  // Tambah data lainnya jika perlu
];

const ITEMS_PER_PAGE = 5;

export default function PembayaranPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const filtered = riwayatPembayaran.filter((item) => item.semester.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="px-1 lg:px-6 w-full space-y-6">
      {/* Informasi Pembayaran */}
      <Card>
        <CardHeader className="flex justify-between items-center gap-4">
          <CardTitle className="text-lg">Informasi Pembayaran UKT</CardTitle>
          <Button variant="outline" onClick={() => setShowModal(true)} className="whitespace-nowrap">
            <IconQuestionMark /> Cara Pembayaran
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Informasi Mahasiswa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm border-b pb-4 border-muted">
            {/* Kolom Kiri: Nama, NIM, Fakultas, Prodi */}
            <div className="space-y-2">
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Nama</p>
                <p>{pembayaranMahasiswa.nama}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">NIM</p>
                <p>{pembayaranMahasiswa.nim}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Fakultas</p>
                <p>{pembayaranMahasiswa.fakultas}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Prodi</p>
                <p>{pembayaranMahasiswa.prodi}</p>
              </div>
            </div>

            {/* Kolom Kanan: Tahun Ajar, Semester, Total Biaya */}
            <div className="space-y-2">
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Tahun Ajar</p>
                <p>{pembayaranMahasiswa.tahunAjar}</p>
              </div>
              <div className="flex gap-x-4">
                <p className="w-40 font-medium text-muted-foreground">Semester</p>
                <p>{pembayaranMahasiswa.semester}</p>
              </div>
              <div className="flex gap-x-4 pt-4 border-t border-muted">
                <p className="w-40 font-medium text-muted-foreground">Total Biaya</p>
                <p className="text-lg font-semibold">Rp {pembayaranMahasiswa.totalBiaya.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
              onClick={() => setShowModal(false)} // klik luar modal tutup
            >
              <div
                className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full shadow-xl"
                onClick={(e) => e.stopPropagation()} // cegah klik di modal menutup
              >
                <h2 className="text-lg font-semibold mb-4">Cara Pembayaran UKT</h2>
                <p className="mb-4 text-sm">Silakan transfer biaya UKT ke salah satu rekening universitas berikut sesuai dengan bank pilihan Anda:</p>
                <table className="w-full text-sm mb-4 border-collapse border border-gray-300 dark:border-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-1 text-left">Bank</th>
                      <th colSpan={2} className="border border-gray-300 dark:border-gray-700 px-3 py-1 text-left">
                        Nomor Rekening
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">Bank BNI</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">1234567890</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">Bank BCA</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">0987654321</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">Bank Mandiri</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-3 py-1">1122334455</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mb-4">
                  <p className="font-semibold">Kode Bayar:</p>
                  <div className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded font-mono select-all">20240707012345</div>
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
        </CardContent>
      </Card>

      {/* Riwayat Pembayaran */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-lg">Riwayat Pembayaran</CardTitle>
            <Input
              placeholder="Cari semester..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-auto rounded-md border">
            <table className="w-full text-sm min-w-[600px] border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-3 text-left">Tanggal</th>
                  <th className="p-3 text-left">Semester</th>
                  <th className="p-3 text-left">Jumlah</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3">{item.semester}</td>
                      <td className="p-3">Rp {item.jumlah.toLocaleString("id-ID")}</td>
                      <td className="p-3">
                        {item.status === "Terverifikasi" ? (
                          <Badge className="flex items-center gap-1 p-1 bg-green-500 text-white">
                            <CheckCircle2 size={14} />
                            Terverifikasi
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Belum Verifikasi</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-4">
                      Tidak ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
