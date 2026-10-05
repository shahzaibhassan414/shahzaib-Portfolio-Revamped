"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Card motion on every page: cards marked data-tile rise and fade in with a stagger as they scroll
// into view, and the phones inside each panel (data-phones) drift against the scroll for a
// little depth. Only cards still below the fold are hidden for the entrance, GSAP waits for
// the first interaction, and reduced motion turns it all off.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown", "pointermove"] as const;

export function TileMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const hidden = [...document.querySelectorAll<HTMLElement>("[data-tile]")].filter(
          (el) => el.getBoundingClientRect().top > window.innerHeight,
        );
        gsap.set(hidden, { autoAlpha: 0, y: 56 });
        ScrollTrigger.batch(hidden, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: true,
              // Hand the transform back to CSS, or the inline style would block the hover lift.
              clearProps: "transform,opacity,visibility",
            }),
        });

        document.querySelectorAll<HTMLElement>("[data-phones]").forEach((phones) => {
          gsap.fromTo(
            phones,
            { y: 8 },
            {
              y: -8,
              ease: "none",
              scrollTrigger: {
                trigger: phones.closest("[data-tile]") ?? phones,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
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
  }, [pathname]);

  return null;
}
