"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";

type ProjectRailProps = {
  /** Section heading and intro, rendered on the left of the controls. */
  header: ReactNode;
  /** Link shown after the arrows (for example "See all work"). */
  trailing?: ReactNode;
  label: string;
  children: ReactNode;
};

/**
 * Horizontal scroll-snap rail. Works with touch and trackpads natively; the arrow buttons
 * step one card at a time, and the rail itself is focusable so arrow keys scroll it.
 */
export function ProjectRail({ header, trailing, label, children }: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setProgress(max > 0 ? rail.scrollLeft / max : 1);
    setAtStart(rail.scrollLeft <= 4);
    setAtEnd(rail.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const frame = requestAnimationFrame(update);
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector("article");
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({ left: direction * (card.clientWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const count = Array.isArray(children) ? children.length : 1;
  // The bar shows at least one card's worth so it never looks empty.
  const fill = Math.min(1, 1 / count + progress * (1 - 1 / count));

  return (
    <>
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        {header}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Previous project"
            aria-controls="project-rail"
            aria-disabled={atStart}
            onClick={() => step(-1)}
            className="flex size-12 items-center justify-center rounded-full border border-btn2-line bg-surface text-text transition-opacity aria-disabled:cursor-default aria-disabled:bg-transparent aria-disabled:text-muted aria-disabled:opacity-60"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            aria-controls="project-rail"
            aria-disabled={atEnd}
            onClick={() => step(1)}
            className="flex size-12 items-center justify-center rounded-full border border-btn2-line bg-surface text-text transition-opacity aria-disabled:cursor-default aria-disabled:bg-transparent aria-disabled:text-muted aria-disabled:opacity-60"
          >
            <ChevronRight size={20} />
          </button>
          {trailing}
        </div>
      </div>

      <div className="wrap" aria-hidden="true">
        <div className="relative h-[3px] overflow-hidden rounded-[3px] bg-line">
          <span
            className="absolute inset-0 origin-left rounded-[3px] bg-accent transition-transform duration-150 motion-reduce:transition-none"
            style={{ transform: `scaleX(${fill})` }}
          />
        </div>
      </div>

      <div
        id="project-rail"
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(20px,calc((100%-1200px)/2+20px))] pt-2 pb-6 scroll-px-[max(20px,calc((100%-1200px)/2+20px))] md:gap-8 md:px-[max(40px,calc((100%-1200px)/2+40px))] md:scroll-px-[max(40px,calc((100%-1200px)/2+40px))]"
      >
        {children}
      </div>
    </>
  );
}
