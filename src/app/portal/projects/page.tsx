import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FolderKanban, Calendar, Clock } from "lucide-react";
import Breadcrumbs from "@/components/public/Breadcrumbs";

const statusStyle: Record<string, string> = {
  planning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  on_hold: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  completed: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  cancelled: "border-red-500/30 bg-red-500/10 text-red-400",
};

export const dynamic = "force-dynamic";

export default async function PortalProjects() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/projects");

  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return (
      <div className="py-20 text-center">
        <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "Projects" }]} className="px-0 pt-0 pb-6" />
        <p className="text-zinc-500">No client account linked.</p>
      </div>
    );
  }

  const allProjects = await db.select().from(projects).where(eq(projects.clientId, client.id)).all();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Portal", href: "/portal/dashboard" }, { label: "My Projects" }]} className="px-0 pt-0 pb-6" />

      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#ffb84d]">
          Delivery Pipeline
        </p>
        <h1 className="mt-1.5 sm:mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          My Projects
        </h1>
      </div>

      {allProjects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 sm:p-12 text-center">
          <FolderKanban className="mx-auto size-10 text-zinc-600" strokeWidth={1.5} />
          <p className="mt-4 font-display text-base sm:text-lg font-semibold text-zinc-400">No projects actively assigned yet.</p>
          <p className="mt-1 text-xs sm:text-sm text-zinc-600">Your upcoming deliverables and milestones will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {allProjects.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 transition-all duration-300 hover:border-[#ff9f1c]/30 hover:bg-white/[0.04] md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white transition-colors group-hover:text-[#ffb84d]">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400">
                    {p.description}
                  </p>
                )}
                <div className="mt-2.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-500">
                  {p.startDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      <span>Started: {p.startDate}</span>
                    </span>
                  )}
                  {p.endDate && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      <span>Target: {p.endDate}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end pt-2.5 border-t border-white/5 md:border-t-0 md:pt-0">
                <span
                  className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                    statusStyle[p.status ?? "planning"] || statusStyle.planning
                  }`}
                >
                  {p.status?.replace("_", " ") ?? "Planning"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
