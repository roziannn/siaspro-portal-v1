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

export function NavMain({ items }: { items: { sectionTitle: string; items: NavItem[] }[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4">
        {items.map((section) => (
          <div key={section.sectionTitle}>
            <h2 className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wide mb-1">{section.sectionTitle}</h2>
            <SidebarMenu>
              {section.items.map((item) => (
                <NavMenuItem key={item.title} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavMenuItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);

  const isActive = (item.url && pathname.startsWith(item.url)) || item.items?.some((sub) => sub.url && pathname.startsWith(sub.url));

  if (item.items && item.items.length > 0) {
    // Menu dengan submenu
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 w-full px-2 py-2 rounded-md transition-colors duration-200
            ${isActive ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white dark:from-blue-600 dark:to-blue-800" : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300"}`}
        >
          {item.icon && (
            <item.icon
              className={`size-5 transition-colors duration-200 
                ${isActive ? "text-white" : "text-gray-800 dark:text-gray-300"}`}
            />
          )}
          <span className={`text-sm font-medium ${isActive ? "text-white" : "dark:text-gray-300"}`}>{item.title}</span>
          <svg className={`ml-auto h-4 w-4 transition-transform ${open ? "rotate-90" : ""} stroke-current dark:stroke-white`} fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
        ${pathname.startsWith(sub.url ?? "") ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white" : "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 dark:text-gray-300"}`}
                >
                  {sub.icon && <sub.icon className="size-4 text-blue-600 dark:text-blue-400" />}
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
          ${isActive ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white dark:from-blue-600 dark:to-blue-800" : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900 dark:text-gray-300"}`}
      >
        {item.icon && (
          <item.icon
            className={`size-5 transition-colors duration-200 
              ${isActive ? "text-white" : "text-gray-800 dark:text-gray-300"}`}
          />
        )}
        <span className={`${isActive ? "text-white" : "dark:text-gray-300"}`}>{item.title}</span>
      </Link>
    </SidebarMenuItem>
  );
}
