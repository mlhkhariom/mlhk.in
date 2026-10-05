import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, projects, invoices, tickets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Receipt, Ticket } from "lucide-react";
import Link from "next/link";

export default async function PortalDashboard() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/dashboard");
  const userId = session.user.id;

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  // Find client record linked to this user
  const [client] = await db.select().from(clients).where(eq(clients.userId, userId)).limit(1);

  if (!client) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {session.user.name}</h1>
        <p className="text-gray-500">Your client account hasn't been linked yet. Please contact support.</p>
      </div>
    );
  }

  const [activeProjects, openTickets, pendingInvoices] = await Promise.all([
    db.select().from(projects).where(eq(projects.clientId, client.id)).all(),
    db.select().from(tickets).where(eq(tickets.clientId, client.id)).all(),
    db.select().from(invoices).where(eq(invoices.clientId, client.id)).all(),
  ]);

  const stats = [
    { label: "Projects", value: activeProjects.length, href: "/portal/projects", icon: FolderKanban, color: "text-purple-600 bg-purple-50" },
    { label: "Invoices", value: pendingInvoices.length, href: "/portal/invoices", icon: Receipt, color: "text-green-600 bg-green-50" },
    { label: "Support Tickets", value: openTickets.length, href: "/portal/tickets", icon: Ticket, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {session.user.name} 👋</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, href, icon: Icon, color }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={18} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
