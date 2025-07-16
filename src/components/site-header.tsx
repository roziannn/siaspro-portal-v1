"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage, IconMoon, IconSun } from "@tabler/icons-react";

import { NotificationBell } from "@/components/ui/notifiactionBell";
import Link from "next/link";

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "Firda Rosiana",
    nim: "123456789",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Teknik",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center justify-between px-4 lg:px-6 bg-white dark:bg-gray-900">
      {/* KIRI: Sidebar Trigger */}
      <SidebarTrigger className="-ml-1" />

      {/* KANAN: Bell, Pesan, Darkmode, dan Profil */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell */}
        <NotificationBell />

        {/* Message Icon */}
        <Link href="/pesan" passHref>
          <button aria-label="pesan" className="relative rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            <IconMessage className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </button>
        </Link>

        {/* Dark mode toggle */}
        <button onClick={() => setIsDark(!isDark)} aria-label="Toggle dark mode" className="relative rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          {isDark ? <IconSun className="h-5 w-5 text-yellow-400" /> : <IconMoon className="h-5 w-5" />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} aria-haspopup="true" aria-expanded={profileOpen} className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="hidden max-w-[120px] truncate font-medium dark:text-white sm:inline pr-3">{user.name}</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 z-50">
              <div className="flex sm:hidden justify-around border-b border-gray-200 dark:border-gray-700 px-4 py-2" />

              <div className="flex flex-col items-center gap-1 px-4 py-4 border-b border-gray-200 dark:border-gray-700 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-xl">{user.name.charAt(0)}</div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mt-2">{user.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.nim}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{user.prodi} (S1)</p>
              </div>

              <div className="p-3">
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                  onClick={() => {
                    setProfileOpen(false);
                    alert("Edit Profile clicked");
                  }}
                >
                  Edit Profile
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-gray-700" onClick={() => setProfileOpen(false)}>
                  <Link href="/login" tabIndex={-1} className="w-full block">
                    Logout
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
