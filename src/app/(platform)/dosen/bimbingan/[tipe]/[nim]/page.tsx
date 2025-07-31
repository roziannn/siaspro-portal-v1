"use client";

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { IconFileText, IconDownload } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BimbinganDetailProps {
  params: {
    tipe: string;
    nim: string;
  };
}

interface Attachment {
  id: string;
  filename: string;
  filetype: string;
  url: string;
  submittedAt: string;
  remark: string;
}

const dummyData = [
  {
    tipe: "skripsi",
    nim: "20201001",
    nama: "Aulia Rahma",
    judul: "Penerapan Machine Learning untuk Prediksi Cuaca",
    dosenPembimbing: "Dr. Siti Nurhaliza",
    status: "Sedang Berjalan",
    progres: "Bab 2",
    attachments: [
      {
        id: "1",
        filename: "Bab_1_Introduction.pdf",
        filetype: "pdf",
        url: "/uploads/bab_1_intro.pdf",
        submittedAt: "2025-07-15",
        remark: "Dokumen bab 1 lengkap",
      },
      {
        id: "2",
        filename: "DataSet_Description.xlsx",
        filetype: "excel",
        url: "/uploads/dataset_description.xlsx",
        submittedAt: "2025-07-18",
        remark: "Dataset awal",
      },
    ],
  },
  {
    tipe: "magang-mandiri",
    nim: "20201001",
    nama: "Aulia Rahma",
    tempatMagang: "PT Teknologi Nusantara",
    dosenPembimbing: "Budi Santoso, M.Kom",
    status: "Selesai",
    progres: "Laporan Akhir",
    attachments: [
      {
        id: "3",
        filename: "Laporan_Akhir_Magang.docx",
        filetype: "word",
        url: "/uploads/laporan_akhir_magang.docx",
        submittedAt: "2025-07-30",
        remark: "Final report lengkap",
      },
    ],
  },
];

function iconByFiletype(type: string) {
  switch (type) {
    case "pdf":
      return <IconFileText className="text-red-600" size={20} />;
    case "excel":
      return <IconFileText className="text-green-600" size={20} />;
    case "word":
      return <IconFileText className="text-blue-600" size={20} />;
    default:
      return <IconFileText size={20} />;
  }
}

export default function BimbinganDetailPage({ params }: BimbinganDetailProps) {
  const { tipe, nim } = params;

  const data = dummyData.find((item) => item.tipe === tipe && item.nim === nim);

  if (!data) return notFound();

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title={`Detail Bimbingan ${tipe.replace("-", " ")}`} description={`Informasi lengkap mahasiswa bimbingan dan progresnya`} />
      <div className="overflow-auto hidden sm:block">
        <table className="text-sm table-fixed w-full min-w-[650px]">
          <tbody>
            {data.nama && (
              <tr>
                <td className="py-2 font-medium w-1/8">Nama</td>
                <td className="py-2 w-3/4">{`${data.nama} (${data.nim})`}</td>
              </tr>
            )}
            {data.judul && (
              <tr>
                <td className="py-2 font-medium w-1/8">Judul</td>
                <td className="py-2 w-3/4">{data.judul}</td>
              </tr>
            )}
            {data.tempatMagang && (
              <tr>
                <td className="py-2 font-medium w-1/8">Tempat Magang</td>
                <td className="py-2 w-3/4">{data.tempatMagang}</td>
              </tr>
            )}
            <tr>
              <td className="py-2 font-medium w-1/8">Dosen Pembimbing</td>
              <td className="py-2 w-3/4">{data.dosenPembimbing}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium w-1/8">Status</td>
              <td className="w-3/4">
                <Badge variant={data.status === "Sedang Berjalan" ? "default" : "secondary"}>{data.status}</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 text-sm space-y-2 sm:hidden">
        <Info label="Nama" value={data.nama} />
        <Info label="NIM" value={data.nim} />
        {data.judul && <Info label="Judul" value={data.judul} />}
        {data.tempatMagang && <Info label="Tempat Magang" value={data.tempatMagang} />}
        <Info label="Dosen Pembimbing" value={data.dosenPembimbing} />
        <Info label="Progres" value={data.progres} />
        <Info label="Status" value={<Badge variant={data.status === "Selesai" ? "default" : "secondary"}>{data.status}</Badge>} />
      </div>
      <hr />

      <SectionHeader title="Lampiran / Dokumen Mahasiswa" description="Daftar dokumen yang sudah dikumpulkan mahasiswa" />

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1">No.</TableHead>
              <TableHead>Nama File</TableHead>
              <TableHead>Tanggal Submit</TableHead>
              <TableHead>Remark</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.attachments && data.attachments.length > 0 ? (
              data.attachments.map((file, index) => (
                <TableRow key={file.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.open(file.url, "_blank")} title="Klik untuk preview/download">
                  <TableCell className="flex items-center gap-2">
                    {index + 1} {iconByFiletype(file.filetype)}
                  </TableCell>
                  <TableCell className="text-blue-600 underline">{file.filename}</TableCell>
                  <TableCell>{file.submittedAt}</TableCell>
                  <TableCell>{file.remark}</TableCell>
                  <TableCell className="text-center">
                    <IconDownload size={18} className="inline-block text-gray-600" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center italic text-gray-500">
                  Belum ada lampiran.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
