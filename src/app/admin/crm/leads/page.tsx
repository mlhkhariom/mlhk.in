import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import LeadActions from "./LeadActions";

export const runtime = "edge";

const statusColor: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-yellow-50 text-yellow-600",
  proposal: "bg-purple-50 text-purple-600",
  won: "bg-green-50 text-green-600",
  lost: "bg-red-50 text-red-600",
};

export default async function LeadsPage() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);
  const allLeads = await db.select().from(leads).orderBy(sql`created_at desc`).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads <span className="text-gray-400 text-lg font-normal">({allLeads.length})</span></h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {["Name", "Email", "Phone", "Company", "Source", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allLeads.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-gray-400">No leads yet</td></tr>
              ) : allLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-500">{lead.email ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{lead.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{lead.company ?? "—"}</td>
                  <td className="px-4 py-3"><span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{lead.source}</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusColor[lead.status ?? "new"]}`}>{lead.status}</span>
                  </td>
                  <td className="px-4 py-3"><LeadActions id={lead.id} currentStatus={lead.status ?? "new"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
