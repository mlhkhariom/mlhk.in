import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, projects, invoices, tickets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FolderKanban, Receipt, Ticket, ArrowUpRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/public/Breadcrumbs";

export const dynamic = "force-dynamic";

export default async function PortalDashboard() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/dashboard");
  const userId = session.user.id;

  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);

  // Find client record linked to this user
  const [client] = await db.select().from(clients).where(eq(clients.userId, userId)).limit(1);

  if (!client) {
    return (
      <div className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Overview" }]} className="px-0 pt-0 pb-6" />
        <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/[0.02] p-10">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[#ffb84d]">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-white">Welcome, {session.user.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Your client profile is currently pending association with an enterprise account. Please get in touch with our team to link your active projects and contracts.
          </p>
          <a
            href="mailto:support@mlhk.in"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff9f1c] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#ffb84d] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  const [activeProjects, openTickets, pendingInvoices] = await Promise.all([
    db.select().from(projects).where(eq(projects.clientId, client.id)).all(),
    db.select().from(tickets).where(eq(tickets.clientId, client.id)).all(),
    db.select().from(invoices).where(eq(invoices.clientId, client.id)).all(),
  ]);

  const stats = [
    {
      label: "Active Projects",
      value: activeProjects.length,
      href: "/portal/projects",
      icon: FolderKanban,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Billing & Invoices",
      value: pendingInvoices.length,
      href: "/portal/invoices",
      icon: Receipt,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Support Tickets",
      value: openTickets.length,
      href: "/portal/tickets",
      icon: Ticket,
      color: "text-[#ffb84d] bg-[#ff9f1c]/10 border-[#ff9f1c]/25",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Overview" }]} className="px-0 pt-0 pb-6" />

      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ffb84d]">
            Enterprise Client Workspace
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Welcome back, {session.user.name} 👋
          </h1>
        </div>
        <span className="text-xs text-zinc-400">
          Organization: <strong className="text-white">{client.company || client.name}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
        {stats.map(({ label, value, href, icon: Icon, color }) => (
          <Link key={label} href={href} prefetch={true} className="group block">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04] hover:shadow-[0_16px_40px_-16px_rgba(255,159,28,0.25)]">
              <div className="flex items-center justify-between">
                <span className={`flex size-10 items-center justify-center rounded-xl border ${color}`}>
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <ArrowUpRight className="size-4 text-zinc-600 transition-colors group-hover:text-[#ffb84d]" />
              </div>
              <p className="mt-5 font-display text-3xl font-bold text-white">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
