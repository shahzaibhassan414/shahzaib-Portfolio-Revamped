"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollToY } from "@/lib/scroll";

// From 768px up (and without reduced motion) the section pins and vertical scrolling moves
// the rail sideways. Phones keep the native swipe rail, and never download GSAP.
const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type Trigger = { start: number; end: number; progress: number };

type ProjectRailProps = {
  /** Section heading and intro. */
  header: ReactNode;
  /** Link shown beside the heading (for example "See all work"). */
  trailing?: ReactNode;
  label: string;
  children: ReactNode;
};

/**
 * Horizontal scroll-snap rail. Works with touch and trackpads natively, and the rail is
 * focusable so arrow keys scroll it. On larger screens GSAP ScrollTrigger pins the whole
 * section (heading and cards together, so nothing scrolls away) and scrubs the rail with
 * the page.
 */
export function ProjectRail({ header, trailing, label, children }: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Trigger | undefined>(undefined);
  useEffect(() => {
    const rail = railRef.current;
    const pin = pinRef.current;
    if (!rail || !pin) return;
    const mq = window.matchMedia(PIN_QUERY);
    let revert: (() => void) | undefined;
    let cancelled = false;

    const setup = () => {
      if (revert || !mq.matches) return;
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || revert) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add(PIN_QUERY, () => {
          const distance = () => rail.scrollWidth - rail.clientWidth;
          const headerH = () =>
            parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 88;
          // Centre the block in the space below the sticky header, or sit just under it.
          const pinTop = () => Math.max(headerH() + 16, (window.innerHeight + headerH() - pin.offsetHeight) / 2);
          // Size the phone panels to the window while pinned: the card fills the space below
          // the heading, and the phones get the largest scale that fits the panel both ways.
          const fit = () => {
            rail.style.removeProperty("--panel-h");
            rail.style.removeProperty("--phone-scale");
            const panel = rail.querySelector<HTMLElement>("[data-panel]");
            const heading = pin.firstElementChild as HTMLElement | null;
            if (!panel || !heading) return;
            // heading gap 32, rail padding 8 + 24, card padding 56, 16 clear at the bottom
            const room = window.innerHeight - (headerH() + 16) - heading.offsetHeight - 32 - 32 - 56 - 16;
            const height = Math.max(260, Math.min(560, room));
            const scale = Math.min((height - 48) / 478, (panel.offsetWidth - 32) / 578, 1);
            rail.style.setProperty("--panel-h", `${height}px`);
            rail.style.setProperty("--phone-scale", String(scale));
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
                // Measure this pin first so triggers further down the page account for its spacing.
                refreshPriority: 1,
                scrub: 0.4,
                start: () => `top ${pinTop()}px`,
                end: () => `+=${distance()}`,
                invalidateOnRefresh: true,
              },
            },
          );
          triggerRef.current = tween.scrollTrigger;
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          return () => {
            ScrollTrigger.removeEventListener("refreshInit", fit);
            triggerRef.current = undefined;
            delete rail.dataset.pinned;
            rail.style.removeProperty("--panel-h");
            rail.style.removeProperty("--phone-scale");
          };
        });
        revert = () => mm.revert();
      });
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
      const left = card.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft - padding;
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

  return (
    // Pinned on larger screens: heading and cards together, below the sticky header.
    <div ref={pinRef} className="flex flex-col gap-8">
      <div className="wrap flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        {header}
        {trailing}
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
  );
}
