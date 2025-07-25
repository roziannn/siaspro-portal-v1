"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IconEye } from "@tabler/icons-react";

type Props = {
  params: {
    tipe: string;
  };
};

export default function BimbinganDetailPage({ params }: Props) {
  const { tipe } = params;

  const titleMap: Record<string, string> = {
    "magang-mandiri": "Bimbingan Magang Mandiri",
    "praktik-industri": "Bimbingan Praktik Industri",
    skripsi: "Bimbingan Skripsi / Tugas Akhir",
  };

  const isValid = Object.keys(titleMap).includes(tipe);

  if (!isValid) {
    notFound();
  }

  const magangData = [
    { nama: "Aulia Rahma", nim: "20201001", topik: "Web Dev di Startup", status: "Aktif" },
    { nama: "Bayu Saputra", nim: "20201002", topik: "Data Analyst", status: "Aktif" },
  ];

  const industriData = [
    { nama: "Citra Ayu", nim: "20201011", topik: "IoT di Manufaktur", status: "Berjalan" },
    { nama: "Dede Firmansyah", nim: "20201012", topik: "DevOps Tools", status: "Berjalan" },
  ];

  const skripsiData = [
    { nama: "Eka Prasetya", nim: "20201021", topik: "Machine Learning", status: "Aktif" },
    { nama: "Fira Lestari", nim: "20201022", topik: "UI/UX Evaluasi", status: "Revisi Bab 2" },
  ];

  const renderTable = (data: typeof magangData) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama Mahasiswa</TableHead>
          <TableHead>NIM</TableHead>
          <TableHead>Topik Bimbingan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nama}</TableCell>
            <TableCell>{item.nim}</TableCell>
            <TableCell>{item.topik}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <Link href={`/dosen/bimbingan/${tipe}/${item.nim}`}>
                <Button variant="outline" size="icon">
                  <IconEye className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">{titleMap[tipe]}</h1>

      {tipe === "magang-mandiri" && (
        <>
          <div>Daftar mahasiswa yang sedang melakukan bimbingan magang mandiri.</div>
          {renderTable(magangData)}
        </>
      )}

      {tipe === "praktik-industri" && (
        <>
          <div>Daftar mahasiswa dalam program praktik industri.</div>
          {renderTable(industriData)}
        </>
      )}

      {tipe === "skripsi" && (
        <>
          <div>Daftar mahasiswa bimbingan skripsi atau tugas akhir.</div>
          {renderTable(skripsiData)}
        </>
      )}
    </div>
  );
}
