"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    // Kalau di root, tampilkan kosong atau bisa juga teks statis
    return null;
  }

  return (
    <Breadcrumb className="mb-4 text-sm" aria-label="Breadcrumb">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = decodeURIComponent(segment).replace(/-/g, " ");

        return (
          <BreadcrumbItem key={href}>
            {index > 0 && <BreadcrumbSeparator className="text-gray-400 select-none">/</BreadcrumbSeparator>}
            {isLast ? (
              <span className="capitalize font-semibold text-gray-700" aria-current="page">
                {label}
              </span>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={href} className="capitalize text-gray-600 hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 py-6 px-4 lg:px-6">
            {/* Breadcrumb di sini */}
            <BreadcrumbNav />
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
