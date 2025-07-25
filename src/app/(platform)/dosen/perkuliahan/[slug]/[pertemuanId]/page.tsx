"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconUpload, IconDownload, IconUserCheck, IconPencil } from "@tabler/icons-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeader from "@/components/font/headerSectionText";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";

const mahasiswaDummy = [
  { id: 1, nim: "123456789", nama: "Ahmad Rasyid" },
  { id: 2, nim: "987654321", nama: "Siti Aminah" },
  { id: 3, nim: "456123789", nama: "Budi Santoso" },
];

export default function DetailPertemuanPage() {
  const { id: idJadwal, topikId: idTopik } = useParams();
  const [editDeskripsi, setEditDeskripsi] = useState(false);
  const [deskripsi, setDeskripsi] = useState("Mempelajari penggunaan API dan integrasi sistem.");
  const [modulFile, setModulFile] = useState<File | null>(null);
  const [jenisTugas, setJenisTugas] = useState("");
  const [tugas, setTugas] = useState<{
    judul: string;
    deskripsi: string;
    jenis: string;
    file: File | null;
  } | null>(null);

  const [absensi, setAbsensi] = useState(
    mahasiswaDummy.map((mhs) => ({
      ...mhs,
      hadir: false,
      keterangan: "",
    }))
  );

  const handleCheckboxChange = (index: number) => {
    const updated = [...absensi];
    updated[index].hadir = !updated[index].hadir;
    setAbsensi(updated);
  };

  const handleKeteranganChange = (index: number, value: string) => {
    const updated = [...absensi];
    updated[index].keterangan = value;
    setAbsensi(updated);
  };

  const handleModulUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setModulFile(file);
      toast.success("Modul berhasil diunggah ulang.");
    }
  };

  const handleUploadTugas = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const judul = form.judul.value;
    const deskripsi = form.deskripsi.value;
    const file = form.file.files[0];

    if (judul && deskripsi && jenisTugas && file) {
      setTugas({ judul, deskripsi, jenis: jenisTugas, file });
      toast.success("Tugas berhasil diunggah!");
      form.reset();
      setJenisTugas("");
    } else {
      toast.error("Mohon lengkapi semua bidang tugas.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6 px-4 py-3">
        <SectionHeader title="Pengenalan React" description="Pemrograman Web Lanjutan" />
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <strong>Deskripsi:</strong>
            {editDeskripsi ? (
              <Input
                className="w-full max-w-md"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                onBlur={() => {
                  setEditDeskripsi(false);
                  toast.success("Deskripsi berhasil diperbarui!");
                }}
                autoFocus
              />
            ) : (
              <span className="ml-2">{deskripsi}</span>
            )}
            {!editDeskripsi && (
              <button onClick={() => setEditDeskripsi(true)}>
                <IconPencil size={18} className="text-gray-500 hover:text-blue-600" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Modul */}
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Modul / Lampiran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <IconDownload size={20} className="text-blue-600" />
                <a href={modulFile ? URL.createObjectURL(modulFile) : "/files/modul-topik.pdf"} download className="text-blue-600 hover:underline">
                  {modulFile ? modulFile.name : "Download Modul Topik.pdf"}
                </a>
              </div>
              <Input type="file" accept=".pdf" onChange={handleModulUpload} />
            </CardContent>
          </Card>

          {/* Tugas */}
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Tugas Pertemuan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tugas ? (
                <div className="space-y-2">
                  <p>
                    <strong>Jenis:</strong> {tugas.jenis}
                  </p>
                  <p>
                    <strong>Judul:</strong> {tugas.judul}
                  </p>
                  <p>
                    <strong>Deskripsi:</strong> {tugas.deskripsi}
                  </p>
                  <p>
                    <strong>File:</strong>{" "}
                    <a href={URL.createObjectURL(tugas.file!)} className="text-blue-600 hover:underline" download>
                      {tugas.file?.name}
                    </a>
                  </p>
                  <Link href={`/jadwal/${idJadwal}/topik/${idTopik}/penilaian`} className="text-blue-600 hover:underline block mt-2">
                    Lihat Penilaian Tugas
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleUploadTugas} className="space-y-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                      <Label className="mb-3" htmlFor="jenis">
                        Jenis Tugas
                      </Label>
                      <Select onValueChange={(value) => setJenisTugas(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Jenis Tugas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tugas">Tugas/Kuis</SelectItem>
                          <SelectItem value="uts">UTS</SelectItem>
                          <SelectItem value="uas">UAS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <Label className="mb-3" htmlFor="judul">
                        Judul Tugas
                      </Label>
                      <Input id="judul" name="judul" placeholder="Contoh: Tugas API Integration" required />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3" htmlFor="deskripsi">
                      Deskripsi
                    </Label>
                    <Input id="deskripsi" name="deskripsi" placeholder="Deskripsi tugas..." required />
                  </div>
                  <div>
                    <Label className="mb-3" htmlFor="file">
                      File Tugas
                    </Label>
                    <Input id="file" name="file" type="file" accept=".pdf,.docx" required />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="flex items-center gap-2">
                      <IconUpload size={18} /> Unggah Tugas
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Absensi */}
        <Card>
          <CardHeader>
            <CardTitle>Absensi Kehadiran Mahasiswa</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1">No.</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Hadir</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {absensi.map((mhs, index) => (
                  <TableRow key={mhs.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{mhs.nim}</TableCell>
                    <TableCell>{mhs.nama}</TableCell>
                    <TableCell>
                      <Checkbox checked={mhs.hadir} onCheckedChange={() => handleCheckboxChange(index)} />
                    </TableCell>
                    <TableCell>
                      <Input value={mhs.keterangan} onChange={(e) => handleKeteranganChange(index, e.target.value)} placeholder="Isi jika perlu" className="w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-end">
            <Button className="flex gap-2 items-center">
              <IconUserCheck size={18} /> Simpan Absensi
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
