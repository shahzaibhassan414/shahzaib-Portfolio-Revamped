"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Draws a diagram's connector lines once when it scrolls into view. Lines are only hidden
 * after hydration and only if the diagram is still below the fold, so nothing is ever
 * blank waiting for JavaScript.
 */
export function DrawIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.draw = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.draw = "done";
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
