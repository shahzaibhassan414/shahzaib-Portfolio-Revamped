import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
        other: {
          "Content-Signal": "search=yes, ai-input=yes, ai-train=no",
        },
      },
      {
        userAgent: [
          "ChatGPT-User",
          "GPTBot",
          "OAI-SearchBot",
          "Claude-Web",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Applebot-Extended",
          "Google-Extended",
        ],
        allow: "/",
        disallow: ["/api/"],
        other: {
          "Content-Signal": "search=yes, ai-input=yes, ai-train=no",
        },
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
