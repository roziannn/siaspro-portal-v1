"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers, IconUserCheck, IconListCheck, IconCalendarStats, IconSchool, IconSettings, IconBell } from "@tabler/icons-react";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const adminMenu = [
  {
    icon: <IconUsers className="h-10 w-10 text-blue-600" />,
    title: "Manajemen Mahasiswa & Dosen",
    description: "Kelola data mahasiswa dan dosen",
    href: "/admin/people",
  },
  {
    icon: <IconUserCheck className="h-10 w-10 text-green-600" />,
    title: "Manajemen User",
    description: "Atur akun login pengguna",
    href: "/admin/users",
  },
  {
    icon: <IconListCheck className="h-10 w-10 text-yellow-600" />,
    title: "Validasi IRS / KRS",
    description: "Validasi rencana studi mahasiswa",
    href: "/admin/irs-krs",
  },
  {
    icon: <IconSchool className="h-10 w-10 text-purple-600" />,
    title: "Rekap Akademik",
    description: "Lihat ringkasan akademik per angkatan",
    href: "/admin/rekap-akademik",
  },
  {
    icon: <IconCalendarStats className="h-10 w-10 text-pink-600" />,
    title: "Manajemen Event",
    description: "Kelola event & kegiatan akademik",
    href: "/admin/events",
  },
  {
    icon: <IconSettings className="h-10 w-10 text-gray-600" />,
    title: "Pengaturan Sistem",
    description: "Pengaturan dan preferensi sistem",
    href: "/admin/settings",
  },
];

const stats = [
  { label: "Total Mahasiswa", value: 1289 },
  { label: "Total Dosen", value: 97 },
  { label: "KRS Belum Validasi", value: 145 },
  { label: "IRS Belum Validasi", value: 102 },
];

// Chart data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "IRS",
      data: [45, 55, 65, 70, 60, 80],
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
    {
      label: "KRS",
      data: [40, 50, 60, 65, 55, 75],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.5)",
    },
  ],
};

const barData = {
  labels: ["FTI", "FEB", "FISIP", "FH", "FK", "FKG", "FIKES"],
  datasets: [
    {
      label: "Belum Validasi",
      data: [120, 95, 85, 60, 30, 20, 10],
      backgroundColor: "rgba(234, 88, 12, 0.7)",
    },
  ],
};

const optionsResponsive = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: false },
  },
  maintainAspectRatio: false,
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 px-2 lg:px-6">
      <h2 className="text-xl font-bold tracking-tight mb-2">Selamat datang di panel Admin</h2>
      <p className="text-muted-foreground">Pilih fitur di bawah untuk mulai mengelola.</p>

      {/* Ringkasan Statistik - Lebih Estetik & Responsif */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="p-4 bg-gradient-to-br from-white to-gray-50 border 
          border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition duration-200"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-3xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-sm text-gray-500 text-center">{item.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Grafik Statistik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Grafik Status IRS / KRS</CardTitle>
            <CardDescription>Perbandingan jumlah validasi dalam 6 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <Line data={lineData} options={optionsResponsive} />
          </CardContent>
        </Card>

        <Card className="h-[300px]">
          <CardHeader>
            <CardTitle>Pareto Validasi Fakultas</CardTitle>
            <CardDescription>Distribusi mahasiswa belum validasi per fakultas</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px]">
            <Bar data={barData} options={optionsResponsive} />
          </CardContent>
        </Card>
      </div>

      {/* Menu Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminMenu.map((item, index) => (
          <Link href={item.href} key={index}>
            <Card className="hover:shadow-lg transition duration-200 cursor-pointer">
              <CardHeader className="flex items-center gap-4">
                {item.icon}
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
