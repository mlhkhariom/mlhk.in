import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MLHK Infotech — Web, Mobile, SEO & Enterprise Software India",
    short_name: "MLHK Infotech",
    description:
      "Custom websites, Android & iOS apps, SEO & Meta/Google Ads, CRM/ERP systems, and AI automation built in-house for Indian and global businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#050607",
    theme_color: "#ff9f1c",
    lang: "en-IN",
    categories: ["business", "productivity", "technology"],
    icons: [
      {
        src: "/brand/mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
