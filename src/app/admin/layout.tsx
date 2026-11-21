import type { Metadata } from "next";
import AdminSidebar, { AdminMobileNav } from "@/components/admin/Sidebar";
import AdminBreadcrumbs from "@/components/admin/AdminBreadcrumbs";
import AdminSearch from "@/components/admin/AdminSearch";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders, ADMIN_ROLES } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "MLHK Control Console — ERP, CRM & CMS",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromHeaders(await headers());

  if (!session) redirect("/login");

  const role = session.user.role;
  if (!role || !ADMIN_ROLES.includes(role)) {
    redirect("/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#07080a] text-zinc-100 antialiased selection:bg-[#ff9f1c]/30 selection:text-white print:block print:h-auto print:overflow-visible print:bg-white print:text-black">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden print:block print:overflow-visible">
        {/* Top Utility Bar */}
        <header className="z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#07080a] px-4 md:px-6 print:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <AdminMobileNav />
            <AdminBreadcrumbs />
          </div>

          <div className="flex items-center gap-2.5">
            <AdminSearch />
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white xl:inline-flex"
            >
              <ExternalLink className="size-3.5 text-zinc-500" />
              <span>View Site</span>
            </Link>
            <AdminUserMenu user={session.user} />
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#07080a] px-4 py-6 md:px-8 md:py-7 print:overflow-visible print:bg-white print:p-0">
          <div className="mx-auto max-w-[1360px] print:max-w-none">{children}</div>
        </main>
      </div>
    </div>
  );
}
