import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CTAStrip } from "@/components/CTAStrip";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { HeroPhonesScroll } from "@/components/HeroPhonesScroll";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectMorph } from "@/components/ProjectMorph";
import { SplitSection } from "@/components/SplitSection";
import { TestimonialCard } from "@/components/TestimonialCard";
import { caseStudies, isPlaceholder, type RichItem } from "@/content/case-studies";
import { getProject, publishedProjects } from "@/content/projects";
import { testimonialFor } from "@/content/testimonials";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { onWhiteText } from "@/lib/color";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  const study = caseStudies[slug];
  if (!project || !study) return {};
  return pageMetadata({
    title: study.seo?.title ?? study.h1,
    description: study.seo?.description ?? project.cardLine,
    path: `/work/${slug}`,
  });
}

/** Renders a paragraph, or a muted placeholder when the text is still [to be supplied]. */
function Para({ children }: { children: string }) {
  if (isPlaceholder(children)) {
    return <p className="rounded-xl border border-dashed border-line-strong px-4 py-3 text-[17px] text-muted">{children}</p>;
  }
  return <p>{children}</p>;
}

function Rich({ item }: { item: RichItem }) {
  if (!item.title) return <Para>{item.text}</Para>;
  return (
    <p>
      <strong className="font-bold text-text">{item.title}</strong>{" "}
      {isPlaceholder(item.text) ? <span className="text-muted">{item.text}</span> : item.text}
    </p>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  const testimonial = testimonialFor(slug);
  const [name, ...rest] = study.h1.split(": ");
  const subtitle = rest.join(": ");
  const index = publishedProjects.findIndex((p) => p.slug === slug);
  // Flagships cycle through each other (On Scene → Zera → BePay → On Scene); the rest follow the list.
  const flagships = publishedProjects.filter((p) => p.tier === "flagship");
  const next =
    project.tier === "flagship"
      ? flagships[(flagships.indexOf(project) + 1) % flagships.length]
      : publishedProjects[(index + 1) % publishedProjects.length];
  const fan = ["rotate-[-8deg] translate-x-[34px] translate-y-[36px]", "relative z-[1]", "rotate-[8deg] -translate-x-[34px] translate-y-[36px]"];

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${slug}` },
          ].map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: absoluteUrl(crumb.path) })),
        }}
      />
      <section className="wrap flex flex-col gap-7 pt-6 pb-14 md:pt-10">
        <Link
          href="/work"
          className="-ml-1 flex min-h-11 items-center gap-2 self-start text-base font-semibold text-muted no-underline hover:text-accent"
        >
          <ArrowLeft size={18} />
          All work
        </Link>
        <div className="flex items-center gap-[18px]">
          <span
            aria-hidden="true"
            className="flex size-14 flex-none items-center justify-center rounded-2xl text-xl font-extrabold text-white md:size-[72px] md:rounded-[20px] md:text-[26px]"
            style={{ background: onWhiteText(project.color) }}
          >
            {project.initials}
          </span>
          <span className="text-[17px] font-medium text-muted">{project.kind}</span>
        </div>
        <h1 className="flex flex-col gap-4">
          <span className="text-[clamp(44px,9vw,128px)] leading-[0.92] font-extrabold tracking-[-0.045em]">
            {name}
            <span className="sr-only">:</span>
          </span>
          {subtitle && (
            <span className="text-[clamp(20px,2.2vw,26px)] leading-[1.3] font-semibold tracking-[-0.01em] text-accent">
              {subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}
            </span>
          )}
        </h1>
        {study.kind === "full" && (
          <div className="flex max-w-[768px] flex-col gap-3">
            <p className="text-xl leading-[1.45] text-body md:text-2xl">{study.overview}</p>
            {study.placeholders?.overview && (
              <p className="text-[15px] text-muted">[{study.placeholders.overview}]</p>
            )}
          </div>
        )}
        <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] border-t border-line">
          {project.role && (
            <div className="flex flex-col gap-1.5 py-5 pr-6">
              <dt className="text-sm font-semibold text-muted">Role</dt>
              <dd className="text-[17px] font-semibold">{project.role}</dd>
            </div>
          )}
          {project.team && (
            <div className="flex flex-col gap-1.5 py-5 pr-6">
              <dt className="text-sm font-semibold text-muted">Team</dt>
              <dd className="text-[17px] leading-[1.4] font-semibold">{project.team}</dd>
            </div>
          )}
          {project.timeline && (
            <div className="flex flex-col gap-1.5 py-5 pr-6">
              <dt className="text-sm font-semibold text-muted">Timeline</dt>
              <dd className="text-[17px] font-semibold">{project.timeline}</dd>
            </div>
          )}
          <div className="flex flex-col gap-1.5 py-5 pr-6">
            <dt className="text-sm font-semibold text-muted">Platforms</dt>
            <dd className="text-[17px] font-semibold">{project.platforms}</dd>
          </div>
          <div className="flex flex-col gap-1.5 py-5 pr-6">
            <dt className="text-sm font-semibold text-muted">Built with</dt>
            <dd className="text-[17px] leading-[1.4] font-semibold">{project.tags.join(", ")}</dd>
          </div>
          {project.storeLinks ? (
            <div className="flex flex-col gap-1.5 py-5 pr-6">
              <dt className="text-sm font-semibold text-muted">Get the app</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-[17px] font-semibold">
                {project.storeLinks.appStore && (
                  <a href={project.storeLinks.appStore} className="tap-target underline underline-offset-2 hover:text-accent">
                    App Store
                  </a>
                )}
                {project.storeLinks.googlePlay && (
                  <a href={project.storeLinks.googlePlay} className="tap-target underline underline-offset-2 hover:text-accent">
                    Google Play
                  </a>
                )}
              </dd>
            </div>
          ) : project.status ? (
            <div className="flex flex-col gap-1.5 py-5 pr-6 sm:col-span-2">
              <dt className="text-sm font-semibold text-muted">Status</dt>
              <dd className="text-[17px] leading-[1.45] font-semibold">{project.status}</dd>
            </div>
          ) : (
            project.tier === "flagship" && (
              <div className="flex flex-col gap-1.5 py-5 pr-6">
                <dt className="text-sm font-semibold text-muted">Get the app</dt>
                {/* TODO(shahzaib): store links for this app */}
                <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-[17px] font-semibold text-muted">
                  <span>[App Store link]</span>
                  <span>[Google Play link]</span>
                </dd>
              </div>
            )
          )}
        </dl>
      </section>

      <div className="wrap">
        <ProjectMorph slug={project.slug}>
          <div
            className="relative h-[380px] overflow-hidden rounded-[28px] md:h-[600px] md:rounded-[32px]"
            style={{ background: project.tint.panel }}
          >
            <div className="absolute inset-x-0 top-8 flex origin-top scale-[0.62] justify-center sm:scale-[0.8] md:top-16 md:scale-100">
              {project.screens.slice(0, 3).map((screen, i) => (
                // The wrapper is what scrolls (HeroPhonesScroll); the phone keeps its tilt.
                <span key={i} data-hero-phone className={`inline-flex ${i === 1 ? "relative z-[1]" : ""}`}>
                  <PhoneFrame
                    screen={{ ...screen, label: `Screen: ${screen.label.toLowerCase()}` }}
                    tint={project.tint}
                    width={260}
                    sizes="(min-width: 768px) 260px, 160px"
                    eager
                    className={fan[i]}
                  />
                </span>
              ))}
            </div>
            <HeroPhonesScroll />
          </div>
        </ProjectMorph>
      </div>

      <article className="wrap flex flex-col gap-16 pt-20 md:gap-[88px] md:pt-28">
        {study.kind === "full" ? (
          <>
            <SplitSection title="The product">
              {study.product.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
            </SplitSection>
            <SplitSection title="The problem">
              {study.problem.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
            </SplitSection>
            <SplitSection title="My role">
              {study.role.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
            </SplitSection>
            <SplitSection title="What I built">
              {study.built.map((group, g) => (
                <div key={g} className="flex flex-col gap-2">
                  {group.group && <h3 className="pt-2 text-[19px] font-bold text-text">{group.group}</h3>}
                  <ul className="flex flex-col border-t border-line">
                    {group.items.map((item) => (
                      <li key={item.text} className="border-b border-line py-5 text-[17px] leading-[1.55]">
                        <Rich item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </SplitSection>
            {study.diagram && (
              <SplitSection title="Architecture">
                <ArchitectureDiagram diagram={study.diagram} />
              </SplitSection>
            )}
            <SplitSection title="Technical challenges">
              {study.challenges.map((item) => (
                <Rich key={item.text} item={item} />
              ))}
            </SplitSection>
            <SplitSection title="Important engineering decisions">
              <ol className="flex flex-col gap-7">
                {study.decisions.map((item, i) => (
                  <li key={item.text} className="grid grid-cols-[40px_1fr] gap-2">
                    <span className="pt-0.5 text-[17px] font-bold text-accent">{i + 1}</span>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[19px] font-bold text-text">{item.title}</span>
                      <span className="text-[17px] leading-[1.6] text-muted">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </SplitSection>
            <SplitSection title="Technology stack">
              <Para>{study.stack}</Para>
            </SplitSection>
            <SplitSection title="Outcome">
              {study.results && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
                  {study.results.map((r, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1.5 rounded-[18px] border border-line bg-surface p-6"
                    >
                      <span className="text-4xl font-extrabold tracking-[-0.02em] text-text">{r.value}</span>
                      <span className="text-[15px] leading-normal text-muted">{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {study.outcome.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
            </SplitSection>
            <SplitSection title="What I learned">
              {study.learned.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
              {study.learnedLink && (
                <p>
                  {study.learnedLink.before}
                  <a href={study.learnedLink.href} className="font-semibold text-accent underline underline-offset-2">
                    {study.learnedLink.label}
                  </a>
                  {study.learnedLink.after}
                </p>
              )}
            </SplitSection>
          </>
        ) : (
          <>
            <SplitSection>
              {study.paragraphs.map((p) => (
                <Para key={p}>{p}</Para>
              ))}
            </SplitSection>
            {study.results && (
              <SplitSection title="Results">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
                  {study.results.map((r, i) => (
                    <div key={i} className="flex flex-col gap-1.5 rounded-[18px] border border-line bg-surface p-6">
                      <span className="text-4xl font-extrabold tracking-[-0.02em] text-text">{r.value}</span>
                      <span className="text-[15px] leading-normal text-muted">{r.label}</span>
                    </div>
                  ))}
                </div>
              </SplitSection>
            )}
            <SplitSection title="Stack">
              <Para>{study.stack}</Para>
            </SplitSection>
          </>
        )}
        {testimonial && (
          <SplitSection title="What the client says">
            <TestimonialCard testimonial={testimonial} size="large" />
          </SplitSection>
        )}
      </article>

      <CTAStrip
        heading={study.cta.heading}
        body={study.cta.body}
        button={{ href: "/contact?type=build", label: study.cta.button }}
        link={study.cta.link}
      />

      <section className="wrap pt-12">
        <Link
          href={`/work/${next.slug}`}
          className="group grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-center gap-8 rounded-[28px] border border-line bg-surface p-6 no-underline transition-colors hover:border-line-strong md:p-8"
        >
          <span className="flex flex-col gap-2.5">
            <span className="text-base font-medium text-muted">Next project</span>
            <span className="flex items-center gap-3 text-[clamp(40px,4.4vw,52px)] leading-none font-extrabold tracking-[-0.035em]">
              {next.name}
              <ArrowUpRight size={28} className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="text-lg leading-normal text-body">{next.cardLine}</span>
          </span>
          <ProjectMorph slug={next.slug}>
            <span
              aria-hidden="true"
              className="flex h-[220px] items-start justify-center overflow-hidden rounded-[20px] pt-7"
              style={{ background: next.tint.panel }}
            >
              <span className="flex h-[260px] w-[140px] rounded-[26px] bg-[#0B0E13] p-[7px]">
                <span className="flex-1 rounded-[20px]" style={{ background: next.tint.screen }} />
              </span>
            </span>
          </ProjectMorph>
        </Link>
      </section>
    </>
  );
}
