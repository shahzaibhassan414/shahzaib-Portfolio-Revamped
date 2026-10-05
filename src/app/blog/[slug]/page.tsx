import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTAStrip } from "@/components/CTAStrip";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLeft } from "@/components/icons";
import { getPost, postCta, posts } from "@/content/blog/posts";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata, personSchema } from "@/lib/seo";

// Article layout for MDX posts in src/content/blog/<slug>.mdx.

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);
  const cta = postCta[post.kind];
  const project = post.related?.project ? getProject(post.related.project) : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: personSchema,
          image: absoluteUrl(`/blog/${slug}/opengraph-image`),
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
        }}
      />
      <article className="wrap flex flex-col pt-6 md:pt-10">
        <Link
          href="/blog"
          className="-ml-1 flex min-h-11 items-center gap-2 self-start text-base font-semibold text-muted no-underline hover:text-accent"
        >
          <ArrowLeft size={18} />
          Blog
        </Link>

        <header className="mx-auto flex w-full max-w-[720px] flex-col gap-5 pt-8 pb-10 md:pt-12">
          <span className="flex flex-wrap items-center gap-2.5 text-sm text-muted">
            <span className="rounded-full bg-surface-2 px-2.5 py-[5px] font-semibold">{post.topic}</span>
            <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
          </span>
          <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.05] font-extrabold tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="text-xl leading-[1.5] text-body">{post.description}</p>
          <span className="flex items-center gap-2 text-[15px] text-muted">By {site.name}</span>
        </header>

        <div className="mx-auto w-full max-w-[720px] border-t border-line pt-4 text-lg leading-[1.7] text-body md:text-[19px]">
          <Body />
        </div>

        {(post.related?.service || project) && (
          <aside className="mx-auto mt-12 flex w-full max-w-[720px] flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-base">
            {post.related?.service && (
              <Link href={post.related.service.href} className="font-semibold text-accent underline underline-offset-2">
                {post.related.service.label}
              </Link>
            )}
            {project && (
              <Link href={`/work/${project.slug}`} className="font-semibold text-accent underline underline-offset-2">
                {project.name} case study
              </Link>
            )}
          </aside>
        )}
      </article>

      <CTAStrip heading={cta.heading} button={{ href: `/contact?type=${cta.type}`, label: cta.button }} />
    </>
  );
}
