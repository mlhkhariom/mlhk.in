import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeSeoTitle,
  buildCanonicalUrl,
  shouldRedirectToApex,
  shouldNoIndexHost,
  isNoIndexPath,
  escapeHtml,
  pickAllowedFields,
  buildPanIndiaAreaServed,
  CORE_STATIC_PATHS,
  INDIA_STATES_AND_UTS,
} from "./seo-utils";
import { LOCATION_HUBS, getLocationHub, INDIA_ZONE_DIRECTORY } from "./seo-locations";
import { SOLUTION_PAGES, getSolutionPage } from "./seo-solutions";

test("normalizeSeoTitle strips duplicate MLHK Infotech suffixes cleanly", () => {
  assert.equal(
    normalizeSeoTitle("Web Development Engineering in India | MLHK Infotech"),
    "Web Development Engineering in India",
  );
  assert.equal(
    normalizeSeoTitle("About Us — MLHK Infotech"),
    "About Us",
  );
  assert.equal(
    normalizeSeoTitle("Contact MLHK Infotech | Direct Founder & Engineering Desk"),
    "Contact MLHK Infotech | Direct Founder & Engineering Desk",
  );
  assert.equal(normalizeSeoTitle("MLHK Infotech"), "MLHK Infotech");
});

test("buildCanonicalUrl produces clean canonical https://mlhk.in URLs", () => {
  assert.equal(buildCanonicalUrl(), "https://mlhk.in");
  assert.equal(buildCanonicalUrl("/"), "https://mlhk.in");
  assert.equal(buildCanonicalUrl("/services/web-development/"), "https://mlhk.in/services/web-development");
  assert.equal(buildCanonicalUrl("blog/test?ref=1#top"), "https://mlhk.in/blog/test");
});

test("host guards identify www redirects and non-canonical mirror hosts", () => {
  assert.equal(shouldRedirectToApex("www.mlhk.in"), true);
  assert.equal(shouldRedirectToApex("www.mlhk.in:443"), true);
  assert.equal(shouldRedirectToApex("mlhk.in"), false);
  assert.equal(shouldRedirectToApex("localhost:3000"), false);

  assert.equal(shouldNoIndexHost("mlhk-in.account.workers.dev"), true);
  assert.equal(shouldNoIndexHost("preview.mlhk.pages.dev"), true);
  assert.equal(shouldNoIndexHost("mlhk.in"), false);
});

test("isNoIndexPath flags private/auth/API routes and leaves public pages indexable", () => {
  assert.equal(isNoIndexPath("/login"), true);
  assert.equal(isNoIndexPath("/register"), true);
  assert.equal(isNoIndexPath("/admin/dashboard"), true);
  assert.equal(isNoIndexPath("/portal/invoices"), true);
  assert.equal(isNoIndexPath("/api/contact"), true);

  assert.equal(isNoIndexPath("/"), false);
  assert.equal(isNoIndexPath("/services/web-development"), false);
  assert.equal(isNoIndexPath("/locations/indore"), false);
  assert.equal(isNoIndexPath("/solutions/seo-and-google-ranking-services"), false);
  assert.equal(isNoIndexPath("/blog"), false);
});

test("escapeHtml neutralizes HTML injection characters", () => {
  assert.equal(
    escapeHtml(`<script>alert("xss")</script> & 'test'`),
    "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;test&#39;",
  );
});

test("pickAllowedFields blocks mass assignment of disallowed keys", () => {
  const allowed = new Set(["title", "slug", "status"]);
  const filtered = pickAllowedFields(
    { id: "evil", title: "Hello", slug: "hello", role: "super_admin", status: "published" },
    allowed,
  );
  assert.deepEqual(filtered, { title: "Hello", slug: "hello", status: "published" });
  assert.equal("id" in filtered, false);
  assert.equal("role" in filtered, false);
});

