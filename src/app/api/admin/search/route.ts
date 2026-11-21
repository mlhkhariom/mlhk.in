import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import {
  blogPosts,
  pages,
  leads,
  clients,
  projects,
  invoices,
  tickets,
  expenses,
  services,
  portfolio,
} from "@/lib/db/schema";
import { like, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json([]);

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) return NextResponse.json([]);
    const db = getDb(env.DB);
    const pattern = `%${q}%`;

    const [posts, pgs, lds, cls, prjs, invs, tcks, exps, svcs, port] = await Promise.all([
      db.select({ id: blogPosts.id, title: blogPosts.title, type: blogPosts.status }).from(blogPosts).where(like(blogPosts.title, pattern)).limit(4),
      db.select({ id: pages.id, title: pages.title, type: pages.status }).from(pages).where(like(pages.title, pattern)).limit(3),
      db
        .select({ id: leads.id, title: leads.name, type: leads.status })
        .from(leads)
        .where(or(like(leads.name, pattern), like(leads.email, pattern), like(leads.phone, pattern), like(leads.company, pattern)))
        .limit(5),
      db
        .select({ id: clients.id, title: clients.name, type: clients.company })
        .from(clients)
        .where(or(like(clients.name, pattern), like(clients.company, pattern), like(clients.gst, pattern)))
        .limit(5),
      db.select({ id: projects.id, title: projects.title, type: projects.status }).from(projects).where(like(projects.title, pattern)).limit(4),
      db.select({ id: invoices.id, title: invoices.invoiceNumber, type: invoices.status }).from(invoices).where(like(invoices.invoiceNumber, pattern)).limit(4),
      db.select({ id: tickets.id, title: tickets.title, type: tickets.status }).from(tickets).where(like(tickets.title, pattern)).limit(4),
      db.select({ id: expenses.id, title: expenses.title, type: expenses.category }).from(expenses).where(like(expenses.title, pattern)).limit(3),
      db.select({ id: services.id, title: services.title, type: services.id }).from(services).where(like(services.title, pattern)).limit(3),
      db.select({ id: portfolio.id, title: portfolio.title, type: portfolio.id }).from(portfolio).where(like(portfolio.title, pattern)).limit(3),
    ]);

    return NextResponse.json([
      ...lds.map((r) => ({ ...r, module: "Lead", href: `/admin/crm/leads` })),
      ...cls.map((r) => ({ ...r, module: "Client", href: `/admin/crm/clients` })),
      ...prjs.map((r) => ({ ...r, module: "Project", href: `/admin/erp/projects` })),
      ...invs.map((r) => ({ ...r, module: "Invoice", href: `/admin/erp/invoices/${r.id}` })),
      ...tcks.map((r) => ({ ...r, module: "Ticket", href: `/admin/erp/tickets` })),
      ...exps.map((r) => ({ ...r, module: "Expense", href: `/admin/erp/expenses` })),
      ...posts.map((r) => ({ ...r, module: "Blog", href: `/admin/cms/posts/${r.id}/edit` })),
      ...pgs.map((r) => ({ ...r, module: "Page", href: `/admin/cms/pages` })),
      ...svcs.map((r) => ({ ...r, module: "Service", href: `/admin/cms/services` })),
      ...port.map((r) => ({ ...r, module: "Portfolio", href: `/admin/cms/portfolio` })),
    ]);
  } catch (err) {
    console.error("[ADMIN_SEARCH_ERROR]", err);
    return NextResponse.json([]);
  }
}
