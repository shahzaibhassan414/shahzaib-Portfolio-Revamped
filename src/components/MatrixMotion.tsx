"use client";

import { useEffect } from "react";

// Scroll animation for the capability table (smoothed by Lenis on desktop): project names
// drop in, capability rows slide in one after another, and the "yes" dots pop in row by
// row, as if each capability is being ticked off. Tied to the scroll, so it reverses on
// the way back up. Only runs if the table is still below the fold when GSAP loads (on the
// first interaction); reduced motion leaves the table as it is.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function MatrixMotion({ target }: { target: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const table = document.getElementById(target);
      if (!table || table.getBoundingClientRect().top < window.innerHeight) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: table, start: "top 88%", end: "top 30%", scrub: 0.8 },
        });
        tl.from(table.querySelectorAll("thead th"), { autoAlpha: 0, y: -12, stagger: 0.06, duration: 0.4 })
          .from(table.querySelectorAll("tbody tr"), { autoAlpha: 0, x: -28, stagger: 0.12, duration: 0.5 }, "-=0.2")
          .from(
            table.querySelectorAll("[data-dot='yes']"),
            { scale: 0, stagger: 0.03, duration: 0.35, ease: "back.out(2.6)" },
            "-=0.6",
          );
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
  }, [target]);

  return null;
}
