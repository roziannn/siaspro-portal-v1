"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type TugasDetail = {
  id: string;
  judul: string;
  deadline: string;
  deskripsi: string;
  score?: number;
};

const tugasData: TugasDetail[] = [
  {
    id: "1",
    judul: "Frontend Pemrograman Web",
    deadline: "2025-07-10",
    deskripsi: "Kerjakan aplikasi web sederhana menggunakan React.",
  },
  {
    id: "2",
    judul: "Struktur Data Tugas 3",
    deadline: "2025-07-12",
    deskripsi: "Implementasikan algoritma sorting dan searching.",
    score: 85,
  },
  {
    id: "3",
    judul: "Pertemuan Basis Data",
    deadline: "2025-07-15",
    deskripsi: "Buat query SQL untuk laporan penjualan.",
  },
];

export default function TugasDetailPage() {
  const params = useParams();
  const tugasId = params?.id;

  // Cari tugas sesuai id
  const tugas = tugasData.find((t) => t.id === tugasId);

  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  if (!tugas) return <div className="p-6">Tugas tidak ditemukan.</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Silakan pilih file untuk diupload.");
      return;
    }
    // Simulasi upload file dan notes (ganti dengan API nyata)
    setUploadStatus("Uploading...");
    setTimeout(() => {
      setUploadStatus("Upload berhasil!");
      setFile(null);
      setNotes("");
    }, 1500);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">{tugas.judul}</h1>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Deadline:</strong> {new Date(tugas.deadline).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
      </p>
      <p className="text-gray-800 dark:text-gray-100">{tugas.deskripsi}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fileUpload" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Upload Jawaban (PDF, DOC, JPG, PNG)
          </label>
          <input type="file" id="fileUpload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="block w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          {file && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              File dipilih: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Tambahkan catatan untuk dosen (misal keterangan, kendala, dll)"
            className="block w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <Button type="submit" disabled={!file}>
          Upload Jawaban
        </Button>
      </form>

      {uploadStatus && <p className={`mt-2 text-sm ${uploadStatus === "Upload berhasil!" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{uploadStatus}</p>}

      {tugas.score !== undefined && (
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900 rounded-md">
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">
            Score Anda: <span className="text-2xl">{tugas.score}</span>
          </p>
        </div>
      )}
    </div>
  );
}
