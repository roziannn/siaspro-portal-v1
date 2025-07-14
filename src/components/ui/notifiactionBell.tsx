"use client";

import { useState, useRef, useEffect } from "react";
import { IconBell } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type NotificationItem = {
  message: string;
  timestamp: string; // Format ISO atau apa saja
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const notifications: NotificationItem[] = [
    {
      message: "📢 Pengumuman: Registrasi semester genap sudah dibuka.",
      timestamp: "2025-07-05T10:15:00",
    },
    {
      message: "📅 Jadwal ujian semester akan diumumkan minggu depan.",
      timestamp: "2025-07-03T16:30:00",
    },
    {
      message: "💰 Pembayaran UKT harus dilakukan sebelum 30 Juli 2025.",
      timestamp: "2025-07-01T09:00:00",
    },
  ];

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button aria-label="Notifications" className="relative rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setOpen(!open)}>
        <IconBell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
      </button>

      {open && (
        <div
          className="
      absolute right-0 mt-2
      w-screen max-w-sm
      sm:w-80
      rounded-md border border-gray-200 bg-white
      dark:border-gray-700 dark:bg-gray-900
      shadow-lg z-50
      px-4 sm:px-0
      "
          style={{ minWidth: "16rem" }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Notifikasi</h2>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 max-h-60 overflow-y-auto">
              {notifications.map((notif, index) => {
                const date = new Date(notif.timestamp);
                const tanggal = date.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                const waktu = date.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <li key={index} className="border-b pb-2">
                    <p>{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tanggal} • {waktu}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex justify-end">
              <p className="text-sm font-semibold cursor-pointer text-blue-500">Tandai sudah dibaca</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
