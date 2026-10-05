"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll fade-in text: section headings (and anything marked data-reveal) start faint and
// brighten word by word in step with the scroll. Text is never fully hidden, and only text
// still below the fold when the script runs is touched. Hero headings and reduced motion
// are left alone. Headings that contain links are skipped so the link stays reachable by
// screen readers.
const SELECTOR = "main h2:not(:has(a, button)), main [data-reveal]";

// Nothing below the fold can reveal before the visitor scrolls, so GSAP waits for the
// first interaction and stays off the initial page load.
const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only text that's fully off-screen: anything already peeking into view stays put.
    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;
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
        targets.forEach((el) => {
          const split = SplitText.create(el, { type: "words", wordsClass: "reveal-word" });
          gsap.fromTo(
            split.words,
            { opacity: 0.2 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              // Tied to the scroll position: words brighten in reading order as the text moves
              // from the bottom of the window to just past the middle, and dim again going back.
              scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 55%", scrub: 0.4 },
            },
          );
        });
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
