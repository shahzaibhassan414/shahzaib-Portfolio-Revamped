"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { scrollToY } from "@/lib/scroll";

// From 768px up (and without reduced motion) the section pins and vertical scrolling moves
// the rail sideways. Phones keep the native swipe rail, and never download GSAP.
const PIN_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type Trigger = { start: number; end: number; progress: number };

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
 * On larger screens GSAP ScrollTrigger pins the section and scrubs the rail with the page.
 */
export function ProjectRail({
  header,
  trailing,
  label,
  children,
}: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Trigger | undefined>(undefined);
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

  useEffect(() => {
    const rail = railRef.current;
    const pin = pinRef.current;
    if (!rail || !pin) return;
    const mq = window.matchMedia(PIN_QUERY);
    let revert: (() => void) | undefined;
    let cancelled = false;

    const setup = () => {
      if (revert || !mq.matches) return;
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled || revert) return;
          gsap.registerPlugin(ScrollTrigger);
          const mm = gsap.matchMedia();
          mm.add(PIN_QUERY, () => {
            const distance = () => rail.scrollWidth - rail.clientWidth;
            const headerH = () =>
              parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                  "--header-h",
                ),
              ) || 88;
            // Centre the block in the space below the sticky header, or sit just under it.
            const pinTop = () =>
              Math.max(
                headerH() + 16,
                (window.innerHeight + headerH() - pin.offsetHeight) / 2,
              );
            // Shrink the phone panels so a whole card fits in the window while pinned.
            const fit = () => {
              rail.style.removeProperty("--panel-h");
              rail.style.removeProperty("--phone-scale");
              const panel = rail.querySelector<HTMLElement>("[data-panel]");
              if (!panel) return;
              const natural = panel.offsetHeight;
              const room = window.innerHeight - headerH() - 32;
              const height = Math.max(
                200,
                Math.min(natural, natural - (pin.offsetHeight - room)),
              );
              rail.style.setProperty("--panel-h", `${height}px`);
              rail.style.setProperty("--phone-scale", String(height / natural));
            };
            rail.dataset.pinned = "true";
            fit();
            ScrollTrigger.addEventListener("refreshInit", fit);
            const tween = gsap.fromTo(
              rail,
              { scrollLeft: 0 },
              {
                scrollLeft: distance,
                ease: "none",
                scrollTrigger: {
                  trigger: pin,
                  pin: true,
                  // GSAP turns spacing off when the parent is a flex container; the section below must wait.
                  pinSpacing: true,
                  scrub: 0.4,
                  start: () => `top ${pinTop()}px`,
                  end: () => `+=${distance()}`,
                  invalidateOnRefresh: true,
                },
              },
            );
            triggerRef.current = tween.scrollTrigger;
            return () => {
              ScrollTrigger.removeEventListener("refreshInit", fit);
              triggerRef.current = undefined;
              delete rail.dataset.pinned;
              rail.style.removeProperty("--panel-h");
              rail.style.removeProperty("--phone-scale");
            };
          });
          revert = () => mm.revert();
        },
      );
    };

    const trackY = (st: Trigger, left: number) => {
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? Math.min(1, Math.max(0, left / max)) : 0;
      return st.start + ratio * (st.end - st.start);
    };

    // Tabbing to a card the browser scrolled into view: move the page to match,
    // so the next scroll doesn't snap the rail back.
    const onFocus = (event: FocusEvent) => {
      const st = triggerRef.current;
      const card = (event.target as HTMLElement).closest("article");
      if (!st || !card) return;
      const padding = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      const left =
        card.getBoundingClientRect().left -
        rail.getBoundingClientRect().left +
        rail.scrollLeft -
        padding;
      scrollToY(trackY(st, left), { immediate: true });
    };

    setup();
    mq.addEventListener("change", setup);
    rail.addEventListener("focusin", onFocus);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", setup);
      rail.removeEventListener("focusin", onFocus);
      revert?.();
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector("article");
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const st = triggerRef.current;
    if (st) {
      // Pinned: the rail follows the page, so scroll the page to the next card's position.
      const max = rail.scrollWidth - rail.clientWidth;
      const target = Math.min(
        max,
        Math.max(0, st.progress * max + direction * (card.clientWidth + gap)),
      );
      scrollToY(st.start + (max > 0 ? target / max : 0) * (st.end - st.start));
      return;
    }
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollBy({
      left: direction * (card.clientWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const count = Array.isArray(children) ? children.length : 1;
  // The bar shows at least one card's worth so it never looks empty.
  const fill = Math.min(1, 1 / count + progress * (1 - 1 / count));

  return (
    <div className="flex flex-col gap-8">
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

      {/* Pinned on larger screens: the progress bar and the cards, below the sticky header. */}
      <div ref={pinRef} className="flex flex-col gap-8">
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
          className="no-scrollbar flex snap-x snap-mandatory gap-5 data-[pinned=true]:snap-none data-[pinned=true]:overflow-x-hidden overflow-x-auto px-[max(20px,calc((100%-1200px)/2+20px))] pt-2 pb-6 scroll-px-[max(20px,calc((100%-1200px)/2+20px))] md:gap-8 md:px-[max(40px,calc((100%-1200px)/2+40px))] md:scroll-px-[max(40px,calc((100%-1200px)/2+40px))]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
