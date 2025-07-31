"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/font/headerSectionText";
import toast from "react-hot-toast";

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
      toast.error("Silakan pilih file untuk diupload.");
      return;
    }

    setUploadStatus("Uploading...");
    toast.loading("Mengunggah jawaban...");

    setTimeout(() => {
      setUploadStatus("Upload berhasil!");
      toast.dismiss();
      toast.success("Jawaban berhasil diupload!");
      setFile(null);
      setNotes("");
    }, 1500);
  };

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <SectionHeader title={tugas.judul} description="Silakan unggah jawaban Anda sebelum deadline yang ditentukan." />

      <div className="space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Deadline:</strong>{" "}
          {new Date(tugas.deadline).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-800 dark:text-gray-100">{tugas.deskripsi}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fileUpload" className="block font-semibold text-gray-700 dark:text-gray-200">
            Upload Jawaban (PDF, DOC, JPG, PNG)
          </label>
          <input type="file" id="fileUpload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="block w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm" />
          <div className="flex justify-between">
            {file && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                File dipilih: <span className="font-medium">{file.name}</span>
              </p>
            )}
            {/* {uploadStatus && <p className={`mt-2 text-sm ${uploadStatus === "Upload berhasil!" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{uploadStatus}</p>} */}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Tambahkan catatan untuk dosen (misal keterangan, kendala, dll)"
            className="block w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="text-end">
          <Button type="submit" disabled={!file}>
            Upload Jawaban
          </Button>
        </div>
      </form>

      {tugas.score !== undefined && (
        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900 rounded-md shadow">
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">
            Nilai Anda: <span className="text-2xl font-bold">{tugas.score}</span>
          </p>
        </div>
      )}
    </div>
  );
}
