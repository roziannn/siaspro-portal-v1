"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconFileText, IconDownload, IconArrowLeft } from "@tabler/icons-react";

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
}

const dummyData = [
  {
    tipe: "skripsi",
    nim: "20201001",
    nama: "Aulia Rahma",
    judul: "Penerapan Machine Learning untuk Prediksi Cuaca",
    dosenPembimbing: "Dr. Siti Nurhaliza",
    status: "Aktif",
    progres: "Bab 2",
    attachments: [
      {
        id: "1",
        filename: "Bab_1_Introduction.pdf",
        filetype: "pdf",
        url: "/uploads/bab_1_intro.pdf",
      },
      {
        id: "2",
        filename: "DataSet_Description.xlsx",
        filetype: "excel",
        url: "/uploads/dataset_description.xlsx",
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
    <div className="px-2 lg:px-6">
      <Button variant="ghost" onClick={() => history.back()} className="flex items-center gap-2">
        <IconArrowLeft size={20} />
        Kembali
      </Button>

      <h1 className="text-3xl font-bold capitalize mb-4">Detail Bimbingan {tipe.replace("-", " ")}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{data.nama}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>NIM:</strong> <span className="text-gray-700">{data.nim}</span>
          </div>
          {data.judul && (
            <div>
              <strong>Judul:</strong> <span className="text-gray-700">{data.judul}</span>
            </div>
          )}
          {data.tempatMagang && (
            <div>
              <strong>Tempat Magang:</strong> <span className="text-gray-700">{data.tempatMagang}</span>
            </div>
          )}
          <div>
            <strong>Dosen Pembimbing:</strong> <span className="text-gray-700">{data.dosenPembimbing}</span>
          </div>
          <div>
            <strong>Progres:</strong> <span className="text-gray-700">{data.progres}</span>
          </div>
          <div>
            <Badge variant={data.status === "Aktif" ? "default" : "secondary"}>{data.status}</Badge>
          </div>

          {/* Attachment preview */}
          <div>
            <strong>Lampiran / Dokumen Mahasiswa:</strong>
            {data.attachments && data.attachments.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {data.attachments.map((file) => (
                  <li key={file.id} className="flex items-center gap-3 border rounded px-3 py-2 hover:bg-gray-50 transition cursor-pointer" onClick={() => window.open(file.url, "_blank")} title="Klik untuk preview/download">
                    {iconByFiletype(file.filetype)}
                    <span className="text-blue-600 underline">{file.filename}</span>
                    <IconDownload size={18} className="ml-auto text-gray-400" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-500 mt-1">Belum ada lampiran.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
