"use client";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "./data.json";

export default function OverviewPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-6 space-y-6">
      {/* Pengumuman */}
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-blue-200 p-4 sm:p-6 rounded-xl shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">📢 Pengumuman</h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          Bagi Anda yang akan mengikuti <span className="font-semibold text-blue-700">Kuliah Semester Antara / Semester Padat</span>, silakan memilih mata kuliah melalui tautan{" "}
          <span className="text-blue-600 underline cursor-pointer">Semester Padat</span>. Pembayaran dapat dilakukan melalui virtual account mulai tanggal <strong>1 Juni 2025</strong> hingga <strong>15 Juni 2025</strong>.
        </p>
        <p className="text-gray-700 mt-3 leading-relaxed text-sm sm:text-base">
          Setelah menyelesaikan proses pembayaran, Anda dapat mulai mengisi IRS dan melakukan perwalian daring seperti biasa pada tanggal <strong>18 Juni 2025</strong> sampai <strong>23 Juni 2025</strong>.
        </p>
      </div>

      {/* Selamat Datang */}
      <div className="bg-white border border-gray-200 p-4 sm:p-8 rounded-xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
          Selamat Datang <span className="font-bold uppercase">Firda Rosiana Tanjung</span> di Aplikasi <span className="text-blue-600 font-bold">SIASPro</span>
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
          <strong>SIASPro (Sistem Informasi Akademik Siswa Profesional)</strong> adalah platform akademik modern yang dirancang untuk menghadirkan pengalaman belajar dan pengelolaan data siswa secara lebih efisien dan terintegrasi.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4 text-sm sm:text-base text-justify">
          Melalui sistem ini, Anda dapat mengakses informasi akademik penting secara langsung seperti jadwal pelajaran, pengisian IRS, rekap nilai, hingga pengumuman resmi sekolah. Tidak hanya itu, proses administrasi seperti pembayaran
          SPP, pemilihan kelas semester pendek, dan perwalian pun dapat dilakukan secara daring tanpa hambatan.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4 text-sm sm:text-base text-justify">SIASPro hadir untuk mendukung perjalanan akademik Anda menjadi lebih mudah dan menyenangkan.</p>
      </div>
    </div>
  );
}
