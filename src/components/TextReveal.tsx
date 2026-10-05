"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Section headings slide up line by line, from behind a mask, as they scroll into view.
// Only headings still below the fold when the script runs are touched, so nothing is
// ever hidden waiting for JavaScript. Hero headings and reduced motion are left alone.
// Headings that contain links are skipped so the link stays reachable by screen readers.
const SELECTOR = "main h2:not(:has(a, button)), main [data-reveal]";

// Nothing below the fold can reveal before the visitor scrolls, so GSAP waits for the
// first interaction and stays off the initial page load.
const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;
    if (![...document.querySelectorAll(SELECTOR)].some(belowFold)) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const reveal = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
        document.fonts.ready,
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const targets = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter(belowFold);
      const ctx = gsap.context(() => {
        targets.forEach((el) =>
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
            autoSplit: true,
            // Returning the tween lets SplitText keep its progress when it re-splits on resize.
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          }),
        );
      });
      // Reverts the splits and kills their ScrollTriggers together.
      cleanup = () => ctx.revert();
    };

    const stopWaiting = () => INTERACTIONS.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stopWaiting();
      reveal();
    }
    INTERACTIONS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    return () => {
      cancelled = true;
      stopWaiting();
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
