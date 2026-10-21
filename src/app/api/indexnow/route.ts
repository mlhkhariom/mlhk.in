import { NextResponse } from "next/server";
import { BRAND, SERVICE_DETAILS, VENTURES } from "@/lib/brand";
import { safeDb } from "@/lib/db/safe";
import { blogPosts, pages, subsidiaries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const INDEXNOW_KEY = "c8d35f963b2149b1a5e128b941de51ab";
const HOST = "mlhk.in";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

export async function submitToIndexNow(customUrls?: string[]) {
  const baseUrls = [
    `https://${HOST}`,
    `https://${HOST}/about`,
    `https://${HOST}/services`,
    `https://${HOST}/portfolio`,
    `https://${HOST}/blog`,
    `https://${HOST}/contact`,
    `https://${HOST}/subsidiaries`,
    `https://${HOST}/process`,
    `https://${HOST}/faq`,
    `https://${HOST}/ai-automation`,
    `https://${HOST}/privacy-policy`,
    `https://${HOST}/terms-and-conditions`,
    `https://${HOST}/terms-of-service`,
    `https://${HOST}/cancellation-refund-policy`,
    ...SERVICE_DETAILS.map((s) => `https://${HOST}/services/${s.slug}`),
    ...VENTURES.map((v) => `https://${HOST}/subsidiaries/${v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
  ];

  // Attempt to fetch any published blog posts or CMS pages from database
  let dynamicUrls: string[] = [];
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
        ...posts.map((p) => `https://${HOST}/blog/${p.slug}`),
        ...dbPages.map((p) => `https://${HOST}/p/${p.slug}`),
        ...dbSubs.map((s) => `https://${HOST}/subsidiaries/${s.slug}`),
      ];
    }
  } catch (e) {
    // Continue with static URLs
  }

  const finalUrlList = Array.from(new Set(customUrls && customUrls.length > 0 ? customUrls : [...baseUrls, ...dynamicUrls]));

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
    })
  );

  return {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    totalUrls: finalUrlList.length,
    urlList: finalUrlList,
    submissions: results.map((r, i) =>
      r.status === "fulfilled"
        ? r.value
        : { endpoint: INDEXNOW_ENDPOINTS[i], status: 500, statusText: "Failed", ok: false }
    ),
    timestamp: new Date().toISOString(),
  };
}

export async function GET() {
  const result = await submitToIndexNow();
  return NextResponse.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { urls?: string[] };
    const result = await submitToIndexNow(body.urls);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "submission_failed", message: error?.message || "Internal error submitting to IndexNow" },
      { status: 500 }
    );
  }
}

