import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { LeadsWorkspace } from "./LeadsWorkspace";
import type { CrmLeadRecord } from "@/lib/crm-utils";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  let allLeads: CrmLeadRecord[] = [];
  let dbWarning: string | null = null;

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env?.DB) {
      dbWarning = "Cloudflare D1 binding is not attached in this local preview environment. Deploy to Cloudflare Workers or bind D1 locally to load live leads.";
    } else {
      const db = getDb(env.DB);
      allLeads = await db.select().from(leads).orderBy(sql`created_at desc`).all();
    }
  } catch (err) {
    console.error("[ADMIN_LEADS_PAGE_ERROR]", err);
    dbWarning = "Could not connect to D1 leads table. Verify database migrations and D1 binding.";
  }

  return <LeadsWorkspace initialLeads={allLeads} dbWarning={dbWarning} />;
}
