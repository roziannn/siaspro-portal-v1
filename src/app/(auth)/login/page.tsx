"use client";

import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import IconPortal from "@/components/img/elearning_6991765.png";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-50 dark:bg-gray-950">
      <div className="flex w-full max-w-4xl md:h-[480px] flex-col md:flex-row overflow-hidden rounded-xl shadow-xl  dark:border-gray-800 bg-white dark:bg-gray-900 items-stretch">
        {/* Info SIASPRO sebelah kiri */}
        <div className="hidden md:flex flex-1 flex-col justify-between p-8 bg-gradient-to-br from-white to-blue-200 dark:from-gray-900 dark:to-gray-800">
          <div className="space-y-4">
            <Image src={IconPortal} alt="Ilustrasi Portal" width={60} height={60} />
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <strong>SIASPRO</strong> (Sistem Informasi Akademik dan Administrasi Prodi) adalah platform internal untuk mahasiswa dan dosen dalam mengelola aktivitas akademik seperti pendaftaran, tugas, dan informasi program studi.
            </p>
          </div>

          {/* Footer layanan */}
          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 space-y-1">
            <p className="font-semibold">Layanan TIK</p>
            <p>Telepon: 022-200</p>
            <p>Email: layanan-tik@upi.edu</p>
            <p>WhatsApp/SMS: 08112011007 dan 08112291229</p>
            <p className="text-xs italic">(*Jam & Hari Kerja)</p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">Powered by © Direktorat STI. All rights reserved.</p>
          </div>
        </div>

        {/* Form login sebelah kanan */}
        <div className="flex-1 bg-white dark:bg-gray-950 p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-2">
            <h1
              className="text-xl font-bold text-center"
              style={{
                background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SIASPRO<small>v1.0</small>
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
