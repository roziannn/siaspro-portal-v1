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
import SectionHeader from "@/components/font/headerSectionText";
import { IconClipboardCheck, IconEdit, IconPhotoCircle, IconX } from "@tabler/icons-react";

type Dosen = {
  id: string;
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

export default function DosenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [dosen, setDosen] = useState<Dosen | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDosen() {
      try {
        const res = await fetch(`/api/data/dosen/${id}`);
        if (!res.ok) throw new Error("Data dosen tidak ditemukan");
        const dosenData = await res.json();
        setDosen(dosenData);
        if (dosenData.isActive !== undefined) setIsActive(dosenData.isActive);
      } catch (error) {
        toast.error((error as Error).message);
        setDosen(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDosen();
  }, [id]);

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    toast.success(`Status dosen diubah menjadi ${checked ? "Aktif" : "Tidak Aktif"}`);
  };

  const handleSaveChanges = async () => {
    if (!dosen) return;

    try {
      const res = await fetch(`/api/data/dosen/${dosen.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...dosen,
          isActive,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan data dosen");
      }

      const updatedDosen = await res.json();
      setDosen(updatedDosen);
      setIsActive(updatedDosen.isActive);
      toast.success("Perubahan data dosen berhasil disimpan.");
      setIsEditing(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Memuat data...</div>;
  }

  if (!dosen) {
    return (
      <div className="px-6 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Data dosen tidak ditemukan</h2>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    );
  }
  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Dosen" description="Kelola informasi dosen aktif dan nonaktif." />
        <div className="flex gap-2">
          {isEditing && (
            <Button variant="default" onClick={handleSaveChanges}>
              <IconClipboardCheck /> Simpan Perubahan
            </Button>
          )}
          <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing((prev) => !prev)} className="flex items-center gap-2">
            {isEditing ? (
              <>
                <IconX size={18} />
                Batalkan
              </>
            ) : (
              <>
                <IconEdit size={18} />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-1">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="pendidikan">Pendidikan & Jabatan</TabsTrigger>
          <TabsTrigger value="mengajar">Riwayat Mengajar</TabsTrigger>
        </TabsList>

        {/* General Info */}
        <TabsContent value="general">
          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>NIP</Label>
                  <Input value={dosen.nip} disabled />
                </div>
                <div>
                  <Label>Nama</Label>
                  <Input value={dosen.nama} onChange={(e) => setDosen((prev) => prev && { ...prev, nama: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={dosen.email} onChange={(e) => setDosen((prev) => prev && { ...prev, email: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Kontak</Label>
                  <Input value={dosen.kontak} onChange={(e) => setDosen((prev) => prev && { ...prev, kontak: e.target.value })} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Agama</Label>
                  <Input value={dosen.agama ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, agama: e.target.value })} disabled={!isEditing} />
                </div>
                <div className="md:col-span-2">
                  <Label>Alamat Rumah</Label>
                  <Input value={dosen.alamat ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, alamat: e.target.value })} disabled={!isEditing} />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Switch id="isActive" checked={isActive} onCheckedChange={handleToggleActive} disabled={!isEditing} />
                  <Label htmlFor="isActive" className="cursor-pointer text-sm">
                    Status Aktif
                  </Label>
                </div>
              </div>
              <div className="md:col-span-3 flex flex-col items-center gap-3">
                {dosen.fotoUrl ? (
                  <img src={dosen.fotoUrl} alt="Foto Mahasiswa" className="w-[160px] h-[190px] object-cover rounded border shadow-sm" />
                ) : (
                  <div className="w-36 h-46 rounded-sm bg-gray-300 flex items-center justify-center text-gray-500">
                    <IconPhotoCircle className="w-12 h-12" />
                  </div>
                )}

                <div className="flex justify-center w-full">
                  <Button variant="outline" size="sm" disabled={!isEditing}>
                    Ubah Foto
                  </Button>
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
                <Label>Pendidikan Terakhir</Label>
                <Input value={dosen.pendidikanTerakhir ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, pendidikanTerakhir: e.target.value })} disabled={!isEditing} />
              </div>
              <div>
                <Label>Gelar</Label>
                <Input value={dosen.gelar ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, gelar: e.target.value })} disabled={!isEditing} />
              </div>
              <div>
                <Label>Jabatan</Label>
                <Input value={dosen.jabatan ?? ""} onChange={(e) => setDosen((prev) => prev && { ...prev, jabatan: e.target.value })} disabled={!isEditing} />
              </div>
              <div>
                <Label>Pangkat</Label>
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
  );
}
