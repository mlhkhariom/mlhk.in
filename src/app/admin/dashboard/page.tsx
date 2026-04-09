import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads, clients, projects, invoices, tickets } from "@/lib/db/schema";
import { eq, count, sql } from "drizzle-orm";
import { Users, FolderKanban, Receipt, Ticket, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const runtime = "edge";

export default async function AdminDashboard() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const [[totalLeads], [newLeads], [totalClients], [activeProjects], [openTickets], [pendingInvoices]] = await Promise.all([
    db.select({ count: count() }).from(leads),
    db.select({ count: count() }).from(leads).where(eq(leads.status, "new")),
    db.select({ count: count() }).from(clients),
    db.select({ count: count() }).from(projects).where(eq(projects.status, "active")),
    db.select({ count: count() }).from(tickets).where(eq(tickets.status, "open")),
    db.select({ count: count() }).from(invoices).where(eq(invoices.status, "sent")),
  ]);

  const stats = [
    { label: "Total Leads", value: totalLeads.count, sub: `${newLeads.count} new`, icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
    { label: "Clients", value: totalClients.count, sub: "registered", icon: Users, color: "text-green-600 bg-green-50" },
    { label: "Active Projects", value: activeProjects.count, sub: "in progress", icon: FolderKanban, color: "text-purple-600 bg-purple-50" },
    { label: "Open Tickets", value: openTickets.count, sub: "need attention", icon: Ticket, color: "text-orange-600 bg-orange-50" },
    { label: "Pending Invoices", value: pendingInvoices.count, sub: "awaiting payment", icon: Receipt, color: "text-red-600 bg-red-50" },
  ];

  const recentLeads = await db.select().from(leads).orderBy(sql`created_at desc`).limit(5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Hariom 👋</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs font-medium text-gray-700 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Name", "Email", "Phone", "Source", "Status"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentLeads.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No leads yet</td></tr>
              ) : recentLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-3 text-gray-500">{lead.email ?? "—"}</td>
                  <td className="px-6 py-3 text-gray-500">{lead.phone ?? "—"}</td>
                  <td className="px-6 py-3"><span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">{lead.source}</span></td>
                  <td className="px-6 py-3"><span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded">{lead.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
