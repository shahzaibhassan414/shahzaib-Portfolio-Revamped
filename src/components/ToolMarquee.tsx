"use client";

import { useLayoutEffect, useRef } from "react";

// Two full-width rows of tool names gliding in opposite directions. Scrolling speeds them
// up, and scrolling up reverses them (GSAP scroll velocity). Decorative: the real list is
// in the toolkit cards below, so this is hidden from screen readers. Still until the first
// interaction, and with reduced motion.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown", "pointermove"] as const;

function Row({ items, outlined }: { items: string[]; outlined?: boolean }) {
  // Two copies side by side, so moving by -50% loops seamlessly.
  const run = [...items, ...items];
  return (
    <div data-marquee-row className="flex w-max items-center whitespace-nowrap will-change-transform">
      {run.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-5 text-[clamp(30px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.03em] md:px-7 ${
              outlined ? "text-transparent [-webkit-text-stroke:1.5px_var(--arrow)]" : "text-arrow"
            }`}
          >
            {item}
          </span>
          <span className="text-[clamp(18px,2vw,28px)] text-accent">✦</span>
        </span>
      ))}
    </div>
  );
}

export function ToolMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const [a, b] = root.querySelectorAll<HTMLElement>("[data-marquee-row]");
        // Row a moves left, row b moves right; both loop.
        const loops = [
          gsap.to(a, { xPercent: -50, duration: 90, ease: "none", repeat: -1 }),
          gsap.fromTo(b, { xPercent: -50 }, { xPercent: 0, duration: 100, ease: "none", repeat: -1 }),
        ];
        let direction = 1;
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
            // A gentle boost, capped low so fast scrolls and jumps (reloads, anchors) never race it.
            const boost = Math.min(2.5, 1 + Math.abs(velocity) / 1200);
            loops.forEach((loop) => gsap.to(loop, { timeScale: direction * boost, duration: 0.4, overwrite: true }));
            // Ease back to cruising speed (keeping the last direction) once scrolling stops.
            loops.forEach((loop) =>
              gsap.to(loop, { timeScale: direction, duration: 1.6, delay: 0.3, ease: "power2.out", overwrite: false }),
            );
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

  const reversed = [...items].reverse();
  return (
    <div ref={ref} aria-hidden="true" className="flex flex-col gap-3 overflow-x-clip py-2 select-none md:gap-5">
      <Row items={items} />
      <Row items={reversed} outlined />
    </div>
  );
}
