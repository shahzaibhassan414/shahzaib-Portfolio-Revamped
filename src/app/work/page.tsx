import { CTAStrip } from "@/components/CTAStrip";
import { ProjectIndex } from "@/components/ProjectIndex";
import { FeaturedProject, ProjectTile } from "@/components/ProjectTile";
import { SectionTitle } from "@/components/ui";
import { WorkFilter } from "@/components/WorkFilter";
import { getProject, projectFilters, publishedProjects } from "@/content/projects";
import { primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

// Copy: docs/copy-and-seo.md section 7. Layout: design/work.html.

export const metadata = pageMetadata({
  title: "Flutter App Projects and Case Studies | Shahzaib Hassan",
  description:
    "Nine production Flutter apps: dating, marketplaces, Web3 commerce, and real-time systems, with the hard parts explained.",
  path: "/work",
});

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function WorkPage() {
  const featured = getProject("on-scene");
  const filters = projectFilters.map((f) => ({
    id: f.id,
    label: f.label,
    count: publishedProjects.filter((p) => p.category === f.category).length,
  }));
  const count = publishedProjects.length;

  return (
    <>
      <WorkFilter
        filters={filters}
        total={count}
        intro={
          <div className="flex max-w-[760px] flex-col gap-6">
            <h1 className="text-[clamp(72px,12vw,168px)] leading-[0.85] font-extrabold tracking-[-0.06em]">Work</h1>
            <p className="text-[19px] leading-normal text-body md:text-[22px]">
              Nine production Flutter apps across social discovery, marketplaces, Web3 commerce, and real-time systems.
              Each one had a part that was harder than it looked, and that&apos;s what each project page is about.
            </p>
          </div>
        }
      >
        {featured && <FeaturedProject project={featured} />}

        <section
          aria-label="Projects"
          className="wrap-wide grid gap-5 pt-5 sm:grid-cols-2 md:gap-6 md:pt-6 lg:grid-cols-3"
        >
          {publishedProjects.map((project, i) =>
            project.slug === featured?.slug ? null : <ProjectTile key={project.slug} project={project} index={i} />,
          )}
        </section>

        <section aria-labelledby="index-title" className="wrap-wide flex flex-col gap-8 pt-[88px] md:pt-[136px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle id="index-title">Every project</SectionTitle>
            <p className="text-[17px] text-muted">
              {numberWords[count] ?? count} apps, iOS and Android, all in Flutter.
            </p>
          </div>
          <ProjectIndex projects={publishedProjects} />
        </section>
      </WorkFilter>

      <CTAStrip
        wide
        avatar
        heading="Your app could be next."
        body="New build, rescue, or one hard feature: tell me what you're working on."
        button={primaryCta}
      />
    </>
  );
}
