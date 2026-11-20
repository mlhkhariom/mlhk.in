import test from "node:test";
import assert from "node:assert/strict";
import {
  validateContactSubmission,
  generateInquiryRef,
  buildWhatsAppInquiryUrl,
  isValidEmail,
  isValidOptionalPhone,
} from "./contact-utils";
import { VERIFIED_CASE_STUDIES, filterCaseStudies } from "./case-studies";

test("validateContactSubmission accepts valid inquiry and composes scope notes", () => {
  const result = validateContactSubmission({
    name: "  Aarav Verma  ",
    email: "aarav@indoretech.in",
    phone: "+91 98260 12345",
    company: "Indore Traders",
    service: "Web Engineering",
    timeline: "Rapid Sprint (< 3 Weeks)",
    budget: "₹15k – ₹45k",
    message: "Need a fast business website with SEO and WhatsApp booking.",
  });

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.lead.name, "Aarav Verma");
    assert.equal(result.lead.email, "aarav@indoretech.in");
    assert.equal(result.lead.isHoneypot, false);
    assert.match(result.lead.notes, /Service: Web Engineering/);
    assert.match(result.lead.notes, /WhatsApp booking/);
  }
});

test("validateContactSubmission rejects short name, invalid email, and invalid phone", () => {
  const badName = validateContactSubmission({ name: "A", email: "ok@example.com" });
  assert.equal(badName.ok, false);
  if (!badName.ok) assert.equal(badName.field, "name");

  const badEmail = validateContactSubmission({ name: "Rohan", email: "not-an-email" });
  assert.equal(badEmail.ok, false);
  if (!badEmail.ok) assert.equal(badEmail.field, "email");

  const badPhone = validateContactSubmission({ name: "Rohan", email: "rohan@mlhk.in", phone: "12345" });
  assert.equal(badPhone.ok, false);
  if (!badPhone.ok) assert.equal(badPhone.field, "phone");
});

test("validateContactSubmission flags honeypot submissions cleanly", () => {
  const bot = validateContactSubmission({
    name: "Bot",
    email: "bot@spam.test",
    website: "https://spam.example",
  });
  assert.equal(bot.ok, true);
  if (bot.ok) {
    assert.equal(bot.lead.isHoneypot, true);
  }
});

test("generateInquiryRef and buildWhatsAppInquiryUrl format deterministic output", () => {
  const ref = generateInquiryRef(new Date("2026-11-20T10:00:00Z"), "a9f2");
  assert.equal(ref, "MLHK-261120-A9F2");

  const url = buildWhatsAppInquiryUrl({
    serviceLabel: "SEO & Ads",
    timelineLabel: "Rapid Sprint",
    budgetLabel: "₹8k – ₹25k",
    name: "Priya",
    referenceId: ref,
  });
  assert.ok(url.startsWith("https://wa.me/919165100124?text="));
  assert.ok(decodeURIComponent(url).includes("Ref ID: MLHK-261120-A9F2"));
  assert.equal(isValidEmail("contact@mlhk.in"), true);
  assert.equal(isValidOptionalPhone(""), true);
});

test("VERIFIED_CASE_STUDIES have complete outcomes, architecture nodes, and category filtering", () => {
  assert.equal(VERIFIED_CASE_STUDIES.length, 6);
  const slugs = new Set<string>();
  for (const cs of VERIFIED_CASE_STUDIES) {
    assert.ok(!slugs.has(cs.slug), `Duplicate slug: ${cs.slug}`);
    slugs.add(cs.slug);
    assert.ok(cs.image.startsWith("/images/showcase/"), `Missing generated asset on ${cs.slug}`);
    assert.ok(cs.outcomes.length >= 3, `Case study ${cs.slug} needs at least 3 measurable outcomes`);
    assert.ok(cs.architecture.length >= 3, `Case study ${cs.slug} needs at least 3 architecture nodes`);
    assert.ok(cs.clientQuote.text.length > 20, `Case study ${cs.slug} needs client quote`);
  }

  assert.equal(filterCaseStudies("All Work").length, 6);
  assert.equal(filterCaseStudies("Enterprise & Field Ops").length, 1);
  assert.equal(filterCaseStudies("E-Commerce & Retail").length, 3);
});
