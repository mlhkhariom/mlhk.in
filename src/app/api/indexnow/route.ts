import { NextRequest, NextResponse } from "next/server";
import { SERVICE_DETAILS } from "@/lib/brand";
import { safeDb } from "@/lib/db/safe";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/session";
import {
  BASE_URL,
  CANONICAL_HOST,
  CORE_STATIC_PATHS,
  buildCanonicalUrl,
} from "@/lib/seo-utils";

export const dynamic = "force-dynamic";

const INDEXNOW_KEY = "c8d35f963b2149b1a5e128b941de51ab";
const HOST = CANONICAL_HOST;
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

function filterCanonicalHostUrls(urls: string[]): string[] {
  return Array.from(
    new Set(
      urls
        .map((u) => (typeof u === "string" ? u.trim() : ""))
        .filter((u) => {
          try {
            const parsed = new URL(u);
            return parsed.protocol === "https:" && parsed.hostname === HOST;
          } catch {
            return false;
          }
        }),
    ),
  );
}

export async function submitToIndexNow(customUrls?: string[]) {
  const baseUrls = [
    ...CORE_STATIC_PATHS.map((entry) => buildCanonicalUrl(entry.path)),
    ...SERVICE_DETAILS.map((s) => `${BASE_URL}/services/${s.slug}`),
  ];

  // Fetch verified published blog posts, CMS pages, and active subsidiaries from D1
  let dynamicUrls: string[] = [];
  if (!customUrls || customUrls.length === 0) {
    try {
      const db = safeDb();
      if (db) {
        const [posts, dbPages, dbSubs] = await Promise.all([
          db
            .select({ slug: blogPosts.slug })
            .from(blogPosts)
            .where(eq(blogPosts.status, "published"))
            .all()
            .catch(() => []),
          db
            .select({ slug: pages.slug })
            .from(pages)
            .where(eq(pages.status, "published"))
            .all()
            .catch(() => []),
          db
            .select({ slug: subsidiaries.slug })
            .from(subsidiaries)
            .where(eq(subsidiaries.active, true))
            .all()
            .catch(() => []),
        ]);

        dynamicUrls = [
          ...posts.map((p) => `${BASE_URL}/blog/${p.slug}`),
          ...dbPages.map((p) => `${BASE_URL}/p/${p.slug}`),
          ...dbSubs.map((s) => `${BASE_URL}/subsidiaries/${s.slug}`),
        ];
      }
    } catch {
      // Continue with verified static URLs
    }
  }

  const finalUrlList = filterCanonicalHostUrls(
    customUrls && customUrls.length > 0 ? customUrls : [...baseUrls, ...dynamicUrls],
  );

  if (finalUrlList.length === 0) {
    return {
      host: HOST,
      keyLocation: KEY_LOCATION,
      totalUrls: 0,
      urlList: [],
      submissions: [],
      timestamp: new Date().toISOString(),
    };
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: finalUrlList,
  };

  const results = await Promise.allSettled(
    INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      return {
        endpoint,
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
      };
    }),
  );

  return {
    host: HOST,
    keyLocation: KEY_LOCATION,
    totalUrls: finalUrlList.length,
    urlList: finalUrlList,
    submissions: results.map((r, i) =>
      r.status === "fulfilled"
        ? r.value
        : { endpoint: INDEXNOW_ENDPOINTS[i], status: 500, statusText: "Failed", ok: false },
    ),
    timestamp: new Date().toISOString(),
  };
}

/** Fire-and-forget helper called on CMS publish so new content pings search engines automatically. */
export async function pingIndexNowUrls(urls: string[]): Promise<void> {
  try {
    await submitToIndexNow(urls);
  } catch {
    // Non-blocking best-effort indexing notification
  }
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const result = await submitToIndexNow();
  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const body = (await req.json().catch(() => ({}))) as { urls?: string[] };
    const result = await submitToIndexNow(body.urls);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "submission_failed",
        message: error instanceof Error ? error.message : "Internal error submitting to IndexNow",
      },
      { status: 500 },
    );
  }
}
