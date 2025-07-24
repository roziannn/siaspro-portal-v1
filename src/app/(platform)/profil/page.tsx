"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilPage() {
  const mahasiswa = {
    nama: "Firda Rosiana",
    nim: "1234567890",
    jenisKelamin: "Perempuan",
    emailKampus: "firda@siaspro.ac.id",
    emailPribadi: "firda@gmail.com",
    noHp: "0812-3456-7890",
    tanggalLahir: "15 Mei 2003",
    tempatLahir: "Bandung",
    agama: "ISLAM",
    fakultas: "Teknik Informatika",
    prodi: "Sistem Informasi",
    angkatan: 2021,
    semesterAktif: "Genap 2024/2025",
    status: "Aktif",
    ipkTerakhir: 3.75,
    totalSks: 110,
    lamaStudiSemester: "6 Semester",
  };

  const renderListItem = (label: string, value: React.ReactNode) => (
    <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center border-b border-gray-200 dark:border-gray-700 py-3 last:border-b-0">
      <span className="font-semibold text-gray-700 dark:text-gray-300 sm:min-w-[150px] sm:mr-20">{label}</span>
      <span className="text-gray-600 dark:text-gray-400 break-words">{value}</span>
    </div>
  );

  return (
    <div className="px-1 lg:px-6 mx-auto w-full">
      <Tabs defaultValue="profil" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profil">Profil Saya</TabsTrigger>
          <TabsTrigger value="riwayat">Riwayat Akademik</TabsTrigger>
        </TabsList>

        {/* Tab Profil Saya */}
        <TabsContent value="profil">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-left">Profil Saya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col text-sm">
                {renderListItem("Nama Lengkap", mahasiswa.nama)}
                {renderListItem("NIM", mahasiswa.nim)}
                {renderListItem("Jenis Kelamin", mahasiswa.jenisKelamin)}
                {renderListItem("Tempat, Tanggal Lahir", `${mahasiswa.tempatLahir}, ${mahasiswa.tanggalLahir}`)}
                {renderListItem("Agama", mahasiswa.agama)}
                {renderListItem("Email Kampus", mahasiswa.emailKampus)}
                {renderListItem("Email Pribadi", mahasiswa.emailPribadi)}
                {renderListItem("No HP", mahasiswa.noHp)}
                {renderListItem("Agama", mahasiswa.agama)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Riwayat Akademik */}
        <TabsContent value="riwayat">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-left">Riwayat Akademik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col text-sm">
                {renderListItem("Fakultas", mahasiswa.fakultas)}
                {renderListItem("Program Studi", mahasiswa.prodi)}
                {renderListItem("Angkatan", mahasiswa.angkatan)}
                {renderListItem("Semester Aktif", mahasiswa.semesterAktif)}
                {renderListItem("Status", mahasiswa.status)}
                {renderListItem("IPK Terakhir", mahasiswa.ipkTerakhir)}
                {renderListItem("Total SKS", mahasiswa.totalSks)}
                {renderListItem("Lama Studi", mahasiswa.lamaStudiSemester)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