test("CORE_STATIC_PATHS includes /locations and /solutions and excludes redirected aliases", () => {
  const paths = CORE_STATIC_PATHS.map((entry) => entry.path);
  assert.equal(paths.includes("/terms-of-service"), false);
  assert.equal(paths.includes("/ai-automation"), false);
  assert.equal(paths.includes("/terms-and-conditions"), true);
  assert.equal(paths.includes("/services"), true);
  assert.equal(paths.includes("/locations"), true);
  assert.equal(paths.includes("/solutions"), true);
});

test("buildPanIndiaAreaServed covers India, all 36 states/UTs, major cities, and Worldwide", () => {
  assert.equal(INDIA_STATES_AND_UTS.length, 36);
  const areas = buildPanIndiaAreaServed();
  assert.equal(areas.some((a) => a["@type"] === "Country" && a.name === "India"), true);
  assert.equal(areas.some((a) => a["@type"] === "GeoCircle"), true);
  assert.equal(areas.some((a) => a["@type"] === "AdministrativeArea" && a.name === "Madhya Pradesh"), true);
  assert.equal(areas.some((a) => a["@type"] === "City" && a.name === "Shajapur"), true);
  assert.equal(areas.some((a) => a["@type"] === "City" && a.name === "Indore"), true);
  assert.equal(areas.some((a) => a["@type"] === "Place" && a.name === "Worldwide"), true);
});

test("LOCATION_HUBS have unique valid slugs, coordinates, nearby references, and rich local data", () => {
  assert.ok(LOCATION_HUBS.length >= 15);
  const slugs = new Set(LOCATION_HUBS.map((l) => l.slug));
  assert.equal(slugs.size, LOCATION_HUBS.length);
  assert.ok(getLocationHub("indore"));
  assert.ok(getLocationHub("madhya-pradesh"));
  assert.ok(getLocationHub("shajapur"));
  assert.ok(getLocationHub("india"));

  for (const loc of LOCATION_HUBS) {
    assert.ok(loc.lat > 6 && loc.lat < 38, `Valid India lat for ${loc.slug}`);
    assert.ok(loc.lng > 68 && loc.lng < 98, `Valid India lng for ${loc.slug}`);
    assert.ok(loc.faqs.length >= 1, `Visible FAQs required for ${loc.slug}`);
    assert.ok(loc.areasCovered.length >= 5, `Areas covered required for ${loc.slug}`);
    assert.equal(loc.seoTitle.includes("| MLHK Infotech"), false, `No duplicate brand suffix in ${loc.slug}`);
    for (const near of loc.nearbySlugs) {
      assert.ok(slugs.has(near), `Valid nearbySlug ${near} on ${loc.slug}`);
    }
  }
  assert.equal(INDIA_ZONE_DIRECTORY.length, 5);
});

test("SOLUTION_PAGES have unique slugs, transparent INR pricing, workflow steps, and visible FAQs", () => {
  assert.equal(SOLUTION_PAGES.length, 6);
  const slugs = new Set(SOLUTION_PAGES.map((s) => s.slug));
  assert.equal(slugs.size, SOLUTION_PAGES.length);
  assert.ok(getSolutionPage("website-development-cost-india"));
  assert.ok(getSolutionPage("website-redesign-editing-and-speed-fix"));
  assert.ok(getSolutionPage("seo-and-google-ranking-services"));
  assert.ok(getSolutionPage("instagram-facebook-google-ads-marketing"));
  assert.ok(getSolutionPage("mobile-app-development-india"));
  assert.ok(getSolutionPage("all-in-one-digital-it-partner"));

  for (const sol of SOLUTION_PAGES) {
    assert.ok(sol.minPriceNumeric > 0 && sol.maxPriceNumeric >= sol.minPriceNumeric);
    assert.ok(sol.workflowSteps.length >= 4);
    assert.ok(sol.faqs.length >= 2);
    assert.equal(sol.seoTitle.includes("| MLHK Infotech"), false);
  }
});
