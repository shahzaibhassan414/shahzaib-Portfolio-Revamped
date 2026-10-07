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
};

export default nextConfig;
