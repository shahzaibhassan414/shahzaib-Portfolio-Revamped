import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectMorph } from "@/components/ProjectMorph";
import { Chip } from "@/components/ui";
import { filterId, type Project } from "@/content/projects";

const panelBg = (p: Project) =>
  `radial-gradient(70% 60% at 50% 25%, ${p.gradient[0]} 0%, ${p.gradient[1]} 45%, ${p.gradient[2]} 100%)`;

const vars = (r: string, tx: string, ty: string) => ({ "--r": r, "--tx": tx, "--ty": ty }) as CSSProperties;

/** Mixed-size tile on the Work page. `size` sets the flex ratio; small tiles show two phones. */
export function ProjectTile({ project, size }: { project: Project; size: "large" | "small" }) {
  const large = size === "large";
  const width = large ? 200 : 190;
  const [a, b, c] = project.screens;
  const live = project.storeLinks?.appStore && project.storeLinks?.googlePlay;

  return (
    <ProjectMorph slug={project.slug}>
      <Link
        href={`/work/${project.slug}`}
        data-cat={filterId(project)}
        className={`tile relative flex h-[460px] overflow-hidden rounded-[28px] text-white no-underline md:h-[600px] md:rounded-[32px] ${
          large ? "flex-[7_1_600px]" : "flex-[5_1_420px]"
        }`}
        style={{ background: panelBg(project) }}
      >
        <span aria-hidden="true" className="dot-grid absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-10 flex origin-top scale-[0.75] justify-center md:top-14 md:scale-100"
        >
          {large ? (
            <>
              <PhoneFrame screen={a} tint={project.tint} width={width} className="ph1 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={vars("-8deg", "26px", "30px")} />
              <PhoneFrame screen={b} tint={project.tint} width={width} className="relative z-[1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]" />
              <PhoneFrame screen={c} tint={project.tint} width={width} className="ph3 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={vars("8deg", "-26px", "30px")} />
            </>
          ) : (
            <>
              <PhoneFrame screen={a} tint={project.tint} width={width} className="ph1 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={vars("-7deg", "20px", "26px")} />
              <PhoneFrame screen={c} tint={project.tint} width={width} className="ph3 relative z-[1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]" style={vars("6deg", "-20px", "10px")} />
            </>
          )}
        </span>
  
        {live && (
          <span className="absolute top-6 left-6 z-[2] flex items-center gap-1.5 rounded-full bg-[rgba(11,14,19,0.6)] px-3 py-2 text-[13px] font-semibold">
            <span className="size-[7px] rounded-full bg-live" />
            Live on both stores
          </span>
        )}
  
        <span
          className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-5 px-6 pt-[120px] pb-[30px] md:px-8"
          style={{ background: `linear-gradient(transparent, rgba(${project.shade},0.92) 60%)` }}
        >
          <span className="flex flex-col gap-2">
            <span className="text-sm font-semibold opacity-80">{project.kind}</span>
            <span className="text-[clamp(34px,3.4vw,44px)] leading-none font-extrabold tracking-[-0.035em]">
              {project.name}
            </span>
            <span className="max-w-[440px] text-base leading-normal opacity-85">{project.cardLine}</span>
          </span>
          <span className="flex size-[52px] flex-none items-center justify-center rounded-full bg-white text-[#0B0E13]">
            <ArrowUpRight size={20} />
          </span>
        </span>
      </Link>
    </ProjectMorph>
  );
}

/** The large On Scene card at the top of the Work page. */
export function FeaturedProject({ project }: { project: Project }) {
  const [a, b, c] = project.screens;
  return (
    <section aria-label="Featured project" className="wrap-wide" data-cat={filterId(project)}>
      <Link
        href={`/work/${project.slug}`}
        className="tile flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-surface no-underline md:rounded-[36px]"
      >
        <ProjectMorph slug={project.slug}>
          <span
            className="relative h-[460px] flex-[1_1_640px] overflow-hidden md:h-[640px]"
            style={{ background: `radial-gradient(70% 60% at 50% 30%, ${project.gradient[0]} 0%, ${project.gradient[1]} 45%, ${project.gradient[2]} 100%)` }}
          >
            <span aria-hidden="true" className="dot-grid absolute inset-0" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-12 flex origin-top scale-[0.7] justify-center md:top-[72px] md:scale-100"
            >
              <PhoneFrame screen={a} tint={project.tint} width={230} className="ph1 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={vars("-8deg", "30px", "34px")} />
              <PhoneFrame screen={b} tint={project.tint} width={230} className="relative z-[1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]" />
              <PhoneFrame screen={c} tint={project.tint} width={230} className="ph3 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" style={vars("8deg", "-30px", "34px")} />
            </span>
            <span className="absolute top-6 left-6 rounded-full bg-[rgba(11,14,19,0.6)] px-3.5 py-2 text-[13px] font-semibold text-white">
              Featured case study
            </span>
          </span>
        </ProjectMorph>

        <span className="flex flex-[1_1_380px] flex-col gap-[22px] p-6 md:px-11 md:py-12">
          <span className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex size-[52px] flex-none items-center justify-center rounded-[14px] text-lg font-extrabold text-white"
              style={{ background: project.color }}
            >
              {project.initials}
            </span>
            <span className="text-base text-muted">{project.kind}</span>
          </span>
          <span className="text-[clamp(48px,5vw,64px)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            {project.name}
          </span>
          <span className="text-lg leading-[1.6] text-body">{project.cardLine}</span>
          <span className="flex flex-col border-t border-line">
            {[
              ["Role", project.role],
              ["Platforms", project.platforms],
              ["The hard part", project.hardPart],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <span key={k} className="flex justify-between gap-4 border-b border-line py-3.5 text-[15px]">
                  <span className="text-muted">{k}</span>
                  <span className="max-w-[240px] text-right font-semibold">{v}</span>
                </span>
              ))}
          </span>
          <span className="flex flex-wrap gap-2">
            {project.tags
              .filter((t) => t !== "Flutter")
              .map((t) => (
                <Chip key={t} size="sm">
                  {t}
                </Chip>
              ))}
          </span>
          <span className="mt-auto flex items-center gap-2.5 text-[17px] font-bold text-accent">
            Read the case study
            <ArrowRight size={18} />
          </span>
        </span>
      </Link>
    </section>
  );
}
