import { getService, services } from "@/content/services";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Flutter services from Shahzaib Hassan";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return ogImage({ title: getService(slug)?.h1 ?? "", eyebrow: "Services" });
}
