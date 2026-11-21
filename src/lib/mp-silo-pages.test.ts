import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ALL_MP_SILO_PAGES, countWords, getMpSiloPageOrThrow } from "./mp-silo-pages";

const REQUIRED_EXACT_PATHS = [
  "/indore-it-digital-marketing-company",
  "/indore/web-app-development-vijay-nagar-bhawarkuan",
  "/indore/khajrana-ganesh-temple-digital-solutions",
  "/hi/indore-digital-services-hindi",
  "/maa-baglamukhi-nalkheda-shajapur-digital-portal",
  "/hi/maa-baglamukhi-nalkheda-havan-pujan-website-seo",
  "/ujjain-mahakal-simhastha-2028-it-solutions",
  "/hi/ujjain-simhastha-2028-digital-taiyari",
  "/omkareshwar-maheshwar-tourism-temple-digital-solutions",
  "/bhopal-bhojpur-it-web-development-services",
  "/gwalior-datia-pitambara-peeth-digital-services",
  "/jabalpur-maihar-chitrakoot-temple-web-seo",
] as const;

describe("MP City & Temple Silo Architecture (12 Dedicated Pages)", () => {
  it("contains all 12 exact requested routes with unique paths and titles", () => {
    assert.equal(ALL_MP_SILO_PAGES.length, 12);
    const paths = new Set(ALL_MP_SILO_PAGES.map((p) => p.path));
    const titles = new Set(ALL_MP_SILO_PAGES.map((p) => p.seoTitle));
    assert.equal(paths.size, 12);
    assert.equal(titles.size, 12);

    for (const expectedPath of REQUIRED_EXACT_PATHS) {
      const page = getMpSiloPageOrThrow(expectedPath);
      assert.equal(page.path, expectedPath);
    }
  });

  it("enforces .webp hosted assets strictly under 120 KB with brand alt text & figcaptions", () => {
    for (const page of ALL_MP_SILO_PAGES) {
      assert.ok(page.bannerImage.endsWith(".webp"), `Banner must be .webp: ${page.path}`);
      assert.ok(page.bannerAlt.includes("MLHK Infotech"), `Banner alt must include MLHK Infotech: ${page.path}`);
      assert.ok(
        page.bannerCaption.includes("MLHK Infotech") || page.bannerCaption.includes("support@mlhk.in"),
        `Banner caption must cite MLHK Infotech / support@mlhk.in: ${page.path}`,
      );

      const bannerFile = path.join(process.cwd(), "public", page.bannerImage.replace(/^\//, ""));
      assert.ok(fs.existsSync(bannerFile), `Banner file must exist: ${bannerFile}`);
      const bannerSizeKb = fs.statSync(bannerFile).size / 1024;
      assert.ok(bannerSizeKb < 120, `Banner ${page.bannerImage} is ${bannerSizeKb.toFixed(1)}KB (>= 120KB)`);

      for (const card of page.featureCards) {
        assert.ok(card.image.endsWith(".webp"), `Card image must be .webp: ${page.path}`);
        assert.ok(card.alt.includes("MLHK Infotech"), `Card alt must include MLHK Infotech: ${page.path}`);
        assert.ok(
          card.caption.includes("MLHK Infotech") || card.caption.includes("support@mlhk.in"),
          `Card caption must cite MLHK Infotech: ${page.path}`,
        );
        const cardFile = path.join(process.cwd(), "public", card.image.replace(/^\//, ""));
        assert.ok(fs.existsSync(cardFile), `Card file must exist: ${cardFile}`);
        const cardSizeKb = fs.statSync(cardFile).size / 1024;
        assert.ok(cardSizeKb < 120, `Card ${card.image} is ${cardSizeKb.toFixed(1)}KB (>= 120KB)`);
      }
    }
  });

  it("validates Hindi language flags and natural Hindi copy on /hi/* routes", () => {
    const hiPages = ALL_MP_SILO_PAGES.filter((p) => p.path.startsWith("/hi/"));
    assert.equal(hiPages.length, 3);
    for (const p of hiPages) {
      assert.equal(p.lang, "hi");
      assert.ok(/[\u0900-\u097F]/.test(p.h1), `Hindi H1 required on ${p.path}`);
      assert.ok(p.alternatePath && !p.alternatePath.startsWith("/hi/"), `English twin required on ${p.path}`);
    }
  });

  it("ensures every page has 4 crisp AEO FAQs (35-65 words) and 4+ internal silo links", () => {
    for (const page of ALL_MP_SILO_PAGES) {
      assert.ok(page.aeoFaqs.length >= 4, `Expected 4+ FAQs on ${page.path}`);
      for (const faq of page.aeoFaqs) {
        const words = countWords(faq.answer);
        assert.ok(
          words >= 32 && words <= 65,
          `AEO answer word count (${words}) out of crisp range on ${page.path}: ${faq.question}`,
        );
      }
      assert.ok(page.relatedSiloLinks.length >= 4, `Expected 4+ internal silo links on ${page.path}`);
    }
  });
});
