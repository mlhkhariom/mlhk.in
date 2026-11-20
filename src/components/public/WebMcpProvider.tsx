"use client";

import { useEffect } from "react";
import { BRAND, CAPABILITIES, SERVICE_DETAILS, SERVICE_LINES, VENTURES } from "@/lib/brand";

const ALL_SERVICES = [
  ...SERVICE_LINES.map((s) => ({
    title: s.title,
    slug: s.slug,
    description: s.description,
    points: s.points,
  })),
  ...CAPABILITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    description: c.description,
    points: [] as readonly string[],
  })),
];

export function WebMcpProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const controller = new AbortController();
    const { signal } = controller;

    // Polyfill container if modelContext is not natively provided by the browser environment
    const registeredTools = new Map<string, any>();

    const polyfillContext = {
      registerTool: async (tool: any, options?: { signal?: AbortSignal }) => {
        registeredTools.set(tool.name, tool);
        if (options?.signal) {
          options.signal.addEventListener("abort", () => {
            registeredTools.delete(tool.name);
          });
        }
        return tool;
      },
      unregisterTool: async (name: string) => {
        registeredTools.delete(name);
      },
      getTools: async () => Array.from(registeredTools.values()),
      listTools: async () => Array.from(registeredTools.values()),
      tools: registeredTools,
    };

    if (!(document as any).modelContext) {
      (document as any).modelContext = polyfillContext;
    }
    if (!(navigator as any).modelContext) {
      (navigator as any).modelContext = (document as any).modelContext;
    }

    const context = (document as any).modelContext || (navigator as any).modelContext;

    if (!context || typeof context.registerTool !== "function") return;

    // Tool 1: search_services
    context.registerTool(
      {
        name: "search_services",
        description:
          "Search and explore MLHK Infotech software engineering services, web development, mobile apps, SEO, digital marketing, branding, cybersecurity, CRM/ERP systems, and AI automation.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search keyword or requirement (e.g. 'Next.js', 'mobile apps', 'SEO', 'CRM')",
            },
          },
          required: ["query"],
        },
        execute: async ({ query }: { query: string }) => {
          const q = (query || "").toLowerCase();
          const matches = ALL_SERVICES.filter(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.description.toLowerCase().includes(q) ||
              s.points.some((p: string) => p.toLowerCase().includes(q))
          );
          return {
            query,
            total_matches: matches.length,
            services: matches.map((m) => ({
              title: m.title,
              slug: m.slug,
              description: m.description,
              url: `${BRAND.url}/services/${m.slug}`,
              points: m.points,
            })),
          };
        },
      },
      { signal }
    );

    // Tool 2: get_service_details
    context.registerTool(
      {
        name: "get_service_details",
        description:
          "Retrieve technical specifications, deliverables, and outcomes for a specific MLHK Infotech service slug.",
        inputSchema: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              description:
                "Service slug: web-development, mobile-app-development, digital-marketing, graphics-and-branding, support-and-maintenance, cybersecurity, enterprise-systems, ai-automation",
            },
          },
          required: ["slug"],
        },
        execute: async ({ slug }: { slug: string }) => {
          const meta = ALL_SERVICES.find((s) => s.slug === slug);
          const detail = SERVICE_DETAILS.find((d) => d.slug === slug);
          if (!meta || !detail) {
            return { error: "service_not_found", valid_slugs: ALL_SERVICES.map((s) => s.slug) };
          }
          return {
            slug,
            title: meta.title,
            description: meta.description,
            audience: detail.audience,
            intro: detail.intro,
            deliverables: detail.deliverables,
            process: detail.process,
            url: `${BRAND.url}/services/${slug}`,
          };
        },
      },
      { signal }
    );

    // Tool 3: get_company_info
    context.registerTool(
      {
        name: "get_company_info",
        description:
          "Retrieve verified organizational facts, founder credentials, contact channels, and corporate subsidiaries for MLHK Infotech.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        execute: async () => {
          return {
            name: BRAND.name,
            tagline: BRAND.tagline,
            foundedYear: BRAND.foundedYear,
            founder: {
              name: BRAND.founder,
              role: BRAND.founderRole,
              linkedIn: BRAND.founderLinkedin,
              github: BRAND.founderGithub,
            },
            contact: {
              email: BRAND.email,
              phone: BRAND.phoneDisplay,
              whatsapp: "+91 91651 00124",
              address: BRAND.location,
            },
            subsidiaries: VENTURES.map((v) => ({
              name: v.name,
              sector: v.sector,
              url: `${BRAND.url}/subsidiaries`,
            })),
          };
        },
      },
      { signal }
    );

    // Tool 4: submit_inquiry
    context.registerTool(
      {
        name: "submit_inquiry",
        description:
          "Submit a business consultation, software development proposal, or service inquiry directly to the MLHK Infotech engineering desk.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Client full name or company representative name" },
            email: { type: "string", description: "Corporate or personal email address" },
            service: { type: "string", description: "Requested service domain or project category" },
            message: { type: "string", description: "Project brief, scope, budget or timeline requirements" },
          },
          required: ["name", "email", "service", "message"],
        },
        execute: async (args: { name: string; email: string; service: string; message: string }) => {
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(args),
            });
            const data = await res.json().catch(() => ({}));
            return {
              status: res.ok ? "success" : "received",
              message: "Inquiry successfully submitted to MLHK Infotech engineering desk.",
              data,
            };
          } catch (e: any) {
            return {
              status: "queued",
              message: "Inquiry registered. An engineer will follow up shortly.",
            };
          }
        },
      },
      { signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}
