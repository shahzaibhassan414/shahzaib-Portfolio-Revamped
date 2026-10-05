// Blog articles. Each entry needs a matching MDX body at src/content/blog/<slug>.mdx.
// Published articles appear on /blog and in the sitemap; the topic list and CTA come
// from docs/copy-and-seo.md sections 11 and 14.

export type PostKind = "problem" | "build";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-10-20". */
  date: string;
  topic: string;
  /** "problem" articles end with "Dealing with this in your app?", "build" ones with "Planning a feature like this?". */
  kind: PostKind;
  /** The service and case study the article links to (copy doc section 13). */
  related?: { service?: { href: string; label: string }; project?: string };
};

export const posts: Post[] = [];

export const postCta: Record<PostKind, { heading: string; button: string; type: string }> = {
  problem: { heading: "Dealing with this in your app?", button: "Get help with your app", type: "rescue" },
  build: { heading: "Planning a feature like this?", button: "Discuss your project", type: "build" },
};

// Priority articles from the content roadmap, listed as "Coming next" until they're written.
export const comingNext = [
  { topic: "Payments", title: "Handling subscriptions in Flutter with RevenueCat without entitlement bugs" },
  { topic: "Real-time", title: "Real-time chat in Flutter with Socket.IO: reconnects, background, and message order" },
  { topic: "Performance", title: "Why your Flutter app is slow, and how to find out for sure" },
  { topic: "Codebases", title: "Taking over an existing Flutter app: what I check in the first two weeks" },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
