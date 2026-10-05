import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { publishedProjects } from "@/content/projects";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

// Published pages only: draft projects and unwritten articles stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; lastModified?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    ...publishedProjects.map((p) => ({ path: `/work/${p.slug}`, priority: p.tier === "flagship" ? 0.8 : 0.6 })),
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: s.href, priority: 0.8 })),
    { path: "/about", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, lastModified: p.date })),
    { path: "/contact", priority: 0.7 },
  ];
  return pages.map(({ path, priority, lastModified }) => ({
    url: absoluteUrl(path),
    priority,
    ...(lastModified && { lastModified }),
  }));
}
