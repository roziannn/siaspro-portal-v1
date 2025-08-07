"use client";

import React, { useMemo } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import SectionHeader from "@/components/font/headerSectionText"; // import SectionHeader yang kamu punya

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

type RekapData = {
  nim: string;
  nama: string;
  angkatan: string;
  prodi: string;
  ipk: number;
  sksLulus: number;
  status: string;
  semester: number;
  tahunAjaran: string;
};

const dummyRekapData: RekapData[] = [
  { nim: "230101", nama: "Andi Saputra", angkatan: "2023", prodi: "Teknik Informatika", ipk: 3.45, sksLulus: 120, status: "Aktif", semester: 4, tahunAjaran: "2024/2025" },
  { nim: "230102", nama: "Dewi Lestari", angkatan: "2023", prodi: "Sistem Informasi", ipk: 3.2, sksLulus: 118, status: "Aktif", semester: 4, tahunAjaran: "2024/2025" },
  { nim: "230103", nama: "Rian Saputra", angkatan: "2023", prodi: "Teknik Elektro", ipk: 3.6, sksLulus: 125, status: "Aktif", semester: 4, tahunAjaran: "2024/2025" },
  { nim: "230104", nama: "Sari Dewi", angkatan: "2023", prodi: "Teknik Informatika", ipk: 3.75, sksLulus: 130, status: "Cuti", semester: 4, tahunAjaran: "2024/2025" },
  { nim: "220201", nama: "Budi Santoso", angkatan: "2022", prodi: "Teknik Informatika", ipk: 3.1, sksLulus: 115, status: "Aktif", semester: 6, tahunAjaran: "2024/2025" },
  { nim: "220202", nama: "Rina Wijaya", angkatan: "2022", prodi: "Sistem Informasi", ipk: 2.8, sksLulus: 110, status: "Aktif", semester: 6, tahunAjaran: "2024/2025" },
  { nim: "220203", nama: "Agus Setiawan", angkatan: "2022", prodi: "Teknik Elektro", ipk: 3.4, sksLulus: 120, status: "Alumni", semester: 6, tahunAjaran: "2024/2025" },
  { nim: "210301", nama: "Dewi Anggraeni", angkatan: "2021", prodi: "Teknik Informatika", ipk: 3.25, sksLulus: 118, status: "Alumni", semester: 8, tahunAjaran: "2024/2025" },
  { nim: "210302", nama: "Rizky Pratama", angkatan: "2021", prodi: "Sistem Informasi", ipk: 3.6, sksLulus: 130, status: "Alumni", semester: 8, tahunAjaran: "2024/2025" },
  { nim: "210303", nama: "Yuniar Putri", angkatan: "2021", prodi: "Teknik Elektro", ipk: 2.9, sksLulus: 110, status: "Cuti", semester: 8, tahunAjaran: "2024/2025" },
];

const COLORS = {
  blue: "#60A5FA",
  green: "#34D399",
  yellow: "#FBBF24",
  orange: "#FB923C",
  purple: "#A78BFA",
  pink: "#F472B6",
};

