"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast, { Toaster } from "react-hot-toast";
import { IconCircleCheck } from "@tabler/icons-react";
import SectionHeader from "@/components/font/headerSectionText";

type Mahasiswa = {
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

const dummyData: Mahasiswa[] = [
  {
    nim: "230101",
    nama: "Andi Saputra",
    angkatan: "2023",
    jurusan: "Teknik Informatika",
    email: "andi@example.com",
    isActive: true,
    fotoUrl: "https://i.pravatar.cc/100?img=1",
    fakultas: "Teknik",
    goldar: "A",
    alamat: "Jl Cipeteraya Dipatiukur No 24, Kota Bandung",
    telp: "087177881898",
    konsentrasi: "Software Engineering",
    asalSekolah: "SMA Negeri 1 Bandung",
    jalurMasuk: "UTBK",
    tahunMasuk: "2023",
    tanggalMasuk: "5 September 2023",
    dosenWali: {
      nip: "1111910100",
      nama: "Dr. Budi Santoso",
      email: "budi.santoso@univ.ac.id",
      kontak: "08123456789",
    },
  },
];

export default function MahasiswaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const nim = params.id;

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const found = dummyData.find((m) => m.nim === nim) ?? null;
    setMahasiswa(found);
    if (found) setIsActive(found.isActive);
  }, [nim]);

  const handleToggleActive = (checked: boolean) => {
    setIsActive(checked);
    toast.success(`Status mahasiswa diubah menjadi ${checked ? "Aktif" : "Tidak Aktif"}`);
  };

  const handleSaveChanges = () => {
    toast.success("Perubahan berhasil disimpan.");
    setIsEditing(false);
  };

  if (!mahasiswa) {
    return (
      <div className="px-6 py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Data mahasiswa tidak ditemukan</h2>
        <Button onClick={() => router.back()}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <div className="flex items-center justify-between gap-2 mt-4">
        <SectionHeader title="Data Mahasiswa" description="Kelola informasi mahasiswa aktif dan nonaktif." />
        {isEditing && (
          <Button variant="default" onClick={handleSaveChanges}>
            Simpan Perubahan
          </Button>
        )}
        <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Batal Edit" : "Edit Data"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Info</TabsTrigger>
          <TabsTrigger value="perwalian">Perwalian</TabsTrigger>
          <TabsTrigger value="akademik">Riwayat Akademik</TabsTrigger>
          <TabsTrigger value="organisasi">Organisasi</TabsTrigger>
        </TabsList>

        {/* General Info */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3 flex flex-col items-center gap-3">
                  <img src={mahasiswa.fotoUrl ?? "https://i.pravatar.cc/100?img=65"} alt="Foto Mahasiswa" className="w-[120px] h-[160px] object-cover rounded border shadow-sm" />
                  <div className="flex justify-center w-full">
                    <Button variant="outline" size="sm" disabled={!isEditing}>
                      Ubah Foto
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-full">
                    <h3 className="text-base font-semibold text-muted-foreground mb-2">Biodata Diri</h3>
                  </div>

                  <div className="space-y-1">
                    <Label className="mb-3">NIM</Label>
                    <Input value={mahasiswa.nim} disabled />
                  </div>
                  <div className="space-y-1">
                    <Label className="mb-3">Nama Lengkap</Label>
                    <Input value={mahasiswa.nama} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, nama: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div className="space-y-1">
                    <Label className="mb-3">Angkatan</Label>
                    <Input value={mahasiswa.angkatan} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, angkatan: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div className="space-y-1">
                    <Label className="mb-3">Jurusan</Label>
                    <Input value={mahasiswa.jurusan} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, jurusan: e.target.value })} disabled={!isEditing} />
                  </div>
                  <div className="space-y-1 col-span-full">
                    <Label className="mb-3">Email</Label>
                    <Input value={mahasiswa.email} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, email: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="space-y-1">
                    <Label className="mb-3">Golongan Darah</Label>
                    <Input value={mahasiswa.goldar ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, goldar: e.target.value })} disabled={!isEditing} placeholder="Contoh: A, B, AB, O" />
                  </div>

                  <div className="space-y-1">
                    <Label className="mb-3">Agama</Label>
                    <Input value={mahasiswa.agama ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, agama: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="space-y-1 col-span-full">
                    <Label className="mb-3">Alamat Rumah</Label>
                    <Input value={mahasiswa.alamat ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, alamat: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="space-y-1">
                    <Label className="mb-3">Nomor Telepon</Label>
                    <Input value={mahasiswa.telp ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, telp: e.target.value })} disabled={!isEditing} />
                  </div>

                  <div className="col-span-full flex items-center gap-3 mt-1">
                    <Switch id="isActive" checked={isActive} onCheckedChange={handleToggleActive} disabled={!isEditing} />
                    <Label htmlFor="isActive" className="cursor-pointer text-sm">
                      Status Aktif
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perwalian */}
        <TabsContent value="perwalian">
          <Card>
            <CardHeader>
              <CardTitle>Perwalian</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Data Dosen Wali */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <Label className="mb-3">NIP</Label>
                  <Input value={mahasiswa.dosenWali.nip ?? ""} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, nip: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label className="mb-3">Nama Dosen Wali</Label>
                  <Input value={mahasiswa.dosenWali.nama} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, nama: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label className="mb-3">Email</Label>
                  <Input value={mahasiswa.dosenWali.email} onChange={(e) => setMahasiswa((prev) => (prev ? { ...prev, dosenWali: { ...prev.dosenWali, email: e.target.value } } : prev))} disabled={!isEditing} />
                </div>
                <div className="space-y-1">
                  <Label className="mb-3">Kontak</Label>
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
            <CardHeader>
              <CardTitle>Riwayat Akademik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <Label className="mb-3">Asal Sekolah Menengah Atas</Label>
                  <Input value={mahasiswa.asalSekolah ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, asalSekolah: e.target.value })} disabled={!isEditing} placeholder="Masukkan asal sekolah" />
                </div>

                <div className="space-y-1">
                  <Label className="mb-3">Jalur Masuk</Label>
                  <Input value={mahasiswa.jalurMasuk ?? ""} onChange={(e) => setMahasiswa((prev) => prev && { ...prev, jalurMasuk: e.target.value })} disabled={!isEditing} placeholder="Masukkan jalur masuk (misal: UTBK)" />
                </div>

                <div>
                  <Label className="mb-3">Tahun Masuk Kuliah</Label>
                  <p className="mt-1 text-gray-600">{mahasiswa.tahunMasuk ?? "2023"}</p>
                </div>

                <div>
                  <Label className="mb-3">Tanggal Masuk Kuliah</Label>
                  <p className="mt-1 text-gray-600">{mahasiswa.tanggalMasuk ?? "5 September 2023"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organisasi */}
        <TabsContent value="organisasi">
          <Card>
            <CardHeader>
              <CardTitle>Organisasi</CardTitle>
            </CardHeader>
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
