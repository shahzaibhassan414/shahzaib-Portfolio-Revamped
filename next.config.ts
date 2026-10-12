import type { NextConfig } from "next";

// Old Flutter Web URLs, redirected permanently to their new pages.
const legacyProjects: Record<string, string> = {
  "paw-play-love": "/work/paw-play-love",
  lawnolu: "/work/lawnolu",
  simman: "/work/simman",
  "bepay-client": "/work/bepay",
  "bepay-business": "/work/bepay",
  "olu-pro": "/work/lawnolu",
  "the-blue-lagoon": "/work",
  "dating-app": "/work/on-scene",
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...Object.entries(legacyProjects).map(([slug, destination]) => ({
        source: `/project/${slug}`,
        destination,
        permanent: true,
      })),
      // The blog was folded into the homepage's Open source section.
      { source: "/blog/:path*", destination: "/#oss-title", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Signal",
            value: "search=yes, ai-input=yes, ai-train=no",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai-catalog.json>; rel="ai-catalog", </index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"',
          },
        ],
      },
      {
        source: "/.well-known/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
