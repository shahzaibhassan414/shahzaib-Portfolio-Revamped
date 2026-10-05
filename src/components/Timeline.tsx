import { Fragment } from "react";
import { Check } from "@/components/icons";
import { TimelineFill } from "@/components/TimelineFill";
import { Chip } from "@/components/ui";
import type { Role } from "@/content/experience";

/** Vertical experience timeline. The progress line fills as it scrolls through view (CSS). */
export function Timeline({ roles, nowLabel }: { roles: Role[]; nowLabel: string }) {
  return (
    <div className="relative flex flex-col gap-10 pl-10 md:pl-16">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-sm bg-line md:left-[15px]" />
      <TimelineFill className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-sm bg-[linear-gradient(var(--accent),var(--live))] md:left-[15px]" />

      {roles.map((role) => (
        <Fragment key={`${role.title}-${role.company}`}>
          {role.year && (
            <div className="relative flex items-center text-[15px] font-bold text-muted">
              <span
                aria-hidden="true"
                className={`absolute -left-10 size-4 rounded-full md:-left-14 ${
                  role.current ? "bg-accent" : "bg-bg shadow-[inset_0_0_0_2px_var(--accent)]"
                }`}
              />
              {role.year}
            </div>
          )}

          {role.minor ? (
            <article className="relative flex flex-wrap items-center gap-4 rounded-[22px] border border-dashed border-btn2-line p-5 md:px-7 md:py-6">
              <span className="flex size-11 flex-none items-center justify-center rounded-xl border border-line bg-surface-2 text-[15px] font-extrabold text-muted">
                {role.initials}
              </span>
              <span className="flex flex-[1_1_260px] flex-col gap-[3px]">
                <h3 className="text-[19px] font-bold">{role.title}</h3>
                <span className="text-[15px] text-muted">
                  {role.company}. {role.summary}
                </span>
              </span>
              <span className="flex-none rounded-full border border-line px-3 py-[7px] text-sm text-muted">
                {role.dates}
              </span>
            </article>
          ) : (
            <article
              className={`relative flex flex-col gap-[22px] rounded-[28px] border bg-surface p-5 md:p-8 ${
                role.current ? "border-accent shadow-[0_30px_60px_-40px_rgba(123,152,255,0.5)]" : "border-line"
              }`}
            >
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`flex size-[52px] flex-none items-center justify-center rounded-[14px] text-[17px] font-extrabold ${
                    role.current ? "bg-accent text-on-accent" : "border border-line bg-surface-2 text-muted"
                  }`}
                >
                  {role.initials}
                </span>
                <span className="flex flex-1 flex-col gap-[3px]">
                  <h3 className="text-[21px] font-bold tracking-[-0.01em]">{role.title}</h3>
                  <span className="text-base text-muted">{role.company}</span>
                </span>
                {role.current ? (
                  <span className="flex flex-none items-center gap-2 rounded-full bg-[rgba(61,214,140,0.14)] px-3 py-[7px] text-sm font-semibold text-live">
                    <span className="size-2 rounded-full bg-live" />
                    {role.dates}
                  </span>
                ) : (
                  <span className="flex-none rounded-full border border-line px-3 py-[7px] text-sm text-muted">
                    {role.dates}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-3 text-base leading-normal text-body">
                {role.highlights.map((item) => (
                  <li key={item} className="grid grid-cols-[20px_1fr] gap-2.5">
                    <Check
                      size={18}
                      strokeWidth={2.2}
                      className={`mt-[3px] ${role.current ? "text-accent" : "text-muted"}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {role.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <Chip key={tag} size="sm">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </article>
          )}
        </Fragment>
      ))}

      <div className="relative flex items-center text-[15px] font-bold">
        <span
          aria-hidden="true"
          className="absolute -left-10 size-4 rounded-full bg-live shadow-[0_0_0_6px_rgba(61,214,140,0.18)] md:-left-14"
        />
        {nowLabel}
      </div>
    </div>
  );
}
