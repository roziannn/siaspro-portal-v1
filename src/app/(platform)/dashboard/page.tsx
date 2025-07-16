"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { IconAward, IconBook, IconDashboard } from "@tabler/icons-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Dummy data
const info = {
  sks: 124,
  ipk: 3.75,
  studyDuration: "6 Semester",
};

const ipTrendData = {
  labels: ["2021-1", "2021-2", "2022-3", "2022-4", "2023-5", "2023-6"],
  datasets: [
    {
      label: "IP Semester",
      data: [3.1, 3.3, 3.4, 3.5, 3.8, 3.9],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.4)", // biru muda
      fill: false,
      tension: 0.4,
    },
  ],
};

const gradeDistribution = {
  labels: ["A", "B", "C", "D", "E"],
  datasets: [
    {
      label: "Jumlah",
      data: [40, 25, 10, 2, 1],
      backgroundColor: [
        "rgba(59, 130, 246, 0.4)", // biru muda
        "rgba(34, 197, 94, 0.4)", // hijau muda
        "rgba(253, 186, 116, 0.4)", // oranye muda
        "rgba(244, 63, 94, 0.4)", // merah muda
        "rgba(107, 114, 128, 0.4)", // abu
      ],
      borderColor: ["rgba(59, 130, 246, 1)", "rgba(34, 197, 94, 1)", "rgba(253, 186, 116, 1)", "rgba(244, 63, 94, 1)", "rgba(107, 114, 128, 1)"],
      borderWidth: 1.5,
      borderRadius: 6,
    },
  ],
};

export default function OverviewPage() {
  return (
    <div className="space-y-6 px-1 lg:px-6">
      {/* Informasi SKS, IPK, Lama Studi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <Card>
          <CardHeader className="flex items-center gap-4">
            <IconBook className="h-10 w-10 text-blue-500" />
            <div>
              <CardTitle className="text-base">Perolehan SKS</CardTitle>
              <CardDescription>Total SKS yang telah ditempuh</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{info.sks}</p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardHeader className="flex items-center gap-4">
            <IconAward className="h-10 w-10 text-blue-500" />
            <div>
              <CardTitle className="text-base">IPK Terbaru</CardTitle>
              <CardDescription>Indeks Prestasi Kumulatif saat ini</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{info.ipk}</p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card>
          <CardHeader className="flex items-center gap-4">
            <IconDashboard className="h-10 w-10 text-blue-500" />
            <div>
              <CardTitle className="text-base">Lama Studi</CardTitle>
              <CardDescription>Durasi kuliah hingga saat ini</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{info.studyDuration}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart A */}
        <Card>
          <CardHeader>
            <CardTitle>Trend IP per Semester</CardTitle>
            <CardDescription>Grafik perkembangan IP tiap semester</CardDescription>
          </CardHeader>
          <CardContent className="w-full aspect-[4/3] sm:aspect-[16/9]">
            <Line data={ipTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        {/* Chart B */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Nilai</CardTitle>
            <CardDescription>Jumlah nilai berdasarkan grade</CardDescription>
          </CardHeader>
          <CardContent className="w-full aspect-[4/3] sm:aspect-[16/9]">
            <Bar data={gradeDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
