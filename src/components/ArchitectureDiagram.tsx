import type { CSSProperties } from "react";
import { DrawIn } from "@/components/DrawIn";
import type { Diagram } from "@/content/case-studies";

function Connector({ label, accent, index }: { label: string; accent?: boolean; index: number }) {
  const color = accent ? "var(--accent)" : "var(--arrow)";
  return (
    <div
      className="relative flex h-full flex-col items-center justify-center gap-1 py-2 md:py-0"
      style={{ "--i": index } as CSSProperties}
    >
      <span
        className={`font-mono text-[13px] leading-4 ${accent ? "text-accent" : "text-muted"} md:absolute md:top-1`}
      >
        {label}
      </span>
      {/* Horizontal arrow on desktop, vertical on mobile. Lines draw in during the motion pass. */}
      <svg
        className="diagram-line-h hidden h-2 w-full overflow-visible md:block"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="4" x2="100" y2="4" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="diagram-line-v h-6 w-2 overflow-visible md:hidden" viewBox="0 0 8 24" aria-hidden="true">
        <line x1="4" y1="0" x2="4" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M0 16 L4 24 L8 16 Z" fill={color} />
      </svg>
      <svg
        className="diagram-head absolute top-1/2 right-0 hidden -translate-y-1/2 md:block"
        width="8"
        height="10"
        viewBox="0 0 8 10"
        aria-hidden="true"
      >
        <path d="M0 0 L8 5 L0 10 Z" fill={color} />
      </svg>
    </div>
  );
}

/** App-side cards, flow labels, and service cards. Data-driven per project. */
export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="flex flex-col gap-4">
      <DrawIn className="rounded-3xl border border-line bg-surface p-4 md:p-6">
        <div className="relative grid grid-cols-1 gap-x-0 md:grid-cols-[232px_1fr_232px]">
          {/* Band behind the app column */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-[280px] rounded-[18px] bg-band md:-left-6 md:block"
          />
          <p className="relative mb-3 text-sm font-bold text-muted md:mb-6 md:pt-4">{diagram.appLabel}</p>
          <span className="hidden md:block" />
          <p className="relative hidden pt-4 text-sm font-bold text-muted md:mb-6 md:block">{diagram.serviceLabel}</p>

          {diagram.rows.map((row, i) => (
            <div key={row.app} className="contents">
              <div
                className={`relative flex min-h-16 items-center self-start rounded-xl bg-surface-2 px-4 py-2 text-base font-semibold ${
                  row.accent ? "border-[1.5px] border-accent" : "border border-line-strong"
                } ${i > 0 ? "mt-6 md:mt-8" : ""}`}
              >
                {row.app}
              </div>
              <div className={`relative md:h-16 md:self-start ${i > 0 ? "md:mt-8" : ""}`}>
                <Connector label={row.flow} accent={row.accent} index={i} />
              </div>
              <div className={`flex flex-col ${i > 0 ? "md:mt-8" : ""}`}>
                <div
                  className={`flex min-h-16 items-center rounded-xl bg-surface px-4 py-2 text-base ${
                    row.accent ? "border-[1.5px] border-accent" : "border border-line-strong"
                  }`}
                >
                  {row.service}
                </div>
                {row.below && (
                  <>
                    <div className="flex justify-center py-1" style={{ "--i": i + 1 } as CSSProperties}>
                      <svg className="diagram-line-v h-12 w-2 overflow-visible" viewBox="0 0 8 48" aria-hidden="true">
                        <line x1="4" y1="0" x2="4" y2="42" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                        <path d="M0 40 L4 48 L8 40 Z" fill="var(--accent)" />
                      </svg>
                    </div>
                    <div className="flex min-h-16 items-center rounded-xl border border-line-strong bg-surface px-4 py-2 text-base leading-[1.3]">
                      {row.below}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </DrawIn>
      <figcaption className="text-[15px] leading-normal text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
