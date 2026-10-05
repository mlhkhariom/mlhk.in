import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionFromHeaders } from "@/lib/auth/session";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { clients, projects, tasks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColor: Record<string, string> = {
  planning: "bg-yellow-50 text-yellow-700",
  active: "bg-green-50 text-green-700",
  on_hold: "bg-gray-100 text-gray-600",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-600",
};

export default async function PortalProjects() {
  const session = await getSessionFromHeaders(await headers());
  if (!session) redirect("/login?next=/portal/projects");

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [client] = await db.select().from(clients).where(eq(clients.userId, session.user.id)).limit(1);

  if (!client) {
    return <p className="text-gray-500 text-center py-20">No client account linked.</p>;
  }

  const allProjects = await db.select().from(projects).where(eq(projects.clientId, client.id)).all();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Projects</h1>
      {allProjects.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No projects yet.</p>
      ) : (
        <div className="grid gap-4">
          {allProjects.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  {p.description && <p className="text-sm text-gray-500 mt-1">{p.description}</p>}
                  {p.startDate && <p className="text-xs text-gray-400 mt-1">Started: {p.startDate}</p>}
                </div>
                <Badge className={statusColor[p.status ?? "planning"]}>{p.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
