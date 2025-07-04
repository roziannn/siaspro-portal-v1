"use client";

import { Icon } from "@tabler/icons-react";
import { useState } from "react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  title: string;
  url?: string; // url bisa kosong kalau hanya sebagai parent menu
  icon?: Icon;
  items?: NavItem[]; // submenu
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <NavMenuItem key={item.title} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavMenuItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);

  const isActive = pathname === item.url || item.items?.some((sub) => pathname === sub.url);

  if (item.items && item.items.length > 0) {
    // Menu dengan submenu
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 w-full px-2 py-2 rounded-md transition-colors duration-200
            ${isActive ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-sm" : "hover:bg-blue-50 hover:text-blue-700"}`}
        >
          {item.icon && <item.icon className={`size-5 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-800 hover:text-blue-600"}`} />}
          <span className={`text-sm font-medium ${isActive ? "text-white" : ""}`}>{item.title}</span>
          <svg className={`ml-auto h-4 w-4 transition-transform ${open ? "rotate-90" : ""} stroke-current`} fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {open && (
          <div className="ml-6 flex flex-col gap-1 mt-1">
            {item.items.map((sub) => (
              <SidebarMenuItem key={sub.title}>
                <Link
                  href={sub.url ?? "#"}
                  className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm
                    ${pathname === sub.url ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 hover:text-blue-600"}`}
                >
                  {sub.icon && <sub.icon className="size-4 text-blue-600" />}
                  <span>{sub.title}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Menu tanpa submenu (single link)
  return (
    <SidebarMenuItem>
      <Link
        href={item.url ?? "#"}
        className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm
          ${isActive ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-sm" : "hover:bg-blue-50 hover:text-blue-700"}`}
      >
        {item.icon && <item.icon className={`size-5 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-800 hover:text-blue-600"}`} />}
        <span className={`${isActive ? "text-white" : ""}`}>{item.title}</span>
      </Link>
    </SidebarMenuItem>
  );
}
