import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads, clients, projects, invoices, tickets, blogPosts } from "@/lib/db/schema";
import { eq, count, sql } from "drizzle-orm";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  Receipt,
  Ticket,
  TrendingUp,
  FileText,
  Upload,
  Plus,
  ArrowUpRight,
  Database,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const statusColor: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  proposal: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  won: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);

  const [
    [totalLeads],
    [newLeads],
    [totalClients],
    [activeProjects],
    [openTickets],
    [pendingInvoices],
    [publishedPosts],
  ] = await Promise.all([
    db.select({ count: count() }).from(leads),
    db.select({ count: count() }).from(leads).where(eq(leads.status, "new")),
    db.select({ count: count() }).from(clients),
    db.select({ count: count() }).from(projects).where(eq(projects.status, "active")),
    db.select({ count: count() }).from(tickets).where(eq(tickets.status, "open")),
    db.select({ count: count() }).from(invoices).where(eq(invoices.status, "sent")),
    db.select({ count: count() }).from(blogPosts).where(eq(blogPosts.status, "published")),
  ]);

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads.count,
      sub: `${newLeads.count} new inquiries`,
      icon: TrendingUp,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      href: "/admin/crm/leads",
    },
    {
      label: "Active Clients",
      value: totalClients.count,
      sub: "accounts registered",
      icon: Users,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      href: "/admin/crm/clients",
    },
    {
      label: "Active Projects",
      value: activeProjects.count,
      sub: "in engineering",
      icon: FolderKanban,
      accent: "text-[#ffb84d] bg-[#ff9f1c]/10 border-[#ff9f1c]/20",
      href: "/admin/erp/projects",
    },
    {
      label: "Pending Invoices",
      value: pendingInvoices.count,
      sub: "awaiting remittance",
      icon: Receipt,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      href: "/admin/erp/invoices",
    },
    {
      label: "Open Tickets",
      value: openTickets.count,
      sub: "requires dispatch",
      icon: Ticket,
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      href: "/admin/erp/tickets",
    },
  ];

  const recentLeads = await db.select().from(leads).orderBy(sql`created_at desc`).limit(6);

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Control Dashboard
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Welcome to the MLHK Infotech central operating system
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/cms/posts/new"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            <FileText className="size-3.5 text-[#ff9f1c]" />
            <span>New Post</span>
          </Link>
          <Link
            href="/admin/cms/media"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            <Upload className="size-3.5 text-blue-400" />
            <span>Upload Media</span>
          </Link>
          <Link
            href="/admin/erp/invoices/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ffb84d] px-3.5 py-2 text-xs font-semibold text-black shadow-[0_8px_20px_-6px_rgba(255,159,28,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <Plus className="size-3.5" />
            <span>New Invoice</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ label, value, sub, icon: Icon, accent, href }) => (
          <Link
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-[#ff9f1c]/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className={`flex size-9 items-center justify-center rounded-xl border ${accent}`}>
                <Icon className="size-4" />
              </div>
              <ArrowUpRight className="size-3.5 text-zinc-600 opacity-0 transition-all group-hover:opacity-100 group-hover:text-[#ffb84d]" />
            </div>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
              {value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-zinc-300">{label}</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Two Column Layout: Recent Leads + System Infrastructure */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Recent Inquiries & Leads (2 cols) */}
        <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div>
              <h2 className="text-sm font-bold text-white">Recent Client Inquiries</h2>
              <p className="text-[11px] text-zinc-400">Captured via website contact form and portal</p>
            </div>
            <Link
              href="/admin/crm/leads"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#ffb84d] hover:underline"
            >
              <span>View all ({totalLeads.count})</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/5 bg-white/[0.01] text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Client Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Company</th>
                  <th className="px-5 py-3">Channel</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-zinc-500">
                      No inbound inquiries registered yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-5 py-3 font-semibold text-white">
                        {lead.name}
                      </td>
                      <td className="px-5 py-3 font-mono text-zinc-400 text-[11px]">
                        {lead.email || lead.phone || "—"}
                      </td>
                      <td className="px-5 py-3 text-zinc-400">
                        {lead.company || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase font-mono text-zinc-400">
                          {lead.source || "web"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                            statusColor[lead.status ?? "new"] || "text-zinc-400 border-white/10"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Edge Telemetry & Quick State (1 col) */}
        <div className="space-y-6">
          {/* Cloudflare Edge Status Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Cloudflare Runtime Infrastructure
            </h3>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2.5">
                  <Database className="size-4 text-[#ff9f1c]" />
                  <div>
                    <p className="font-semibold text-white">D1 SQL Database</p>
                    <p className="text-[10px] font-mono text-zinc-500">mlhk-in (fc5efe8e)</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="size-3" /> Connected
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2.5">
                  <HardDrive className="size-4 text-blue-400" />
                  <div>
                    <p className="font-semibold text-white">R2 Media Storage</p>
                    <p className="text-[10px] font-mono text-zinc-500">mlhk-in-media</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="size-3" /> Ready
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Better-Auth Engine</p>
                    <p className="text-[10px] text-zinc-500">Role-Based Access Control</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="size-3" /> Secured
                </span>
              </div>
            </div>
          </div>

          {/* Quick Publishing Summary */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              CMS Publications
            </h3>
            <p className="mt-2 text-2xl font-bold text-white">
              {publishedPosts.count}{" "}
              <span className="text-xs font-normal text-zinc-400">articles live on desk</span>
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/admin/cms/posts"
                className="w-full text-center rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Manage Articles
              </Link>
              <Link
                href="/admin/cms/portfolio"
                className="w-full text-center rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Manage Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
