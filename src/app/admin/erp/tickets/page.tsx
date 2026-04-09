import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { tickets, clients } from "@/lib/db/schema";
import { sql, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";

export const runtime = "edge";

const statusColor: Record<string, string> = {
  open: "bg-red-50 text-red-600",
  in_progress: "bg-yellow-50 text-yellow-600",
  resolved: "bg-green-50 text-green-600",
  closed: "bg-gray-100 text-gray-500",
};
const priorityColor: Record<string, string> = {
  low: "bg-gray-100 text-gray-500",
  medium: "bg-blue-50 text-blue-600",
  high: "bg-orange-50 text-orange-600",
  urgent: "bg-red-50 text-red-600",
};

export default async function TicketsPage() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const allTickets = await db.select({ ticket: tickets, clientName: clients.name })
    .from(tickets).leftJoin(clients, eq(tickets.clientId, clients.id))
    .orderBy(sql`tickets.created_at desc`).all();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Title", "Client", "Priority", "Status", "Created"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTickets.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No tickets yet</td></tr>
              ) : allTickets.map(({ ticket, clientName }) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{ticket.title}</td>
                  <td className="px-6 py-3 text-gray-500">{clientName ?? "—"}</td>
                  <td className="px-6 py-3"><span className={`text-xs px-2 py-0.5 rounded ${priorityColor[ticket.priority ?? "medium"]}`}>{ticket.priority}</span></td>
                  <td className="px-6 py-3"><span className={`text-xs px-2 py-0.5 rounded ${statusColor[ticket.status ?? "open"]}`}>{ticket.status}</span></td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{ticket.createdAt?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