export default function RekapAkademikCharts() {
  // 1. Distribusi IPK
  const ipkBuckets = useMemo(() => {
    const buckets: Record<string, number> = {
      "2.0-2.5": 0,
      "2.5-3.0": 0,
      "3.0-3.5": 0,
      "3.5-4.0": 0,
    };
    dummyRekapData.forEach((d) => {
      if (d.ipk >= 2.0 && d.ipk < 2.5) buckets["2.0-2.5"]++;
      else if (d.ipk >= 2.5 && d.ipk < 3.0) buckets["2.5-3.0"]++;
      else if (d.ipk >= 3.0 && d.ipk < 3.5) buckets["3.0-3.5"]++;
      else if (d.ipk >= 3.5 && d.ipk <= 4.0) buckets["3.5-4.0"]++;
    });
    return buckets;
  }, []);

  // 2. Rata-rata IPK per Angkatan
  const avgIpkPerAngkatan = useMemo(() => {
    const grouped: Record<string, { total: number; count: number }> = {};
    dummyRekapData.forEach((d) => {
      if (!grouped[d.angkatan]) grouped[d.angkatan] = { total: 0, count: 0 };
      grouped[d.angkatan].total += d.ipk;
      grouped[d.angkatan].count++;
    });
    const labels = Object.keys(grouped).sort();
    const data = labels.map((angk) => grouped[angk].total / grouped[angk].count);
    return { labels, data };
  }, []);

  // 3. Jumlah Mahasiswa per Status
  const mahasiswaPerStatus = useMemo(() => {
    const statusCount: Record<string, number> = {};
    dummyRekapData.forEach((d) => {
      statusCount[d.status] = (statusCount[d.status] || 0) + 1;
    });
    return statusCount;
  }, []);

  // 4. Rata-rata SKS Lulus per Prodi
  const avgSksPerProdi = useMemo(() => {
    const grouped: Record<string, { total: number; count: number }> = {};
    dummyRekapData.forEach((d) => {
      if (!grouped[d.prodi]) grouped[d.prodi] = { total: 0, count: 0 };
      grouped[d.prodi].total += d.sksLulus;
      grouped[d.prodi].count++;
    });
    const labels = Object.keys(grouped);
    const data = labels.map((p) => grouped[p].total / grouped[p].count);
    return { labels, data };
  }, []);

  // 5. Tren IPK rata-rata per semester
  const avgIpkPerSemester = useMemo(() => {
    const grouped: Record<number, { total: number; count: number }> = {};
    dummyRekapData.forEach((d) => {
      if (!grouped[d.semester]) grouped[d.semester] = { total: 0, count: 0 };
      grouped[d.semester].total += d.ipk;
      grouped[d.semester].count++;
    });
    const labels = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);
    const data = labels.map((sem) => grouped[sem].total / grouped[sem].count);
    return { labels, data };
  }, []);

  // 6. Distribusi SKS Lulus
  const sksBuckets = useMemo(() => {
    const buckets: Record<string, number> = {
      "80-100": 0,
      "101-120": 0,
      "121-140": 0,
      "141-160": 0,
    };
    dummyRekapData.forEach((d) => {
      if (d.sksLulus >= 80 && d.sksLulus <= 100) buckets["80-100"]++;
      else if (d.sksLulus >= 101 && d.sksLulus <= 120) buckets["101-120"]++;
      else if (d.sksLulus >= 121 && d.sksLulus <= 140) buckets["121-140"]++;
      else if (d.sksLulus >= 141 && d.sksLulus <= 160) buckets["141-160"]++;
    });
    return buckets;
  }, []);

  return (
    <div className="space-y-6 px-1 md:px-4">
      <SectionHeader title="Rekapitulasi Akademik Mahasiswa" description="Berbagai visualisasi data akademik untuk melihat gambaran prestasi mahasiswa" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribusi IPK */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Distribusi IPK Mahasiswa</CardTitle>
            <CardDescription>Histogram bucket distribusi nilai IPK mahasiswa</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Bar
              data={{
                labels: Object.keys(ipkBuckets),
                datasets: [
                  {
                    label: "Jumlah Mahasiswa",
                    data: Object.values(ipkBuckets),
                    backgroundColor: COLORS.blue,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>

        {/* Rata-rata IPK per Angkatan */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Rata-rata IPK per Angkatan</CardTitle>
            <CardDescription>Rata-rata nilai IPK mahasiswa tiap angkatan</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Bar
              data={{
                labels: avgIpkPerAngkatan.labels,
                datasets: [
                  {
                    label: "Rata-rata IPK",
                    data: avgIpkPerAngkatan.data,
                    backgroundColor: COLORS.green,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { min: 0, max: 4 } },
              }}
            />
          </CardContent>
        </Card>

        {/* Jumlah Mahasiswa per Status */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Jumlah Mahasiswa per Status Akademik</CardTitle>
            <CardDescription>Distribusi mahasiswa berdasarkan status akademik</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Pie
              data={{
                labels: Object.keys(mahasiswaPerStatus),
                datasets: [
                  {
                    label: "Status",
                    data: Object.values(mahasiswaPerStatus),
                    backgroundColor: [COLORS.pink, COLORS.blue, COLORS.yellow, COLORS.green],
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: "right" } } }}
            />
          </CardContent>
        </Card>

        {/* Rata-rata SKS Lulus per Prodi */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Rata-rata SKS Lulus per Program Studi</CardTitle>
            <CardDescription>Rata-rata jumlah SKS lulus mahasiswa tiap program studi</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Bar
              data={{
                labels: avgSksPerProdi.labels,
                datasets: [
                  {
                    label: "SKS Lulus Rata-rata",
                    data: avgSksPerProdi.data,
                    backgroundColor: COLORS.orange,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>

        {/* Tren IPK rata-rata per Semester */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Tren Rata-rata IPK per Semester</CardTitle>
            <CardDescription>Perkembangan nilai IPK mahasiswa tiap semester</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Line
              data={{
                labels: avgIpkPerSemester.labels.map((s) => `Semester ${s}`),
                datasets: [
                  {
                    label: "Rata-rata IPK",
                    data: avgIpkPerSemester.data,
                    fill: false,
                    borderColor: COLORS.purple,
                    tension: 0.3,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
                scales: { y: { min: 0, max: 4 } },
              }}
            />
          </CardContent>
        </Card>

        {/* Distribusi SKS Lulus */}
        <Card className="h-[380px]">
          <CardHeader>
            <CardTitle>Distribusi Jumlah SKS Lulus Mahasiswa</CardTitle>
            <CardDescription>Histogram bucket distribusi jumlah SKS lulus mahasiswa</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <Bar
              data={{
                labels: Object.keys(sksBuckets),
                datasets: [
                  {
                    label: "Jumlah Mahasiswa",
                    data: Object.values(sksBuckets),
                    backgroundColor: COLORS.pink,
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
