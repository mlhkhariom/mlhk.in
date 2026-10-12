import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import LeadActions from "./LeadActions";
import { Users, Mail, Phone, Building } from "lucide-react";

const statusColor: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  new: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
    border: "border-blue-500/30",
  },
  contacted: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
    border: "border-amber-500/30",
  },
  proposal: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    dot: "bg-purple-400",
    border: "border-purple-500/30",
  },
  won: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "border-emerald-500/30",
  },
  lost: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    dot: "bg-rose-400",
    border: "border-rose-500/30",
  },
};

export default async function LeadsPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const allLeads = await db.select().from(leads).orderBy(sql`created_at desc`).all();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            Inbound Leads
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Prospect inquiries captured via public contact forms and phone inquiries.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400 sm:self-auto">
          {allLeads.length} Total Leads
        </span>
      </div>

      {/* Main Table Card */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d11]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                <th className="px-5 py-3.5">Lead Name</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Company / Org</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">Pipeline Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                      <Users className="size-6" />
                    </div>
                    <p className="mt-3 font-medium text-zinc-300">No leads recorded yet</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Inquiries from the website contact form will appear here in real time.
                    </p>
                  </td>
                </tr>
              ) : (
                allLeads.map((lead) => {
                  const s = statusColor[lead.status ?? "new"] || statusColor.new;
                  return (
                    <tr key={lead.id} className="group transition-colors hover:bg-white/[0.03]">
                      <td className="px-5 py-3.5 font-medium text-white">
                        {lead.name}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-400">
                        <div className="space-y-1">
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1.5 transition-colors hover:text-white"
                            >
                              <Mail size={12} className="text-zinc-500" />
                              {lead.email}
                            </a>
                          )}
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 transition-colors hover:text-white"
                            >
                              <Phone size={12} className="text-zinc-500" />
                              {lead.phone}
                            </a>
                          )}
                          {!lead.email && !lead.phone && "—"}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-400">
                        {lead.company ? (
                          <div className="flex items-center gap-1.5">
                            <Building size={12} className="text-zinc-500" />
                            {lead.company}
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                          {lead.source ?? "Website"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.border} ${s.bg} ${s.text}`}
                        >
                          <span className={`size-1.5 rounded-full ${s.dot}`} />
                          {lead.status ?? "new"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <LeadActions id={lead.id} currentStatus={lead.status ?? "new"} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
