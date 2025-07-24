"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast, { Toaster } from "react-hot-toast";

type Dosen = {
  nip: string;
  nama: string;
  email: string;
  kontak: string;
  isActive: boolean;
  fotoUrl?: string;
  pendidikanTerakhir?: string;
  jabatan?: string;
  pangkat?: string;
  gelar?: string;
  riwayatMengajar?: RiwayatMengajar[];
  agama?: string;
  alamat?: string;
};

type RiwayatMengajar = {
  matkul: string;
  tahunAjaran: string;
  semester: string;
};

const dummyDosen: Dosen[] = [
  {
    nip: "198501012020031001",
    nama: "Dr. Budi Santoso",
    email: "budi.santoso@univ.ac.id",
    kontak: "08123456789",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=5",
    pendidikanTerakhir: "S3 - Ilmu Komputer",
    jabatan: "Lektor Kepala",
    pangkat: "IV/a",
    gelar: "Dr.",
    agama: "Islam",
    alamat: "Jl. Merdeka No. 123, Bandung",
    riwayatMengajar: [
      {
        matkul: "Pemrograman Web",
        tahunAjaran: "2023/2024",
        semester: "Genap",
      },
      {
        matkul: "Sistem Basis Data",
        tahunAjaran: "2023/2024",
        semester: "Ganjil",
      },
      {
        matkul: "Manajemen Proyek",
        tahunAjaran: "2022/2023",
        semester: "Genap",
      },
    ],
  },
];

export default function DosenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const nip = params.id;

  const [dosen, setDosen] = useState<Dosen | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const found = dummyDosen.find((d) => d.nip === nip) ?? null;
    setDosen(found);
    if (found) setIsActive(found.isActive);
  }, [nip]);

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    toast.success(`Status dosen diubah menjadi ${checked ? "Aktif" : "Tidak Aktif"}`);
  };

  const handleSaveChanges = () => {
    toast.success("Perubahan data dosen berhasil disimpan.");
    setIsEditing(false);
  };

  if (!dosen) {
    return (
      <div className="px-6 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Data dosen tidak ditemukan</h2>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="px-4 md:px-6">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-lg md:text-xl font-semibold">Data Dosen</CardTitle>
          <div className="flex gap-2">
            {isEditing && (
              <Button variant="default" onClick={handleSaveChanges}>
                Simpan Perubahan
              </Button>
            )}
            <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? "Batal Edit" : "Edit Data"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="pendidikan">Pendidikan & Jabatan</TabsTrigger>
            <TabsTrigger value="mengajar">Riwayat Mengajar</TabsTrigger>
          </TabsList>

          {/* General Info */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Info</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3 flex flex-col items-center gap-3">
                  <img src={dosen.fotoUrl ?? ""} alt="Foto Dosen" className="w-[120px] h-[160px] object-cover rounded border shadow-sm" />
                  <Button variant="outline" size="sm" disabled={!isEditing}>
                    Ubah Foto
                  </Button>
                </div>

                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-full">
                    <h3 className="text-base font-semibold text-muted-foreground mb-2">Biodata Diri</h3>
                  </div>
                  <div>
                    <Label className="mb-3">NIP</Label>
                    <Input value={dosen.nip} disabled />
                  </div>
                  <div>
                    <Label className="mb-3">Nama</Label>
                    <Input value={dosen.nama} onChange={(e) => setDosen((prev) => prev && { ...prev, nama: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label className="mb-3">Email</Label>
                    <Input value={dosen.email} onChange={(e) => setDosen((prev) => prev && { ...prev, email: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label className="mb-3">Kontak</Label>
                    <Input value={dosen.kontak} onChange={(e) => setDosen((prev) => prev && { ...prev, kontak: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label className="mb-3">Agama</Label>
                    <Input value={dosen.agama ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, agama: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-3">Alamat Rumah</Label>
                    <Input value={dosen.alamat ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, alamat: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Switch id="isActive" checked={isActive} onCheckedChange={handleToggleActive} disabled={!isEditing} />
                    <Label htmlFor="isActive" className="cursor-pointer text-sm">
                      Status Aktif
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pendidikan & Jabatan */}
          <TabsContent value="pendidikan">
            <Card>
              <CardHeader>
                <CardTitle>Pendidikan & Jabatan</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-3">Pendidikan Terakhir</Label>
                  <Input value={dosen.pendidikanTerakhir ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, pendidikanTerakhir: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="mb-3">Gelar</Label>
                  <Input value={dosen.gelar ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, gelar: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="mb-3">Jabatan</Label>
                  <Input value={dosen.jabatan ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, jabatan: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label className="mb-3">Pangkat</Label>
                  <Input value={dosen.pangkat ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, pangkat: e.target.value })} disabled={!isEditing} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Riwayat Mengajar */}
          <TabsContent value="mengajar">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Mengajar</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left w-2 text-gray-800 dark:text-gray-100">#</th>
                        <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100">Mata Kuliah</th>
                        <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100">Tahun Ajaran</th>
                        <th className="px-4 py-3 text-left text-gray-800 dark:text-gray-100">Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dosen.riwayatMengajar?.length ? (
                        dosen.riwayatMengajar.map((entry, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">{idx + 1}</td>
                            <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">{entry.matkul}</td>
                            <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">{entry.tahunAjaran}</td>
                            <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">{entry.semester}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-gray-500 dark:text-gray-400">
                            Tidak ada data riwayat mengajar.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
