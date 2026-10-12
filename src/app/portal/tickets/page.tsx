import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, tickets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Ticket, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/public/Breadcrumbs";

const statusStyle: Record<string, string> = {
  open: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  in_progress: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  closed: "border-zinc-500/30 bg-zinc-500/10 text-zinc-500",
};

export const dynamic = "force-dynamic";

export default async function PortalTickets() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/tickets");

  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return (
      <div className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Tickets" }]} className="px-0 pt-0 pb-6" />
        <p className="text-zinc-500">No client account linked.</p>
      </div>
    );
  }

  const allTickets = await db.select().from(tickets).where(eq(tickets.clientId, client.id)).all();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Support Tickets" }]} className="px-0 pt-0 pb-6" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#ffb84d]">
            Enterprise Helpdesk
          </p>
          <h1 className="mt-1.5 sm:mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Support Tickets
          </h1>
        </div>
        <a
          href="mailto:support@mlhk.in"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9f1c] px-4 py-2.5 text-xs font-semibold text-black hover:bg-[#ffb84d] transition-colors self-start sm:self-auto"
        >
          <AlertCircle className="size-3.5" />
          <span>Raise New Request</span>
        </a>
      </div>

      {allTickets.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 sm:p-12 text-center">
          <Ticket className="mx-auto size-10 text-zinc-600" strokeWidth={1.5} />
          <p className="mt-4 font-display text-base sm:text-lg font-semibold text-zinc-400">No active support tickets.</p>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600">Raise a ticket or email support@mlhk.in whenever you need assistance.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {allTickets.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 transition-all duration-300 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04] md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                  {t.title}
                </h3>
                {t.description && (
                  <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400">
                    {t.description}
                  </p>
                )}
                <div className="mt-2.5 flex items-center gap-3 text-xs text-zinc-500">
                  <span>Priority: <strong className="text-zinc-300 uppercase">{t.priority}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end pt-2.5 border-t border-white/5 md:border-t-0 md:pt-0">
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                    statusStyle[t.status ?? "open"] || statusStyle.open
                  }`}
                >
                  {t.status?.replace("_", " ") ?? "open"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
