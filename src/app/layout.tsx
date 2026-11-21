import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { NavigationProgressBar } from "@/components/ui/NavigationProgressBar";
import { WebMcpProvider } from "@/components/public/WebMcpProvider";
import { GA4_ID, GTM_ID, GtmPageView } from "@/components/analytics/GoogleTagManager";
import { PAN_INDIA_SEO_KEYWORDS } from "@/lib/seo-utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["500", "700", "900"],
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION?.trim();
const cfAnalyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN?.trim();

export const metadata: Metadata = {
  title: {
    default: "MLHK Infotech | Web, Mobile, SEO, AI & Enterprise Software India",
    template: "%s | MLHK Infotech",
  },
  description:
    "MLHK Infotech — Innovate. Integrate. Elevate. Make Your Life Digital. Custom websites, mobile apps, SEO, AEO & GEO, digital marketing, CRM & ERP, and AI automation across Indore, Shajapur, Ujjain, Madhya Pradesh, India & worldwide.",
  metadataBase: new URL("https://mlhk.in"),
  applicationName: "MLHK Infotech",
  authors: [{ name: "Hariom Vishwkarma (MLHK)", url: "https://mlhk.in/about" }],
  creator: "Hariom Vishwkarma",
  publisher: "MLHK Infotech",
  keywords: PAN_INDIA_SEO_KEYWORDS,
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/mark.png", type: "image/png" },
    ],
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
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="api-catalog" href="/.well-known/api-catalog" type="application/linkset+json" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="describedby" href="/auth.md" type="text/markdown" />
        <link rel="service-doc" href="/llms-full.txt" type="text/plain" />
      </head>
      <body className="font-sans bg-[#050607] text-zinc-100 antialiased">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Direct GA4 Tag (G-7LWCNB06R4) + Google Tag Manager (GTM-NLP5P6CG) for 100% Real-Time Tracking */}
        <Script
          id="ga4-gtag-js"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-gtm-bootstrap" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_ID}', {
  send_page_view: true,
  linker: { domains: ['mlhk.in'] }
});
window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });`}
        </Script>
        <Script
          id="gtm-container-js"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />

        <WebMcpProvider />
        <Suspense fallback={null}>
          <NavigationProgressBar />
          <GtmPageView />
        </Suspense>
        {children}
        {cfAnalyticsToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfAnalyticsToken })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
