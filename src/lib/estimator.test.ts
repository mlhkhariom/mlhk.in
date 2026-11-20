import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateProjectEstimate,
  formatInrCompact,
  mapBudgetTierFromInr,
} from "./estimator";

test("formatInrCompact formats thousands and lakhs cleanly", () => {
  assert.equal(formatInrCompact(15000), "₹15k");
  assert.equal(formatInrCompact(65000), "₹65k");
  assert.equal(formatInrCompact(100000), "₹1L");
  assert.equal(formatInrCompact(150000), "₹1.5L");
});

test("base business website estimate maps cleanly to /contact query params", () => {
  const est = calculateProjectEstimate("business-website", []);
  assert.equal(est.minInr, 15000);
  assert.equal(est.maxInr, 35000);
  assert.equal(est.formattedRange, "₹15k – ₹35k");
  assert.equal(est.weeksLabel, "1–3 weeks");
  assert.equal(est.contactBudgetTier, "₹25k – ₹60k");
  assert.ok(est.contactHref.startsWith("/contact?service=web-development&"));
});

test("adding UPI and WhatsApp add-ons stacks INR cost, timeline, and deliverables", () => {
  const est = calculateProjectEstimate("mobile-app", [
    "upi-checkout",
    "whatsapp-automation",
  ]);
  assert.equal(est.minInr, 45000 + 6000 + 5000);
  assert.equal(est.maxInr, 120000 + 12000 + 12000);
  assert.equal(est.formattedRange, "₹56k – ₹1.4L");
  assert.equal(est.contactBudgetTier, "₹1.2L – ₹2.5L");
  assert.ok(est.deliverables.some((d) => d.includes("Razorpay UPI")));
  assert.ok(est.deliverables.some((d) => d.includes("WhatsApp Lead")));
});

test("mapBudgetTierFromInr covers all five contact form tiers", () => {
  assert.equal(mapBudgetTierFromInr(20000), "₹8k – ₹25k");
  assert.equal(mapBudgetTierFromInr(55000), "₹25k – ₹60k");
  assert.equal(mapBudgetTierFromInr(110000), "₹60k – ₹1.2L");
  assert.equal(mapBudgetTierFromInr(220000), "₹1.2L – ₹2.5L");
  assert.equal(mapBudgetTierFromInr(300000), "₹2.5L+");
});
