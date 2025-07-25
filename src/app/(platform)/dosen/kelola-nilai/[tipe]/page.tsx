import { notFound } from "next/navigation";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IconEye } from "@tabler/icons-react";

type Props = {
  params: {
    tipe: string;
  };
};

export default function KelolaNilaiPage({ params }: Props) {
  const { tipe } = params;

  const titleMap: Record<string, string> = {
    tugas: "Tugas",
    uts: "Ujian Tengah Semester (UTS)",
    uas: "Ujian Akhir Semester (UAS)",
  };

  const isValid = Object.keys(titleMap).includes(tipe);

  if (!isValid) {
    notFound(); // jika segment tidak valid
  }

  const tugasData = [
    {
      namaTugas: "Kuis 1",
      mataKuliah: "Pemrograman Web",
      status: "Selesai",
      terkumpul: 25,
    },
    {
      namaTugas: "Tugas 2",
      mataKuliah: "Struktur Data",
      status: "Belum Selesai",
      terkumpul: 18,
    },
  ];

  const utsData = [
    {
      namaTugas: "UTS Pemrograman",
      mataKuliah: "Pemrograman Web",
      status: "Selesai",
      terkumpul: 30,
    },
  ];

  const uasData = [
    {
      namaTugas: "UAS Struktur Data",
      mataKuliah: "Struktur Data",
      status: "Belum Selesai",
      terkumpul: 22,
    },
  ];

  const renderTugasTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama Tugas</TableHead>
          <TableHead>Mata Kuliah</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Jml Terkumpul</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tugasData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.namaTugas}</TableCell>
            <TableCell>{item.mataKuliah}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.terkumpul}</TableCell>
            <TableCell>
              <Link href={`/dosen/kelola-nilai/${tipe}/${index}`}>
                <Button variant="outline" size="icon">
                  <IconEye className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderUtsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama Ujian</TableHead>
          <TableHead>Mata Kuliah</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Jml Terkumpul</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {utsData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.namaTugas}</TableCell>
            <TableCell>{item.mataKuliah}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.terkumpul}</TableCell>
            <TableCell>
              <Link href={`/dosen/kelola-nilai/${tipe}/${index}`}>
                <Button variant="outline" size="icon">
                  <IconEye className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderUasTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama Ujian</TableHead>
          <TableHead>Mata Kuliah</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Jml Terkumpul</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uasData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.namaTugas}</TableCell>
            <TableCell>{item.mataKuliah}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.terkumpul}</TableCell>
            <TableCell>
              <Link href={`/dosen/kelola-nilai/${tipe}/${index}`}>
                <Button variant="outline" size="icon">
                  <IconEye className="h-4 w-4" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">{titleMap[tipe]}</h1>

      {tipe === "tugas" && (
        <>
          <div>Ini adalah halaman Tugas/Kuis</div>
          {renderTugasTable()}
        </>
      )}

      {tipe === "uts" && (
        <>
          <div>Ini adalah halaman Nilai UTS</div>
          {renderUtsTable()}
        </>
      )}

      {tipe === "uas" && (
        <>
          <div>Ini adalah halaman Nilai UAS</div>
          {renderUasTable()}
        </>
      )}
    </div>
  );
}
