import type { Metadata } from "next";
import { site } from "@/content/site";

// Per-page metadata: titles and descriptions come verbatim from docs/copy-and-seo.md section 12.
// The Open Graph image itself comes from each route's opengraph-image.tsx.

type PageSeo = {
  /** Full title, used as is (no template). */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/work/zera". Becomes the canonical URL. */
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

/** The Person node shared by the About page and the other JSON-LD blocks. */
export const personSchema = {
  "@type": "Person",
  "@id": absoluteUrl("/about#person"),
  name: site.name,
  jobTitle: site.role,
  url: absoluteUrl("/about"),
  image: absoluteUrl("/images/portrait.webp"),
  email: `mailto:${site.email}`,
  sameAs: [site.social.linkedin, site.social.github, site.social.pubDev],
} as const;
