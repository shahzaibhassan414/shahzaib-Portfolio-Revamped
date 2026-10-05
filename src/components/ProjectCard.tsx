import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectMorph } from "@/components/ProjectMorph";
import { Chip } from "@/components/ui";
import type { Project } from "@/content/projects";

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
    <article className="flex w-[min(820px,86vw)] flex-none snap-start flex-col gap-5 rounded-[28px] border border-line bg-surface p-5 md:p-7">
      <div className="flex items-center gap-3.5 font-mono text-[13px] text-muted">
        <span
          className="rounded-md px-2 py-1"
          style={{ background: `color-mix(in srgb, ${project.color} 20%, transparent)`, color: project.tint.label }}
        >
          {number}
        </span>
        <span className="flex-1 border-t border-dashed border-line" />
        <span className="tracking-[0.12em] uppercase">{project.kind}</span>
        <span className="hidden flex-1 border-t border-dashed border-line sm:block" />
        <span className="hidden sm:block">{project.platforms}</span>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="flex size-12 flex-none items-center justify-center rounded-[13px] text-lg font-extrabold text-white md:size-14 md:rounded-[15px] md:text-xl"
          style={{ background: project.color }}
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

      <p className="text-[17px] leading-[1.55] text-body md:text-[19px]">{project.cardLine}</p>

      <ProjectMorph slug={project.slug}>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          data-panel
          className="group relative block h-[280px] overflow-hidden rounded-[20px] md:h-[var(--panel-h,420px)]"
          style={{ background: project.tint.panel }}
        >
          <span className="absolute inset-x-0 top-7 flex origin-top scale-[0.6] justify-center sm:scale-[0.75] md:top-11 md:scale-[var(--phone-scale,1)]">
            {project.screens.slice(0, 3).map((screen, i) => (
              <PhoneFrame
                key={i}
                screen={screen}
                tint={project.tint}
                className={`transition-transform duration-500 ease-spring motion-reduce:transition-none ${fan[i]}`}
              />
            ))}
          </span>
          <span className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[rgba(11,14,19,0.88)] py-3 pr-[18px] pl-5 text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)]">
            {isFlagship ? "Read the case study" : "View project"}
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </span>
        </Link>
      </ProjectMorph>

      <div data-tags className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </article>
  );
}
