import { BlogIndex, type BlogCard } from "@/components/BlogIndex";
import { CTAStrip } from "@/components/CTAStrip";
import { HeatMapVisual, SvgToWidgetVisual } from "@/components/PlaybookVisuals";
import { comingNext, posts } from "@/content/blog/posts";
import { playbooks } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

// Layout: design/blog.html. The two playbooks still live on Notion and link out.

export const metadata = pageMetadata({
  title: "Flutter Production Guides and Playbooks | Shahzaib Hassan",
  description:
    "Practical write-ups on real Flutter problems: maps, real-time chat, subscriptions, performance, and shipping to the stores.",
  path: "/blog",
});

const visuals = [<HeatMapVisual key="heat" />, <SvgToWidgetVisual key="svg" />];

export default function BlogPage() {
  const articleCards: BlogCard[] = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({
      href: `/blog/${p.slug}`,
      title: p.title,
      summary: p.description,
      topic: p.topic,
      label: "Article",
      action: "Read the article",
    }));

  const playbookCards: BlogCard[] = playbooks.map((p, i) => ({
    href: p.href,
    title: p.title,
    summary: p.summary,
    topic: p.topic,
    label: "Playbook",
    action: "Read the playbook",
    visual: visuals[i],
    external: true,
  }));

  // Hide upcoming topics once an article with the same title is published.
  const upcoming = comingNext.filter((c) => !posts.some((p) => p.title === c.title));

  return (
    <>
      <BlogIndex
        cards={[...articleCards, ...playbookCards]}
        upcoming={upcoming}
        intro={
          <>
            <h1 className="text-[clamp(64px,10vw,140px)] leading-[0.88] font-extrabold tracking-[-0.055em]">Blog</h1>
            <p className="max-w-[34em] text-[19px] leading-normal text-body md:text-[22px]">
              Practical notes on the problems that show up in production Flutter apps: maps, real-time, payments,
              performance, and shipping to the stores.
            </p>
          </>
        }
      />

      <CTAStrip
        heading="Dealing with one of these in your app?"
        body="If an article describes your problem, I can probably fix it. Tell me what's going on."
        button={{ href: "/contact?type=rescue", label: "Get help with your app" }}
      />
    </>
  );
}
