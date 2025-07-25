import { notFound } from "next/navigation";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    tipe: string;
    id: string;
  };
};

const titleMap: Record<string, string> = {
  tugas: "Tugas",
  uts: "Ujian Tengah Semester (UTS)",
  uas: "Ujian Akhir Semester (UAS)",
};

export default function DetailNilaiPage({ params }: Props) {
  const { tipe, id } = params;

  if (!Object.keys(titleMap).includes(tipe)) {
    notFound();
  }

  const detailData = {
    namaTugas: "Tugas 1",
    mataKuliah: "Pemrograman Web",
    deadline: "2025-07-31",
    status: "Selesai",
    deskripsi: "Tugas ini berisi implementasi REST API menggunakan Express.js",
  };

  const submissions = [
    {
      nama: "Ali",
      waktuSubmit: "2025-07-24 14:30",
      attachment: "ali_tugas1.pdf",
      nilai: 85,
    },
    {
      nama: "Budi",
      waktuSubmit: "2025-07-25 09:12",
      attachment: "budi_tugas1.pdf",
      nilai: 90,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Detail {titleMap[tipe]}</h1>
        <p className="text-muted-foreground">ID Tugas: {id}</p>
      </div>

      <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
        <h2 className="font-semibold text-lg">{detailData.namaTugas}</h2>
        <p>
          <strong>Mata Kuliah:</strong> {detailData.mataKuliah}
        </p>
        <p>
          <strong>Deadline:</strong> {detailData.deadline}
        </p>
        <p>
          <strong>Status:</strong> {detailData.status}
        </p>
        <p>
          <strong>Deskripsi:</strong> {detailData.deskripsi}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Pengumpulan Mahasiswa</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Waktu Submit</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.waktuSubmit}</TableCell>
                <TableCell>
                  <a href={`#`} className="text-blue-600 underline" target="_blank">
                    {item.attachment}
                  </a>
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={item.nilai} className="w-20" />
                </TableCell>
                <TableCell>
                  <Button size="sm">Simpan</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
