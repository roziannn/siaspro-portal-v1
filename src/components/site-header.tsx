"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage } from "@tabler/icons-react";

import { NotificationBell } from "@/components/ui/notifiactionBell";

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
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-3 px-4 lg:px-6 bg-white dark:bg-gray-900">
      {/* Sidebar trigger kiri */}
      <SidebarTrigger className="-ml-1" />

      {/* Search full lebar */}
      <div className="flex flex-1 relative">
        <input
          type="search"
          placeholder="Search..."
          className="flex-grow rounded-xl border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
        <svg className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Icons kanan desktop (hidden di mobile) */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Notification bell */}
        <NotificationBell />
        {/* Messages */}
        <button aria-label="Messages" className="relative rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
          <IconMessage className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </button>

        {/* Dark mode toggle */}
        <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)} aria-label="Toggle dark mode" className="text-gray-700 dark:text-gray-300">
          {isDark ? (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m16.485 4.485l-.707-.707M4.222 19.778l-.707-.707" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth={2} />
            </svg>
          ) : (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </Button>
      </div>

      {/* Profile dropdown */}
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
            {/* Mobile-only icons inside dropdown */}
            <div className="flex sm:hidden justify-around border-b border-gray-200 dark:border-gray-700 px-4 py-2">{/* ...mobile icons... */}</div>

            {/* Informasi User: Nama, NIM, Prodi, Fakultas */}
            <div className="flex flex-col items-center gap-1 px-4 py-4 border-b border-gray-200 dark:border-gray-700 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-xl">{user.name.charAt(0)}</div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 mt-2">{user.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{user.nim}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{user.prodi} (S1)</p>
            </div>

            {/* Opsi Edit Profile & Logout */}
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
              <button
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-gray-700"
                onClick={() => {
                  setProfileOpen(false);
                  alert("Logout clicked");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
