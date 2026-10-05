import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectMorph } from "@/components/ProjectMorph";
import { Chip } from "@/components/ui";
import type { Project } from "@/content/projects";
import { onWhiteText } from "@/lib/color";

const fan = [
  "rotate-[-8deg] translate-x-[26px] translate-y-[30px] group-hover:rotate-[-11deg] group-hover:translate-x-[14px]",
  "relative z-[1]",
  "rotate-[8deg] -translate-x-[26px] translate-y-[30px] group-hover:rotate-[11deg] group-hover:-translate-x-[14px]",
];

/** Large project card used in the homepage rail. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const isFlagship = project.tier === "flagship";
  const kindOfPage = isFlagship ? "case study" : "project";
  const number = String(index + 1).padStart(2, "0");

  return (
    // Phones: stacked (details, then the phone panel). From md: details on the left and the
    // panel on the right at full card height, so the phones can be large without being cut.
    <article className="flex w-[min(820px,86vw)] flex-none snap-start flex-col gap-5 rounded-[28px] border border-line bg-surface p-5 md:grid md:w-[min(1000px,82vw)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-8 md:p-7">
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex items-center gap-3.5 font-mono text-[13px] text-muted">
          <span
            className="rounded-md px-2 py-1"
            style={{ background: `color-mix(in srgb, ${project.color} 20%, transparent)`, color: project.tint.label }}
          >
            {number}
          </span>
          <span className="flex-1 border-t border-dashed border-line" />
          <span className="tracking-[0.12em] uppercase">{project.kind}</span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="flex size-12 flex-none items-center justify-center rounded-[13px] text-lg font-extrabold text-white md:size-14 md:rounded-[15px] md:text-xl"
            style={{ background: onWhiteText(project.color) }}
            aria-hidden="true"
          >
            {project.initials}
          </span>
          <h3 className="flex-1 text-[clamp(28px,3vw,36px)] leading-none font-extrabold tracking-[-0.03em]">
            {project.name}
          </h3>
          <Link
            href={href}
            aria-label={`Open the ${project.name} ${kindOfPage}`}
            className="flex size-11 flex-none items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="text-[17px] leading-[1.55] text-body md:text-[18px]">{project.cardLine}</p>

        <span className="hidden text-[15px] text-muted md:block">{project.platforms}</span>

        <div data-tags className="flex flex-wrap gap-2 md:mt-auto">
          {project.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>

      <ProjectMorph slug={project.slug}>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          data-panel
          className="group relative block h-[280px] overflow-hidden rounded-[20px] md:h-[var(--panel-h,440px)]"
          style={{ background: project.tint.panel }}
        >
          {/* Scaled so the whole fanned set (about 578 x 478px at full size) stays inside the panel. */}
          <span className="absolute inset-0 flex scale-[0.48] items-center justify-center md:scale-[var(--phone-scale,0.8)]">
            {project.screens.slice(0, 3).map((screen, i) => (
              <PhoneFrame
                key={i}
                screen={screen}
                tint={project.tint}
                className={`transition-transform duration-500 ease-spring motion-reduce:transition-none ${fan[i]}`}
              />
            ))}
          </span>
        </Link>
      </ProjectMorph>
    </article>
  );
}
