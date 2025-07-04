"use client";

import * as React from "react";
import {
  IconArchive,
  IconArchiveFilled,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFile,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconHome,
  IconHomeBolt,
  IconInnerShadowTop,
  IconListDetails,
  IconNews,
  IconNote,
  IconReport,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { title } from "process";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
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
    // {
    //   title: "Rencana Studi",
    //   url: "/rencana-studi",
    //   icon: IconNote,
    // },
    {
      title: "Rencana Studi",
      icon: IconNote,
      items: [
        // submenu di sini
        {
          title: "IRS",
          url: "/rencana-studi/irs",
        },
        {
          title: "KRS",
          url: "/rencana-studi/krs",
        },
      ],
    },
    {
      title: "Hasil Studi",
      icon: IconArchive,
      items: [
        // submenu di sini
        {
          title: "Riwayat Akademis",
          url: "/hasil-studi/riwayat-akademis",
        },
        {
          title: "Nilai Semester",
          url: "/hasil-studi/nilai-semester",
        },
        {
          title: "Transkrip Sementara",
          url: "/hasil-studi/transkrip",
        },
      ],
    },
    {
      title: "Files",
      url: "#",
      icon: IconFileWord,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  masters: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

const Logo = () => (
  <svg className="w-36 h-36" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="33" cy="48" r="28" fill="#2563EB" />
    <circle cx="63" cy="48" r="28" fill="#3B82F6" />
  </svg>
);

// const ContactCard = () => (
//   <div className="flex items-center gap-4 bg-white rounded-lg shadow px-4 py-3 max-w-sm">
//     <Logo />
//     <div className="flex flex-col">
//       <span className="font-semibold text-gray-900">Buildora Tech</span>
//       <span className="text-gray-500 text-sm">contact@buildoratech.com</span>
//     </div>
//     <button className="ml-auto text-gray-400 hover:text-gray-600">
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//       </svg>
//     </button>
//   </div>
// );

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
                  SIASPRO <small>v1.0</small>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.masters} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
