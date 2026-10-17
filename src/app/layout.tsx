import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavigationProgressBar } from "@/components/ui/NavigationProgressBar";
import { WebMcpProvider } from "@/components/public/WebMcpProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "900"] });

export const metadata: Metadata = {
  title: { default: "MLHK Infotech | Web, Mobile, AI and Enterprise Software", template: "%s | MLHK Infotech" },
  description:
    "MLHK Infotech builds web platforms, mobile apps, CRM and ERP systems, and AI automation. Innovate. Integrate. Elevate. Based in Shajapur, MP, India.",
  metadataBase: new URL("https://mlhk.in"),
  applicationName: "MLHK Infotech",
  authors: [{ name: "Hariom Vishwkarma (MLHK)", url: "https://mlhk.in/about" }],
  creator: "Hariom Vishwkarma",
  publisher: "MLHK Infotech",
  keywords: [
    "MLHK Infotech",
    "MLHK",
    "Hariom Vishwkarma",
    "Web Development",
    "Android App Development",
    "Enterprise ERP Systems",
    "CRM Solutions",
    "AI Automation",
    "Software Development India",
    "Shajapur IT Company",
    "Indore Software Company",
  ],
  category: "technology",
  icons: {
    icon: [{ url: "/brand/mark.png", type: "image/png" }],
    apple: [{ url: "/brand/mark.png" }],
  },
  openGraph: {
    siteName: "MLHK Infotech",
    locale: "en_IN",
    type: "website",
    url: "https://mlhk.in",
    images: [{ url: "/brand/logo-full.png", width: 1536, height: 1024, alt: "MLHK Infotech" }],
  },
  twitter: { card: "summary_large_image", site: "@mlhkinfotech", creator: "@mlhkhariom" },
  alternates: {
    canonical: "https://mlhk.in",
    types: { "application/rss+xml": "https://mlhk.in/feed.xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050607",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`dark ${geist.variable} ${unbounded.variable}`}>
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" type="application/linkset+json" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="describedby" href="/auth.md" type="text/markdown" />
        <link rel="service-doc" href="/llms-full.txt" type="text/plain" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var tools = [
      {
        name: "search_services",
        description: "Search MLHK Infotech software engineering services, web development, mobile apps, CRM/ERP systems, and AI automation.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search keyword or requirement (e.g. Next.js, mobile apps, cloud security, CRM)" }
          },
          required: ["query"]
        },
        execute: function(args) {
          return fetch("/api/admin/search?q=" + encodeURIComponent((args && args.query) || "")).then(function(r) { return r.json(); });
        }
      },
      {
        name: "get_company_info",
        description: "Retrieve verified organizational facts, founder credentials, contact channels, and corporate subsidiaries for MLHK Infotech.",
        inputSchema: { type: "object", properties: {} },
        execute: function() {
          return {
            name: "MLHK Infotech",
            tagline: "Innovate. Integrate. Elevate.",
            founder: { name: "Hariom Vishwkarma", role: "Founder & Lead Architect", github: "https://github.com/mlhkhariom" },
            contact: { email: "admin@mlhk.in", phone: "+91 91651 00124", website: "https://mlhk.in" }
          };
        }
      },
      {
        name: "submit_inquiry",
        description: "Submit a business consultation, software development proposal, or service inquiry directly to the MLHK Infotech engineering desk.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Client full name or company representative name" },
            email: { type: "string", description: "Corporate or personal email address" },
            service: { type: "string", description: "Requested service domain or project category" },
            message: { type: "string", description: "Project brief, scope, budget or timeline requirements" }
          },
          required: ["name", "email", "service", "message"]
        },
        execute: function(args) {
          return fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(args)
          }).then(function(r) { return r.json(); });
        }
      }
    ];

    var registered = new Map();
    var polyfillContext = {
      registerTool: function(tool, opts) {
        registered.set(tool.name, tool);
        if (opts && opts.signal && opts.signal.addEventListener) {
          opts.signal.addEventListener("abort", function() { registered.delete(tool.name); });
        }
        return Promise.resolve(tool);
      },
      unregisterTool: function(name) {
        registered.delete(name);
        return Promise.resolve();
      },
      getTools: function() { return Promise.resolve(Array.from(registered.values())); },
      listTools: function() { return Promise.resolve(Array.from(registered.values())); },
      tools: registered
    };

    if (!document.modelContext) document.modelContext = polyfillContext;
    if (typeof navigator !== "undefined" && !navigator.modelContext) navigator.modelContext = document.modelContext;

    var ctx = document.modelContext || (typeof navigator !== "undefined" && navigator.modelContext);
    if (ctx && typeof ctx.registerTool === "function") {
      tools.forEach(function(t) {
        try { ctx.registerTool(t); } catch(e) {}
      });
    }
  } catch(err) {}
})();
`,
          }}
        />
      </head>
      <body className="font-sans bg-[#050607] text-zinc-100 antialiased">
        <WebMcpProvider />
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        {children}
        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": ""}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
