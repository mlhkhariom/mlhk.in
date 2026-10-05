import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, tickets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  open: "bg-orange-50 text-orange-700",
  in_progress: "bg-blue-50 text-blue-700",
  resolved: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default async function PortalTickets() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/tickets");

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return <p className="text-gray-500 text-center py-20">No client account linked.</p>;
  }

  const allTickets = await db.select().from(tickets).where(eq(tickets.clientId, client.id)).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
      </div>
      {allTickets.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No tickets yet.</p>
      ) : (
        <div className="grid gap-4">
          {allTickets.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{t.title}</h3>
                  {t.description && <p className="text-sm text-gray-500 mt-1">{t.description}</p>}
                  <p className="text-xs text-gray-400 mt-1">Priority: {t.priority}</p>
                </div>
                <Badge className={statusColor[t.status ?? "open"]}>{t.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
