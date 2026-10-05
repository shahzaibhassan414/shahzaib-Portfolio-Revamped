"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Scroll-selected items. On larger screens the surrounding section pins and scrolling
// walks through the children marked data-step one by one; on phones (stacked) each is
// selected as it crosses the middle of the screen. The active item gets data-current and
// aria-current="step"; the look lives in globals.css ([data-select="on"]), so server-rendered
// items can use it. Without JavaScript, or with reduced motion, every item shows normally.

const PIN_QUERY = "(min-width: 768px)";
const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

type ScrollSelectProps = {
  children: ReactNode;
  className?: string;
  as?: "ol" | "div";
  /** Scroll distance per item while pinned, as a share of the window height. */
  perItem?: number;
};

export function ScrollSelect({ children, className = "", as: Tag = "div", perItem = 0.45 }: ScrollSelectProps) {
  const ref = useRef<HTMLElement>(null);

  // A layout effect, so the cleanup (which unwraps GSAP's pin) runs before React removes
  // the page on navigation; otherwise React finds the section inside GSAP's pin-spacer.
  useLayoutEffect(() => {
    const list = ref.current;
    const section = list?.closest("section");
    if (!list || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...list.querySelectorAll<HTMLElement>(":scope > [data-step]")];
    if (!items.length) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    let current = -1;

    const select = (index: number | null) => {
      if (index === current) return;
      current = index ?? -1;
      if (index === null) delete list.dataset.select;
      else list.dataset.select = "on";
      items.forEach((item, i) => {
        if (i === index) {
          item.dataset.current = "";
          item.setAttribute("aria-current", "step");
        } else {
          delete item.dataset.current;
          item.removeAttribute("aria-current");
        }
      });
    };

    // Below the fold: GSAP (and the dimming) waits for the first interaction.
    const load = () =>
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();

        // Desktop: pin the section and step through the items with the scroll.
        mm.add(PIN_QUERY, () => {
          select(0);
          ScrollTrigger.create({
            trigger: section,
            start: "center center",
            end: () => `+=${items.length * window.innerHeight * perItem}`,
            pin: true,
            // The parent is a flex column, where GSAP would otherwise skip the spacing.
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => select(Math.min(items.length - 1, Math.floor(self.progress * items.length))),
          });
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          return () => select(null);
        });

        // Phones: select each item as it crosses the middle of the screen.
        mm.add(`not all and ${PIN_QUERY}`, () => {
          select(0);
          items.forEach((item, i) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => {
                if (self.isActive) select(i);
              },
            });
          });
          return () => select(null);
        });

        revert = () => mm.revert();
      });

    const stopWaiting = () => INTERACTIONS.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stopWaiting();
      load();
    }
    INTERACTIONS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    return () => {
      cancelled = true;
      stopWaiting();
      revert?.();
      select(null);
    };
  }, [perItem]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
