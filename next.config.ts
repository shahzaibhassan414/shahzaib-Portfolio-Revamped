import createMDX from "@next/mdx";
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
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return Object.entries(legacyProjects).map(([slug, destination]) => ({
      source: `/project/${slug}`,
      destination,
      permanent: true,
    }));
  },
};

export default createMDX({})(nextConfig);
