import { getProject, publishedProjects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Flutter case study by Shahzaib Hassan";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({ title: caseStudies[slug]?.h1 ?? project?.name ?? "", eyebrow: "Case study", color: project?.color });
}
