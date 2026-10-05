import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-blue-50 text-blue-700",
  paid: "bg-green-50 text-green-700",
  overdue: "bg-red-50 text-red-600",
  cancelled: "bg-gray-100 text-gray-400",
};

export default async function PortalInvoices() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/invoices");

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return <p className="text-gray-500 text-center py-20">No client account linked.</p>;
  }

  const allInvoices = await db.select().from(invoices).where(eq(invoices.clientId, client.id)).all();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Invoices</h1>
      {allInvoices.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No invoices yet.</p>
      ) : (
        <div className="grid gap-4">
          {allInvoices.map((inv) => (
            <Card key={inv.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{inv.invoiceNumber}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Amount: ₹{(inv.total ?? 0).toLocaleString("en-IN")}
                  </p>
                  {inv.dueDate && <p className="text-xs text-gray-400 mt-0.5">Due: {inv.dueDate}</p>}
                </div>
                <Badge className={statusColor[inv.status ?? "draft"]}>{inv.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
