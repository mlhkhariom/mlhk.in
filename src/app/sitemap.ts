import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://mlhk.in", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://mlhk.in/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://mlhk.in/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://mlhk.in/portfolio", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://mlhk.in/blog", lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: "https://mlhk.in/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
