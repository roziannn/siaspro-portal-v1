"use client";

import * as React from "react";
import { IconArchive, IconCalendar, IconCash, IconChalkboard, IconChartBar, IconDatabase, IconFileWord, IconHelp, IconNews, IconNote, IconNotebook, IconReport, IconSettings, IconUser } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      sectionTitle: "Akademik",
      items: [
        {
          title: "Beranda",
          url: "/overview",
          icon: IconNews,
        },
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconChartBar,
        },
        {
          title: "Profil",
          url: "/profil",
          icon: IconUser,
        },
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
        {
          title: "Pembayaran",
          url: "/pembayaran",
          icon: IconCash,
        },
      ],
    },
    {
      sectionTitle: "LMS",
      items: [
        {
          title: "Kelas Saya",
          icon: IconChalkboard,
          url: "/kelas-saya",
        },
        // {
        //   title: "Materi",
        //   icon: IconBook,
        //   url: "/lms/materi",
        // },
        {
          title: "Tugas",
          icon: IconNotebook,
          url: "/tugas",
        },
        {
          title: "Event",
          icon: IconCalendar,
          url: "/event",
        },
        // {
        //   title: "Aktifitas",
        //   icon: IconReport,
        //   url: "/lms/nilai",
        // },
      ],
    },
    // {
    //   sectionTitle: "Lainnya",
    //   items: [
    //     {
    //       title: "Reports",
    //       url: "#",
    //       icon: IconReport,
    //     },
    //   ],
    // },
  ],

  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
    // { title: "Search", url: "#", icon: IconSearch },
  ],

  masters: [
    { name: "Data Library", url: "#", icon: IconDatabase },
    { name: "Reports", url: "#", icon: IconReport },
    { name: "Word Assistant", url: "#", icon: IconFileWord },
  ],
};

const Logo = () => (
  <svg className="w-36 h-36" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="33" cy="48" r="28" fill="#2563EB" />
    <circle cx="63" cy="48" r="28" fill="#3B82F6" />
  </svg>
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                    display: "inline-blo  ck",
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
        {/* <NavDocuments items={data.masters} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
