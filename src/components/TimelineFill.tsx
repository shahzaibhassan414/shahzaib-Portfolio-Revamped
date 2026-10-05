"use client";

import { useEffect, useRef } from "react";

/**
 * The timeline's progress line. Browsers with scroll-driven animations use the CSS in
 * globals.css; others get this scroll listener. Reduced motion shows the full line.
 */
export function TimelineFill({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts filling as the line enters the lower part of the screen, done by mid-screen.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = (start - rect.top) / (rect.height + start - end);
      el.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <span ref={ref} aria-hidden="true" className={`timeline-fill ${className}`} />;
}
