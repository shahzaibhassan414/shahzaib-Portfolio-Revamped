"use client";

import { useEffect, useRef } from "react";

// The footer's large faded name. Each letter rises from behind a mask, one after another,
// in step with the scroll as the footer comes into view (reversing on the way back up).
// The gradient sits on every letter; they share the line height, so it looks continuous.
// Decorative: hidden from screen readers. Static with reduced motion or before any scroll.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // already in view: leave it
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from(el.querySelectorAll("[data-letter]"), {
          yPercent: 105,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: el.closest("footer") ?? el,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
      });
      cleanup = () => ctx.revert();
    };

    const stopWaiting = () => INTERACTIONS.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stopWaiting();
      animate();
    }
    INTERACTIONS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    return () => {
      cancelled = true;
      stopWaiting();
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // pt/-mt give the mask room for the cap height (the line height is tighter than the glyphs)
      className="mx-auto mt-16 -mb-[0.14em] flex max-w-[1280px] overflow-hidden px-5 pt-[0.14em] text-[clamp(40px,11.4vw,168px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap select-none md:px-7"
    >
      {[...text].map((char, i) => (
        <span
          key={i}
          data-letter
          className="inline-block bg-[linear-gradient(180deg,var(--surface-2)_0%,transparent_95%)] bg-clip-text text-transparent"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </div>
  );
}
