import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import {
  leads,
  clients,
  followUps,
  projects,
  invoices,
  expenses,
  tickets,
  blogPosts,
  pages,
  portfolio,
} from "@/lib/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Plus,
  Receipt,
  CalendarClock,
  Ticket,
  FolderKanban,
  Users,
  IndianRupee,
  TrendingUp,
  Clock,
} from "lucide-react";
import { computeErpFinancialSummary, formatInr } from "@/lib/erp-utils";
import { computePipelineMetrics, parseLeadNotes } from "@/lib/crm-utils";

export const dynamic = "force-dynamic";

const LEAD_DOT: Record<string, string> = {
  new: "bg-sky-400",
  contacted: "bg-[#ff9f1c]",
  proposal: "bg-violet-400",
  won: "bg-emerald-400",
  lost: "bg-rose-400",
};

const INVOICE_DOT: Record<string, string> = {
  paid: "bg-emerald-400",
  sent: "bg-sky-400",
  overdue: "bg-rose-400",
  draft: "bg-zinc-400",
  cancelled: "bg-zinc-600",
};

const PRIORITY_TONE: Record<string, string> = {
  urgent: "text-rose-400",
  high: "text-amber-400",
  medium: "text-sky-400",
  low: "text-zinc-400",
};

export default async function AdminDashboard() {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);

  const [
    allLeads,
    allClients,
    allProjects,
    allInvoices,
    allExpenses,
    openTickets,
    pendingFollowUps,
    publishedPosts,
    allPages,
    allPortfolio,
  ] = await Promise.all([
    db.select().from(leads).orderBy(sql`created_at desc`),
    db.select().from(clients).orderBy(sql`created_at desc`),
    db.select().from(projects).orderBy(sql`created_at desc`),
    db.select().from(invoices).orderBy(sql`created_at desc`),
    db.select().from(expenses).orderBy(sql`created_at desc`),
    db
      .select()
      .from(tickets)
      .where(sql`${tickets.status} IN ('open', 'in_progress')`)
      .orderBy(desc(tickets.createdAt))
      .limit(5),
    db
      .select()
      .from(followUps)
      .where(eq(followUps.done, false))
      .orderBy(sql`due_date asc`)
      .limit(5),
    db.select().from(blogPosts).where(eq(blogPosts.status, "published")),
    db.select().from(pages),
    db.select().from(portfolio),
  ]);

  const finance = computeErpFinancialSummary(allInvoices, allExpenses);
  const pipeline = computePipelineMetrics(allLeads);
  const clientMap = new Map(allClients.map((c) => [c.id, c.company || c.name]));

  const activeProjectsCount = allProjects.filter(
    (p) => p.status === "active" || p.status === "planning"
  ).length;
  const completedProjectsCount = allProjects.filter((p) => p.status === "completed").length;

  const recentLeads = allLeads.slice(0, 6);
  const recentInvoices = allInvoices.slice(0, 5);

  const pipelineStages = [
    { label: "New", count: pipeline.newCount, bar: "bg-sky-400" },
    { label: "Contacted", count: pipeline.contactedCount, bar: "bg-[#ff9f1c]" },
    { label: "Proposal", count: pipeline.proposalCount, bar: "bg-violet-400" },
    { label: "Won", count: pipeline.wonCount, bar: "bg-emerald-400" },
    { label: "Lost", count: pipeline.lostCount, bar: "bg-rose-400" },
  ];

  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header & Primary Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            MLHK Infotech · Operations Overview
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
            Executive Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/cms/posts/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:text-white"
          >
            <FileText className="size-3.5 text-zinc-400" />
            <span>New Article</span>
          </Link>
          <Link
            href="/admin/erp/projects"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#0d0f14] px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:border-white/20 hover:text-white"
          >
            <FolderKanban className="size-3.5 text-zinc-400" />
            <span>Projects</span>
          </Link>
          <Link
            href="/admin/erp/invoices/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#ff9f1c] px-4 text-xs font-semibold text-[#07080a] transition-colors hover:bg-[#ffb043]"
          >
            <Plus className="size-3.5" strokeWidth={2.5} />
            <span>New GST Invoice</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Link
          href="/admin/erp/invoices"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Paid Revenue</span>
            <IndianRupee className="size-3.5 text-emerald-400" />
          </div>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums text-white">
            {formatInr(finance.paidRevenue)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {finance.collectionRate}% collection rate
          </p>
        </Link>

        <Link
          href="/admin/erp/invoices"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Receivables</span>
            <Receipt className="size-3.5 text-[#ff9f1c]" />
          </div>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums text-white">
            {formatInr(finance.pendingReceivables + finance.overdueReceivables)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {finance.overdueReceivables > 0
              ? `${formatInr(finance.overdueReceivables)} overdue`
              : `${allInvoices.length} total invoices`}
          </p>
        </Link>

        <Link
          href="/admin/erp/expenses"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Net Cashflow</span>
            <TrendingUp className="size-3.5 text-sky-400" />
          </div>
          <p
            className={`mt-2 font-mono text-xl font-bold tabular-nums ${
              finance.netCashflow >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {formatInr(finance.netCashflow)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Expenses: {formatInr(finance.totalExpenses)}
          </p>
        </Link>

        <Link
          href="/admin/crm/leads"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>CRM Leads</span>
            <Users className="size-3.5 text-sky-400" />
          </div>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums text-white">
            {pipeline.total}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {pipeline.newCount} new · {pipeline.conversionRate}% won
          </p>
        </Link>

        <Link
          href="/admin/erp/projects"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Projects &amp; Clients</span>
            <FolderKanban className="size-3.5 text-violet-400" />
          </div>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums text-white">
            {activeProjectsCount}
            <span className="ml-1 text-xs font-normal text-zinc-500">active</span>
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {allClients.length} clients · {completedProjectsCount} shipped
          </p>
        </Link>

        <Link
          href="/admin/erp/tickets"
          className="group rounded-xl border border-white/10 bg-[#0d0f14] p-4 transition-colors hover:border-white/25"
        >
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Action Queue</span>
            <Ticket className="size-3.5 text-rose-400" />
          </div>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums text-white">
            {openTickets.length + pendingFollowUps.length}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {openTickets.length} tickets · {pendingFollowUps.length} follow-ups
          </p>
        </Link>
      </div>

      {/* CRM Pipeline Funnel Strip */}
      <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-white">CRM Lead Conversion Funnel</h2>
            <p className="text-xs text-zinc-500">
              Live stage distribution across website quotes, popup forms, and manual leads
            </p>
          </div>
          <Link
            href="/admin/crm/leads"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#ff9f1c] hover:underline"
          >
            <span>Open Pipeline</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          {pipeline.total > 0 ? (
            pipelineStages.map((stage) =>
              stage.count > 0 ? (
                <div
                  key={stage.label}
                  style={{ width: `${(stage.count / pipeline.total) * 100}%` }}
                  className={`${stage.bar} transition-all`}
                  title={`${stage.label}: ${stage.count}`}
                />
              ) : null
            )
          ) : (
            <div className="w-full bg-white/[0.04]" />
          )}
        </div>

        <div className="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {pipelineStages.map((stage) => (
            <div key={stage.label} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-zinc-400">
                <span className={`size-2 rounded-full ${stage.bar}`} />
                {stage.label}
              </span>
              <span className="font-mono font-semibold tabular-nums text-zinc-200">
                {stage.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 12-Col Analytical Split */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 8 Cols: Recent Inquiries + Recent Invoices */}
        <div className="space-y-6 lg:col-span-8">
          {/* Recent Client Inquiries */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Recent Client Inquiries</h2>
                <p className="text-xs text-zinc-500">Latest inbound leads captured in D1</p>
              </div>
              <Link
                href="/admin/crm/leads"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#ff9f1c] hover:underline"
              >
                <span>All ({pipeline.total})</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-5 py-3">Prospect</th>
                    <th className="px-5 py-3">Requirement / City</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {recentLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-zinc-500">
                        No inbound leads yet. Website inquiries will appear here automatically.
                      </td>
                    </tr>
                  ) : (
                    recentLeads.map((lead) => {
                      const parsed = parseLeadNotes(lead.notes);
                      return (
                        <tr key={lead.id} className="transition-colors hover:bg-white/[0.02]">
                          <td className="px-5 py-3">
                            <p className="font-medium text-white">{lead.name}</p>
                            <p className="text-[11px] text-zinc-500">
                              {lead.company || lead.source || "website"}
                            </p>
                          </td>
                          <td className="px-5 py-3 text-zinc-300">
                            <span>{parsed.service || "General Inquiry"}</span>
                            {parsed.city && (
                              <span className="text-zinc-500"> · {parsed.city}</span>
                            )}
                          </td>
                          <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">
                            {lead.phone || lead.email || "—"}
                          </td>
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-1.5 capitalize text-zinc-200">
                              <span
                                className={`size-1.5 rounded-full ${
                                  LEAD_DOT[lead.status ?? "new"] ?? "bg-zinc-400"
                                }`}
                              />
                              {lead.status ?? "new"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent GST Invoices */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Recent GST Invoices</h2>
                <p className="text-xs text-zinc-500">
                  Billing ledger with instant tax invoice print view
                </p>
              </div>
              <Link
                href="/admin/erp/invoices"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#ff9f1c] hover:underline"
              >
                <span>All ({allInvoices.length})</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-5 py-3">Invoice #</th>
                    <th className="px-5 py-3">Client</th>
                    <th className="px-5 py-3">Due Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {recentInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-zinc-500">
                        No invoices generated yet. Click &ldquo;New GST Invoice&rdquo; to bill a client.
                      </td>
                    </tr>
                  ) : (
                    recentInvoices.map((inv) => (
                      <tr key={inv.id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/erp/invoices/${inv.id}`}
                            className="font-mono font-semibold text-[#ff9f1c] hover:underline"
                          >
                            {inv.invoiceNumber}
                          </Link>
                        </td>
                        <td className="px-5 py-3 text-zinc-300">
                          {inv.clientId ? clientMap.get(inv.clientId) ?? "Client" : "Direct Client"}
                        </td>
                        <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">
                          {inv.dueDate || "—"}
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1.5 capitalize text-zinc-200">
                            <span
                              className={`size-1.5 rounded-full ${
                                INVOICE_DOT[inv.status ?? "draft"] ?? "bg-zinc-400"
                              }`}
                            />
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-mono font-semibold tabular-nums text-white">
                          {formatInr(inv.total)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Action Queue (Follow-ups + Open Tickets + CMS Footprint) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Pending Follow-ups */}
          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 text-[#ff9f1c]" />
                <h3 className="text-sm font-semibold text-white">Pending Follow-ups</h3>
              </div>
              <Link
                href="/admin/crm/followups"
                className="text-xs font-medium text-zinc-400 hover:text-white"
              >
                Manage
              </Link>
            </div>

            <div className="mt-4 divide-y divide-white/[0.06]">
              {pendingFollowUps.length === 0 ? (
                <p className="py-5 text-center text-xs text-zinc-500">
                  No pending callbacks or reminders.
                </p>
              ) : (
                pendingFollowUps.map((f) => {
                  const overdue = Boolean(f.dueDate && f.dueDate < todayIso);
                  return (
                    <div key={f.id} className="py-2.5 first:pt-0 last:pb-0">
                      <p className="text-xs text-zinc-200">{f.note}</p>
                      {f.dueDate && (
                        <p
                          className={`mt-1 flex items-center gap-1 font-mono text-[11px] ${
                            overdue ? "text-rose-400" : "text-zinc-500"
                          }`}
                        >
                          <Clock className="size-3" />
                          <span>{f.dueDate}</span>
                          {overdue && <span>· Overdue</span>}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Open Support Tickets */}
          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="size-4 text-rose-400" />
                <h3 className="text-sm font-semibold text-white">Support Desk Queue</h3>
              </div>
              <Link
                href="/admin/erp/tickets"
                className="text-xs font-medium text-zinc-400 hover:text-white"
              >
                Open Desk
              </Link>
            </div>

            <div className="mt-4 divide-y divide-white/[0.06]">
              {openTickets.length === 0 ? (
                <p className="py-5 text-center text-xs text-zinc-500">
                  Zero open support tickets.
                </p>
              ) : (
                openTickets.map((t) => (
                  <Link
                    key={t.id}
                    href="/admin/erp/tickets"
                    className="block py-2.5 transition-colors first:pt-0 last:pb-0 hover:text-white"
                  >
                    <p className="truncate text-xs font-medium text-zinc-200">{t.title}</p>
                    <p className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-500">
                      <span
                        className={`font-mono uppercase ${
                          PRIORITY_TONE[t.priority ?? "medium"] ?? "text-zinc-400"
                        }`}
                      >
                        {t.priority}
                      </span>
                      <span>·</span>
                      <span className="capitalize">{(t.status ?? "open").replace("_", " ")}</span>
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* CMS Publishing Footprint */}
          <div className="rounded-xl border border-white/10 bg-[#0d0f14] p-5">
            <h3 className="text-sm font-semibold text-white">CMS Publishing Footprint</h3>
            <p className="mt-0.5 text-xs text-zinc-500">Live records served on mlhk.in</p>

            <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-lg border border-white/10 bg-[#07080a] py-3 text-center">
              <div>
                <p className="font-mono text-lg font-bold tabular-nums text-white">
                  {publishedPosts.length}
                </p>
                <p className="text-[11px] text-zinc-500">Articles</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold tabular-nums text-white">
                  {allPages.length}
                </p>
                <p className="text-[11px] text-zinc-500">Pages</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold tabular-nums text-white">
                  {allPortfolio.length}
                </p>
                <p className="text-[11px] text-zinc-500">Portfolio</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/admin/cms/posts"
                className="rounded-lg border border-white/10 py-2 text-center text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Manage Blog
              </Link>
              <Link
                href="/admin/cms/media"
                className="rounded-lg border border-white/10 py-2 text-center text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Media Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
