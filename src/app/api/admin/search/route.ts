import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { blogPosts, pages, leads, clients, projects, services, portfolio } from "@/lib/db/schema";
import { like, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json([]);

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const pattern = `%${q}%`;

  const [posts, pgs, lds, cls, prjs, svcs, port] = await Promise.all([
    db.select({ id: blogPosts.id, title: blogPosts.title, type: blogPosts.status }).from(blogPosts).where(like(blogPosts.title, pattern)).limit(5),
    db.select({ id: pages.id, title: pages.title, type: pages.status }).from(pages).where(like(pages.title, pattern)).limit(3),
    db.select({ id: leads.id, title: leads.name, type: leads.status }).from(leads).where(or(like(leads.name, pattern), like(leads.email ?? "", pattern))).limit(5),
    db.select({ id: clients.id, title: clients.name, type: clients.company }).from(clients).where(like(clients.name, pattern)).limit(5),
    db.select({ id: projects.id, title: projects.title, type: projects.status }).from(projects).where(like(projects.title, pattern)).limit(5),
    db.select({ id: services.id, title: services.title, type: services.id }).from(services).where(like(services.title, pattern)).limit(3),
    db.select({ id: portfolio.id, title: portfolio.title, type: portfolio.id }).from(portfolio).where(like(portfolio.title, pattern)).limit(3),
  ]);

  return NextResponse.json([
    ...posts.map(r => ({ ...r, module: "Blog", href: `/admin/cms/posts/${r.id}/edit` })),
    ...pgs.map(r => ({ ...r, module: "Pages", href: `/admin/cms/pages` })),
    ...lds.map(r => ({ ...r, module: "Lead", href: `/admin/crm/leads` })),
    ...cls.map(r => ({ ...r, module: "Client", href: `/admin/crm/clients` })),
    ...prjs.map(r => ({ ...r, module: "Project", href: `/admin/erp/projects` })),
    ...svcs.map(r => ({ ...r, module: "Service", href: `/admin/cms/services` })),
    ...port.map(r => ({ ...r, module: "Portfolio", href: `/admin/cms/portfolio` })),
  ]);
}
