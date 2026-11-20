import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAdminWhatsAppReplyUrl,
  computePipelineMetrics,
  filterCrmLeads,
  parseLeadNotes,
  validateManualLeadInput,
  type CrmLeadRecord,
} from "./crm-utils";

describe("crm-utils", () => {
  it("parses structured contact/popup inquiry notes cleanly", () => {
    const raw = [
      "[REF: MLHK-2026-AB12] [PAGE: /locations/indore]",
      "Service: Business Website + Local SEO",
      "City: Indore",
      "Budget: ₹15k–₹25k",
      "Timeline: 2–3 Weeks",
      "",
      "Need a fast website for our Vijay Nagar clinic.",
    ].join("\n");
    const parsed = parseLeadNotes(raw);
    assert.equal(parsed.referenceId, "MLHK-2026-AB12");
    assert.equal(parsed.sourcePage, "/locations/indore");
    assert.equal(parsed.service, "Business Website + Local SEO");
    assert.equal(parsed.city, "Indore");
    assert.equal(parsed.budget, "₹15k–₹25k");
    assert.equal(parsed.timeline, "2–3 Weeks");
    assert.equal(parsed.message, "Need a fast website for our Vijay Nagar clinic.");
  });

  it("handles unstructured manual notes gracefully", () => {
    const parsed = parseLeadNotes("Walk-in client from Shajapur asking for GST ERP.");
    assert.equal(parsed.referenceId, null);
    assert.equal(parsed.service, null);
    assert.equal(parsed.message, "Walk-in client from Shajapur asking for GST ERP.");
  });

  it("computes accurate pipeline KPIs and conversion rate", () => {
    const sample: CrmLeadRecord[] = [
      { id: "1", name: "A", email: "a@x.com", phone: "9876543210", company: null, source: "website", status: "new", notes: null, createdAt: null, updatedAt: null },
      { id: "2", name: "B", email: "b@x.com", phone: "9876543211", company: null, source: "website", status: "contacted", notes: null, createdAt: null, updatedAt: null },
      { id: "3", name: "C", email: "c@x.com", phone: "9876543212", company: null, source: "social", status: "proposal", notes: null, createdAt: null, updatedAt: null },
      { id: "4", name: "D", email: "d@x.com", phone: "9876543213", company: null, source: "referral", status: "won", notes: null, createdAt: null, updatedAt: null },
      { id: "5", name: "E", email: "e@x.com", phone: null, company: null, source: "manual", status: "lost", notes: null, createdAt: null, updatedAt: null },
    ];
    const metrics = computePipelineMetrics(sample);
    assert.equal(metrics.total, 5);
    assert.equal(metrics.newCount, 1);
    assert.equal(metrics.contactedCount, 1);
    assert.equal(metrics.proposalCount, 1);
    assert.equal(metrics.wonCount, 1);
    assert.equal(metrics.lostCount, 1);
    assert.equal(metrics.conversionRate, 50); // 1 won / (1 won + 1 lost)
  });

  it("filters CRM leads by query, status, and source", () => {
    const leads: CrmLeadRecord[] = [
      { id: "1", name: "Rohan Sharma", email: "rohan@indore.in", phone: "9826012345", company: "Malwa Solar", source: "website", status: "new", notes: "City: Indore\nService: ERP", createdAt: null, updatedAt: null },
      { id: "2", name: "Priya Verma", email: "priya@surat.in", phone: "9898012345", company: "Surat Silks", source: "referral", status: "won", notes: "City: Surat", createdAt: null, updatedAt: null },
    ];
    assert.equal(filterCrmLeads(leads, { query: "malwa", status: "all", source: "all" }).length, 1);
    assert.equal(filterCrmLeads(leads, { query: "", status: "won", source: "all" }).length, 1);
    assert.equal(filterCrmLeads(leads, { query: "", status: "all", source: "website" }).length, 1);
  });

  it("builds valid Indian WhatsApp reply links for 10-digit numbers", () => {
    const url = buildAdminWhatsAppReplyUrl({
      name: "Amit Patel",
      phone: "98260-11223",
      notes: "[REF: MLHK-2026-XY99]\nService: SEO",
    });
    assert.ok(url?.startsWith("https://wa.me/919826011223?text="));
    assert.ok(url?.includes("MLHK-2026-XY99"));
    assert.equal(buildAdminWhatsAppReplyUrl({ name: "No Phone", phone: "123", notes: null }), null);
  });

  it("validates manual CRM lead payloads strictly", () => {
    const bad = validateManualLeadInput({ name: "A", email: "bad-email" });
    assert.equal(bad.ok, false);

    const good = validateManualLeadInput({
      name: "Vikram Joshi",
      email: "Vikram@Example.com",
      phone: "+91 98260 00111",
      company: "Joshi Traders",
      source: "social",
      status: "contacted",
      notes: "Requested Android app quote",
    });
    assert.equal(good.ok, true);
    if (good.ok) {
      assert.equal(good.data.email, "vikram@example.com");
      assert.equal(good.data.status, "contacted");
      assert.equal(good.data.source, "social");
    }
  });
});
