"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUser, IconChecklist, IconCalendar, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const dosenMenu = [
  {
    icon: <IconUser className="h-10 w-10 text-blue-600" />,
    title: "Mahasiswa Bimbingan",
    description: "Lihat daftar mahasiswa bimbingan",
    href: "/dosen/bimbingan",
  },
  {
    icon: <IconChecklist className="h-10 w-10 text-green-600" />,
    title: "Tugas Mahasiswa",
    description: "Kelola dan nilai tugas yang dikumpulkan",
    href: "/dosen/tugas",
  },
  {
    icon: <IconCalendar className="h-10 w-10 text-pink-600" />,
    title: "Kalender Akademik",
    description: "Lihat jadwal dan kegiatan akademik",
    href: "/dosen/kalender",
  },
  {
    icon: <IconSettings className="h-10 w-10 text-gray-600" />,
    title: "Pengaturan Akun",
    description: "Ubah preferensi akun Anda",
    href: "/dosen/settings",
  },
];

const stats = [
  { label: "Mahasiswa Bimbingan", value: 24 },
  { label: "Tugas Terkumpul", value: 87 },
  { label: "Tugas Belum Dinilai", value: 13 },
  { label: "Tugas Lewat Deadline", value: 4 },
];

// Grafik 1: Bar horizontal stacked (Progress Tugas)
const dataProgressTugas = {
  labels: ["Jun", "May", "Apr", "Mar", "Feb", "Jan"], // dibalik
  datasets: [
    {
      label: "Tugas Masuk",
      data: [30, 28, 20, 25, 18, 12], // dibalik
      backgroundColor: "rgba(59, 130, 246, 0.7)",
    },
    {
      label: "Tugas Dinilai",
      data: [28, 26, 19, 23, 15, 10], // dibalik
      backgroundColor: "rgba(16, 185, 129, 0.7)",
    },
  ],
};

const optionsBarHorizontalStacked = {
  responsive: true,
  indexAxis: "y" as const,
  plugins: {
    legend: { position: "top" as const },
    title: { display: false },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

// Grafik 2: Vertikal biasa (Distribusi per Kelas)
const dataDistribusiKelas = {
  labels: ["Kelas A", "Kelas B", "Kelas C", "Kelas D"],
  datasets: [
    {
      label: "Tugas Terkumpul",
      data: [30, 25, 18, 14],
      backgroundColor: "rgba(96, 165, 250, 0.7)", // biru soft (Tailwind blue-400)
    },
  ],
};

const optionsBarVertical = {
  responsive: true,
  indexAxis: "x" as const,
  plugins: {
    legend: { position: "top" as const },
    title: { display: false },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize: 10,
        beginAtZero: true,
      },
    },
  },
};

export default function DosenDashboard() {
  return (
    <div className="space-y-6 px-1 md:px-4 py-3">
      <h2 className="text-xl font-bold tracking-tight mb-2">Selamat datang di panel Dosen</h2>
      <p className="text-muted-foreground">Berikut adalah ringkasan data aktivitas akademik Anda.</p>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index}>
            <div className="flex flex-col items-center justify-center space-y-2">
              <CardTitle className="text-3xl font-bold">{item.value}</CardTitle>

              <CardDescription>{item.label}</CardDescription>
            </div>
          </Card>
        ))}
      </div>

      {/* Grafik Statistik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Grafik 1: Horizontal Stacked */}
        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Progress Penilaian Tugas</CardTitle>
            <CardDescription>Jumlah tugas masuk vs dinilai dalam 6 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <Bar data={dataProgressTugas} options={optionsBarHorizontalStacked} />
          </CardContent>
        </Card>

        {/* Grafik 2: Vertikal */}
        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Distribusi Tugas per Kelas</CardTitle>
            <CardDescription>Tugas yang telah dikumpulkan per kelas</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <Bar data={dataDistribusiKelas} options={optionsBarVertical} />
          </CardContent>
        </Card>
      </div>

      {/* Menu Fitur Dosen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dosenMenu.map((item, index) => (
          <Link href={item.href} key={index}>
            <Card className="hover:shadow-lg transition duration-200 cursor-pointer">
              <CardHeader className="flex items-center gap-4">
                {item.icon}
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
