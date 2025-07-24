"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext"; // sesuaikan path-nya

import {
  IconArchive,
  IconCalendar,
  IconCalendarEvent,
  IconCalendarTime,
  IconCash,
  IconChalkboard,
  IconChartBar,
  IconChartBarPopular,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconNews,
  IconNote,
  IconNotebook,
  IconNoteOff,
  IconNotes,
  IconReport,
  IconSettings,
  IconUser,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";

// Logo SVG
const Logo = () => (
  <svg className="w-36 h-36" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="33" cy="48" r="28" fill="#2563EB" />
    <circle cx="63" cy="48" r="28" fill="#3B82F6" />
  </svg>
);

// Sidebar per role
const sidebarData = {
  mahasiswa: {
    navMain: [
      {
        sectionTitle: "Akademik",
        items: [
          { title: "Beranda", url: "/overview", icon: IconNews },
          { title: "Dashboard", url: "/dashboard", icon: IconChartBar },
          { title: "Profil", url: "/profil", icon: IconUser },
          {
            title: "Rencana Studi",
            icon: IconNote,
            items: [
              { title: "IRS", url: "/rencana-studi/irs" },
              { title: "KRS", url: "/rencana-studi/krs" },
            ],
          },
          {
            title: "Hasil Studi",
            icon: IconArchive,
            items: [
              { title: "Riwayat Akademis", url: "/hasil-studi/riwayat-akademis" },
              { title: "Nilai Semester", url: "/hasil-studi/nilai-semester" },
              { title: "Transkrip Sementara", url: "/hasil-studi/transkrip-sementara" },
            ],
          },
          { title: "Pembayaran", url: "/pembayaran", icon: IconCash },
        ],
      },
      {
        sectionTitle: "LMS",
        items: [
          { title: "Kelas Saya", url: "/kelas-saya", icon: IconChalkboard },
          { title: "Tugas", url: "/tugas", icon: IconNotebook },
          { title: "Event", url: "/event", icon: IconCalendar },
        ],
      },
    ],
    navSecondary: [
      { title: "Settings", url: "/settings", icon: IconSettings },
      { title: "Get Help", url: "/help", icon: IconHelp },
    ],
  },

  dosen: {
    navMain: [
      {
        sectionTitle: "Dosen Panel",
        items: [
          { title: "Dashboard", url: "/dosen/dashboard", icon: IconChartBar },
          { title: "Jadwal Mengajar", url: "/dosen/jadwal-mengajar", icon: IconCalendar },
          { title: "Perkuliahan", url: "/dosen/perkuliahan", icon: IconCalendar },
          { title: "Modul Materi", url: "/dosen/materi", icon: IconFileWord },
          { title: "Penilaian", url: "/dosen/nilai", icon: IconReport },
          { title: "Bimbingan", url: "/dosen/nilai", icon: IconUsers },
          { title: "Profil", url: "/profil", icon: IconUser },
        ],
      },
    ],
    navSecondary: [
      { title: "Settings", url: "/dosen/settings", icon: IconSettings },
      { title: "Bantuan", url: "/dosen/help", icon: IconHelp },
    ],
  },

  administrator: {
    navMain: [
      {
        sectionTitle: "Admin Panel",
        items: [
          { title: "Dashboard", url: "/admin/dashboard", icon: IconChartBar },
          {
            title: "Manajemen User",
            icon: IconUsers,
            items: [
              { title: "Data Akun", url: "/admin/manajemen-user/data-akun" },
              { title: "Reset Password", url: "/admin/manajemen-user/reset-password" },
            ],
          },
          {
            title: "Master Data",
            icon: IconDatabase,
            items: [
              { title: "Data Mahasiswa", url: "/admin/manajemen-data/mahasiswa" },
              { title: "Data Dosen", url: "/admin/manajemen-data/dosen" },
              // { title: "Data Fakultas", url: "/admin/manajemen-data/fakultas" },
              { title: "Data Ruangan", url: "/admin/manajemen-data/ruangan" },
            ],
          },
          { title: "Tren Akademik", url: "/admin/rekap-akademik", icon: IconChartBarPopular },
          { title: "Pengaturan Jadwal", url: "/admin/pengaturan-jadwal", icon: IconCalendarTime },
          { title: "Event Akademik", url: "/admin/event-akademik", icon: IconNotebook },
          // { title: "Profil", url: "/profil", icon: IconUser },
        ],
      },
    ],
    navSecondary: [
      { title: "Settings", url: "/admin/settings", icon: IconSettings },
      { title: "Bantuan", url: "/admin/help", icon: IconHelp },
    ],
  },
};

// reusable Skeleton box
function SkeletonBox({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`} aria-hidden="true" />;
}

function SidebarSkeleton() {
  // struktur sections sesuai sidebarData
  const sections = [
    {
      titleWidth: "w-28",
      itemsCount: 6,
      itemWidth: "w-full",
      itemHeight: "h-6",
    },
    {
      titleWidth: "w-20",
      itemsCount: 2,
      itemWidth: "w-3/4",
      itemHeight: "h-5",
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" className="select-none pointer-events-none">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-3">
          <SkeletonBox className="w-10 h-10 rounded-full" />
          <SkeletonBox className="w-24 h-6 rounded-md" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-6 p-4">
        {sections.map((section, i) => (
          <div key={i} className="space-y-3">
            {/* Skeleton Section Title */}
            <SkeletonBox className={`h-5 ${section.titleWidth} rounded-md`} />

            {/* Skeleton Section Items */}
            <div className="space-y-2">
              {[...Array(section.itemsCount)].map((_, idx) => (
                <SkeletonBox key={idx} className={`${section.itemHeight} ${section.itemWidth} rounded-md`} />
              ))}
            </div>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useUser();

  if (loading) {
    return <SidebarSkeleton />;
  }

  const role = user?.role ?? "mahasiswa";
  const data = sidebarData[role] ?? sidebarData.mahasiswa;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span
                  className="text-base font-extrabold"
                  style={{
                    background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  SIASPRO<small>v1.0</small>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
