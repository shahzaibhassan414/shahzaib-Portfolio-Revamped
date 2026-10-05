import { getPost, posts } from "@/content/blog/posts";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Article by Shahzaib Hassan";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ title: post?.title ?? "", eyebrow: post?.topic ?? "Blog" });
}
