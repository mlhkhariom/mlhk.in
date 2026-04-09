import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";

export const runtime = "edge";

export default async function ClientsPage() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const allClients = await db.select().from(clients).orderBy(sql`created_at desc`).all();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Clients <span className="text-gray-400 text-lg font-normal">({allClients.length})</span></h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Name", "Company", "Email", "Phone", "GST", "Added"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allClients.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No clients yet</td></tr>
              ) : allClients.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-3 text-gray-500">{c.company ?? "—"}</td>
                  <td className="px-6 py-3 text-gray-500">{c.email ?? "—"}</td>
                  <td className="px-6 py-3 text-gray-500">{c.phone ?? "—"}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs font-mono">{c.gst ?? "—"}</td>
                  <td className="px-6 py-3 text-gray-400 text-xs">{c.createdAt?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
