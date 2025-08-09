"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast, { Toaster } from "react-hot-toast";
import { IconCircleCheck, IconClipboardCheck, IconPhotoCircle } from "@tabler/icons-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import SectionHeader from "@/components/font/headerSectionText";
import { IconEdit, IconX } from "@tabler/icons-react";

type Mahasiswa = {
  id: number;
  nim: string;
  nama: string;
  angkatan: string;
  jurusan: string;
  email: string;
  isActive: boolean;
  fotoUrl?: string;
  fakultas?: string;
  konsentrasi?: string;
  goldar?: string;
  agama?: string;
  alamat?: string;
  telp?: string;
  asalSekolah?: string;
  jalurMasuk?: string;
  tahunMasuk?: string;
  tanggalMasuk?: string;
  dosenWali: {
    nip: string;
    nama: string;
    email: string;
    kontak: string;
  };
};

export default function MahasiswaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/data/mahasiswa/${id}`);
        if (!res.ok) throw new Error("Gagal fetch data");

        const data: Mahasiswa = await res.json();
        setMahasiswa(data);
        setIsActive(data.isActive);
      } catch (error) {
        console.error(error);
        setMahasiswa(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMahasiswa();
  }, [id]);

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    setMahasiswa((prev) => (prev ? { ...prev, isActive: checked } : prev));
    toast.success(`Status mahasiswa diubah menjadi ${checked ? "Aktif" : "Tidak Aktif"}`);
  };

  const handleSaveChanges = async () => {
    if (!mahasiswa) return;

    try {
      const res = await fetch(`/api/data/mahasiswa/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mahasiswa),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal update data");
      }

      const updatedData = await res.json();
      setMahasiswa(updatedData);
      setIsActive(updatedData.isActive);
      toast.success("Perubahan berhasil disimpan.");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      toast.error(`Gagal menyimpan perubahan: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Memuat data...</div>;
  }

  if (!mahasiswa) {
    return (
      <div className="px-6 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Data mahasiswa tidak ditemukan</h2>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const tahunOptions = [];
  for (let y = 2018; y <= currentYear; y++) {
    tahunOptions.push(y.toString());
  }

  return (
    <div className="space-y-3 px-1 md:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <SectionHeader title="Data Mahasiswa" description="Kelola informasi mahasiswa aktif dan nonaktif." />
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
          <TabsTrigger value="perwalian">Perwalian</TabsTrigger>
          <TabsTrigger value="akademik">Riwayat Akademik</TabsTrigger>
          <TabsTrigger value="organisasi">Organisasi</TabsTrigger>
        </TabsList>

        {/* General Info */}
        <TabsContent value="general">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>NIM</Label>
                    <Input value={mahasiswa.nim} disabled />
                  </div>
                  <div className="space-y-1">
                    <Label>Nama Lengkap</Label>
                    <Input value={mahasiswa.nama} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, nama: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="grid grid-cols-9 gap-4 items-end">
                    <div className="col-span-12 sm:col-span-3 space-y-1">
                      <Label htmlFor="angkatan">Angkatan</Label>
                      <Select value={mahasiswa.angkatan} onValueChange={(value) => setMahasiswa((prev) => (prev ? { ...prev, angkatan: value } : prev))} disabled={!isEditing}>
                        <SelectTrigger id="angkatan" className="w-full">
                          <SelectValue placeholder="Pilih tahun angkatan" />
                        </SelectTrigger>
                        <SelectContent>
                          {tahunOptions.map((tahun) => (
                            <SelectItem key={tahun} value={tahun}>
                              {tahun}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-12 sm:col-span-6 space-y-1">
                      <Label htmlFor="jurusan">Jurusan</Label>
                      <Select value={mahasiswa.jurusan} onValueChange={(value) => setMahasiswa((prev) => (prev ? { ...prev, jurusan: value } : prev))} disabled={!isEditing}>
                        <SelectTrigger id="jurusan" className="w-full">
                          <SelectValue placeholder="Pilih jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                          <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                          <SelectItem value="Teknik Mesin">Teknik Mesin</SelectItem>
                          <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                          <SelectItem value="Teknik Kimia">Teknik Kimia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="fakultas">Fakultas</Label>
                    <Select value={mahasiswa.fakultas ?? ""} onValueChange={(value) => setMahasiswa((prev) => (prev ? { ...prev, fakultas: value } : prev))} disabled={!isEditing}>
                      <SelectTrigger id="fakultas" className="w-full">
                        <SelectValue placeholder="Pilih fakultas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fakultas Teknik">Fakultas Teknik</SelectItem>
                        <SelectItem value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 col-span-full">
                    <Label>Email</Label>
                    <Input value={mahasiswa.email} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, email: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="agama">Agama</Label>
                    <Select value={mahasiswa.agama ?? ""} onValueChange={(value) => setMahasiswa((prev) => (prev ? { ...prev, agama: value } : prev))} disabled={!isEditing}>
                      <SelectTrigger id="agama" className="w-full">
                        <SelectValue placeholder="Pilih agama" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Kristen">Kristen</SelectItem>
                        <SelectItem value="Katolik">Katolik</SelectItem>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Buddha">Buddha</SelectItem>
                        <SelectItem value="Konghucu">Konghucu</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label>Nomor Telepon</Label>
                    <Input value={mahasiswa.telp ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, telp: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="space-y-1 col-span-full">
                    <Label>Alamat Rumah</Label>
                    <Input value={mahasiswa.alamat ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, alamat: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="col-span-full flex items-center gap-3 mt-1">
                    <Switch id="isActive" checked={isActive} onCheckedChange={handleToggleActive} disabled={!isEditing} />
                    <Label htmlFor="isActive" className="cursor-pointer text-sm">
                      Status Aktif
                    </Label>
                  </div>
                </div>
                <div className="md:col-span-3 flex flex-col items-center gap-3">
                  {mahasiswa.fotoUrl ? (
                    <img src={mahasiswa.fotoUrl} alt="Foto Mahasiswa" className="w-[160px] h-[190px] object-cover rounded border shadow-sm" />
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perwalian */}
        <TabsContent value="perwalian">
          <Card>
            <CardContent>
              {/* Data Dosen Wali */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <Label>NIP</Label>
                  <Input value={mahasiswa.dosenWali.nip ?? ""} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, nip: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label>Nama Dosen Wali</Label>
                  <Input value={mahasiswa.dosenWali.nama} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, nama: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input value={mahasiswa.dosenWali.email} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, email: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label>Kontak</Label>
                  <Input value={mahasiswa.dosenWali.kontak} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, kontak: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
              </div>

              {/* Status Perwalian */}
              <div>
                <h3 className="font-semibold mb-2">Kontrak Kuliah</h3>
                <p>Sudah melakukan kontrak kuliah semester genap 2024/2025</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-semibold flex items-center gap-1">
                    Persetujuan KRS:
                    <IconCircleCheck className="w-5 h-5 text-green-600" />
                    <span className="text-green-700">Disetujui</span>
                    <small className="text-gray-500 text-xs ml-2 italic">19 Juli 2025 14:34</small>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Riwayat Akademik */}
        <TabsContent value="akademik">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <Label>Asal Sekolah Menengah Atas</Label>
                  <Input value={mahasiswa.asalSekolah ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, asalSekolah: e.target.value })} disabled={!isEditing} placeholder="Masukkan asal sekolah" />
                </div>

                <div className="space-y-1">
                  <Label>Jalur Masuk</Label>
                  <Input value={mahasiswa.jalurMasuk ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, jalurMasuk: e.target.value })} disabled={!isEditing} placeholder="Masukkan jalur masuk (misal: UTBK)" />
                </div>

                <div>
                  <Label>Tahun Masuk Kuliah</Label>
                  <p className="mt-1 text-gray-600">{mahasiswa.tahunMasuk ?? "2023"}</p>
                </div>

                <div>
                  <Label>Tanggal Masuk Kuliah</Label>
                  <p className="mt-1 text-gray-600">{mahasiswa.tanggalMasuk ?? "5 September 2023"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organisasi */}
        <TabsContent value="organisasi">
          <Card>
            <CardContent>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                <li>BEM (Badan Eksekutif Mahasiswa) 2025</li>
                <li>Himpunan Mahasiswa Teknik Informatika (HMTI) 2025</li>
                <li>UKM Pecinta Alam</li>
                <li>Kelompok Studi Mahasiswa</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
