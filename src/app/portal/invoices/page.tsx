import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Receipt, Calendar, ArrowUpRight } from "lucide-react";
import Breadcrumbs from "@/components/public/Breadcrumbs";

const statusStyle: Record<string, string> = {
  draft: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  sent: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  paid: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-400",
  cancelled: "border-zinc-600/30 bg-zinc-600/10 text-zinc-500",
};

export const dynamic = "force-dynamic";

export default async function PortalInvoices() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/invoices");

  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return (
      <div className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Invoices" }]} className="px-0 pt-0 pb-6" />
        <p className="text-zinc-500">No client account linked.</p>
      </div>
    );
  }

  const allInvoices = await db.select().from(invoices).where(eq(invoices.clientId, client.id)).all();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "My Invoices" }]} className="px-0 pt-0 pb-6" />

      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#ffb84d]">
          Financial Ledgers & Statements
        </p>
        <h1 className="mt-1.5 sm:mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          My Invoices
        </h1>
      </div>

      {allInvoices.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 sm:p-12 text-center">
          <Receipt className="mx-auto size-10 text-zinc-600" strokeWidth={1.5} />
          <p className="mt-4 font-display text-base sm:text-lg font-semibold text-zinc-400">No invoices generated yet.</p>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600">Your billing statements and payment records will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {allInvoices.map((inv) => (
            <div
              key={inv.id}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 transition-all duration-300 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-mono text-xs text-[#ffb84d]">#{inv.invoiceNumber}</span>
                <p className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                  ₹{(inv.total ?? 0).toLocaleString("en-IN")}
                </p>
                {inv.dueDate && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-400">
                    <Calendar className="size-3.5" />
                    <span>Due Date: {inv.dueDate}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2.5 border-t border-white/5 sm:border-t-0 sm:pt-0">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                    statusStyle[inv.status ?? "draft"] || statusStyle.draft
                  }`}
                >
                  {inv.status ?? "draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
