import AdminSidebar from "@/components/admin/Sidebar";
import AdminSearch from "@/components/admin/AdminSearch";
import Link from "next/link";
import { Bell, ExternalLink } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <AdminSearch />
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
              <ExternalLink size={13} /> View Site
            </a>
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">H</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
