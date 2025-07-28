"use client";

import { notFound } from "next/navigation";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/font/headerSectionText";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

type Props = {
  params: {
    tipe: string;
    slug: string;
  };
};

const titleMap: Record<string, string> = {
  tugas: "Tugas",
  uts: "Ujian Tengah Semester (UTS)",
  uas: "Ujian Akhir Semester (UAS)",
};

export default function DetailNilaiPage({ params }: Props) {
  const { tipe, slug } = params;

  if (!Object.keys(titleMap).includes(tipe)) {
    notFound();
  }

  const detailData = {
    namaTugas: "Tugas 1",
    mataKuliah: "Pemrograman Web",
    deadline: "31 Jul 2025, 23:59",
    status: "Selesai",
    deskripsi: "Buatkan implementasi REST API menggunakan Express.js sesuai dengan apa yang sudah disimulasikan ketika pertemuan 2",
  };

  const submissions = [
    {
      nama: "Ali",
      waktuSubmit: "24 Jul 2025, 14:30",
      attachment: "ali_tugas1.pdf",
      nilai: 85,
    },
    {
      nama: "Budi",
      waktuSubmit: "01 Aug 2025, 09:12",
      attachment: "budi_tugas1.pdf",
      nilai: 90,
    },
  ];

  function isLate(submitTime: string, deadline: string): boolean {
    return new Date(submitTime) > new Date(deadline);
  }

  return (
    <div className="space-y-6 px-4 py-3">
      <div className="md:col-span-8 space-y-4">
        {/* Desktop Table */}
        <div className="pb-2">
          <div className="overflow-auto hidden sm:block">
            <SectionHeader title={`${detailData.namaTugas}`} description={`${detailData.mataKuliah}`} />
            <div className="overflow-auto hidden sm:block">
              <table className="text-sm table-fixed w-full min-w-[650px]">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium w-1/8">Nama Tugas</td>
                    <td className="py-2 w-2/6">{detailData.namaTugas}</td>
                    <td className="py-2 font-medium w-1/8">Deadline</td>
                    <td className="py-2 w-2/6">{detailData.deadline}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium w-1/8">Status</td>
                    <td className="py-2 w-2/6">{detailData.status}</td>
                    <td className="py-2 font-medium w-1/8">Deskripsi</td>
                    <td className="py-2 w-2/6 break-words pr-3">{detailData.deskripsi}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-1 text-sm space-y-2 sm:hidden">
            <Info label="Nama Tugas" value={detailData.namaTugas} />
            <Info label="Mata Kuliah" value={detailData.mataKuliah} />
            <Info label="Deadline" value={detailData.deadline} />
            <Info label="Status" value={detailData.status} />
            <Info label="Deskripsi" value={detailData.deskripsi} />
          </div>
        </div>
        <hr />
      </div>

      <div className="space-y-2">
        <SectionHeader title={`Pengumpulan Tugas`} description={`Mahasiswa/i yang telah menyerahkan tugas`} className="pb-0.5" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">No.</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Waktu Submit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.waktuSubmit}</TableCell>
                <TableCell>{isLate(item.waktuSubmit, detailData.deadline) ? <Badge variant="destructive">Overdue</Badge> : <Badge variant="success">On time</Badge>}</TableCell>

                <TableCell>
                  <a href={`#`} className="text-blue-600 underline" target="_blank">
                    {item.attachment}
                  </a>
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={item.nilai} className="w-20" />
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => toast.success(`Nilai ${item.nama} berhasil disimpan`)}>
                    Simpan
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-28 font-medium">{label}</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}
