import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProjectMorph } from "@/components/ProjectMorph";
import { Chip } from "@/components/ui";
import { filterId, type Project } from "@/content/projects";
import { onWhiteText } from "@/lib/color";

const panelBg = (p: Project) =>
  `radial-gradient(70% 60% at 50% 25%, ${p.gradient[0]} 0%, ${p.gradient[1]} 45%, ${p.gradient[2]} 100%)`;

const vars = (r: string, tx: string, ty: string) => ({ "--r": r, "--tx": tx, "--ty": ty }) as CSSProperties;

/**
 * Compact project card on the Work page: a phone panel on top, details below, a lift and
 * phone fan on hover, and a border glow that follows the pointer (see GlowCards).
 */
export function ProjectTile({ project, index }: { project: Project; index: number }) {
  const [a, b] = project.screens;
  const live = project.storeLinks?.appStore && project.storeLinks?.googlePlay;
  const flagship = project.tier === "flagship";

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cat={filterId(project)}
      data-glow
      data-tile
      className="tile glow-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface text-text no-underline"
    >
      <ProjectMorph slug={project.slug}>
        <span
          className="relative block h-[272px] overflow-hidden"
          style={{ background: panelBg(project) }}
        >
          <span aria-hidden="true" className="dot-grid absolute inset-0" />
          <span aria-hidden="true" data-phones className="absolute inset-x-0 top-5 flex justify-center">
            <PhoneFrame
              screen={a}
              tint={project.tint}
              width={104}
              className="ph1 relative shadow-[0_24px_40px_-16px_rgba(0,0,0,0.6)]"
              style={vars("-7deg", "14px", "16px")}
            />
            <PhoneFrame
              screen={b}
              tint={project.tint}
              width={104}
              className="ph3 relative z-[1] shadow-[0_28px_50px_-16px_rgba(0,0,0,0.7)]"
              style={vars("6deg", "-14px", "4px")}
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16"
            style={{ background: `linear-gradient(transparent, rgba(${project.shade},0.55))` }}
          />
          <span className="absolute top-4 right-4 rounded-md bg-[rgba(11,14,19,0.55)] px-2 py-1 font-mono text-xs text-white/85">
            {String(index + 1).padStart(2, "0")}
          </span>
          {live && (
            <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[rgba(11,14,19,0.6)] px-2.5 py-1.5 text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-live" />
              Live on both stores
            </span>
          )}
        </span>
      </ProjectMorph>

      <span className="relative z-[2] flex flex-1 flex-col gap-3 p-5 md:p-6">
        <span className="flex items-center gap-2 text-[13px] font-medium text-muted">
          <span aria-hidden="true" className="size-2 rounded-full" style={{ background: project.color }} />
          {project.kind}
        </span>
        <span className="text-[26px] leading-none font-extrabold tracking-[-0.03em]">{project.name}</span>
        <span className="line-clamp-2 text-[15px] leading-[1.55] text-body">{project.cardLine}</span>
        <span className="flex flex-wrap gap-1.5">
          {project.tags
            .filter((t) => t !== "Flutter")
            .slice(0, 3)
            .map((t) => (
              <Chip key={t} size="sm">
                {t}
              </Chip>
            ))}
        </span>
        <span className="mt-auto flex items-center justify-between border-t border-line pt-4 text-[15px] font-semibold">
          {flagship ? "Read the case study" : "View project"}
          <span className="flex size-9 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
            <ArrowUpRight size={16} />
          </span>
        </span>
      </span>
    </Link>
  );
}

/** The large On Scene card at the top of the Work page. */
export function FeaturedProject({ project }: { project: Project }) {
  const [a, b, c] = project.screens;
  return (
    <section aria-label="Featured project" className="wrap-wide" data-cat={filterId(project)}>
      <Link
        href={`/work/${project.slug}`}
        data-glow
        data-tile
        className="tile glow-card relative flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-surface no-underline md:rounded-[36px]"
      >
        <ProjectMorph slug={project.slug}>
          <span
            className="relative h-[400px] flex-[1_1_600px] overflow-hidden md:h-[520px]"
            style={{
              background: `radial-gradient(70% 60% at 50% 30%, ${project.gradient[0]} 0%, ${project.gradient[1]} 45%, ${project.gradient[2]} 100%)`,
            }}
          >
            <span aria-hidden="true" className="dot-grid absolute inset-0" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-10 flex origin-top scale-[0.62] justify-center md:top-14 md:scale-[0.82]"
            >
              <PhoneFrame
                screen={a}
                tint={project.tint}
                width={230}
                className="ph1 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                style={vars("-8deg", "30px", "34px")}
              />
              <PhoneFrame
                screen={b}
                tint={project.tint}
                width={230}
                className="relative z-[1] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
              />
              <PhoneFrame
                screen={c}
                tint={project.tint}
                width={230}
                className="ph3 relative shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
                style={vars("8deg", "-30px", "34px")}
              />
            </span>
            <span className="absolute top-6 left-6 rounded-full bg-[rgba(11,14,19,0.6)] px-3.5 py-2 text-[13px] font-semibold text-white">
              Featured case study
            </span>
          </span>
        </ProjectMorph>

        <span className="relative z-[2] flex flex-[1_1_380px] flex-col gap-5 p-6 md:px-10 md:py-10">
          <span className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex size-[52px] flex-none items-center justify-center rounded-[14px] text-lg font-extrabold text-white"
              style={{ background: onWhiteText(project.color) }}
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
