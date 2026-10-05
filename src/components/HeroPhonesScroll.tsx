"use client";

import { useLayoutEffect, useRef } from "react";

// Case-study header: as the page scrolls past it, the middle phone rises and grows a
// little while the outer two fan further out. Tied to the scroll, so it reverses on the
// way back. It moves wrapper spans ([data-hero-phone]) so the phones' own tilt classes
// stay intact. GSAP loads on the first scroll; reduced motion leaves the phones still.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown"] as const;

export function HeroPhonesScroll() {
  const ref = useRef<HTMLSpanElement>(null);

  // Layout effect so the cleanup runs before React removes the page on navigation.
  useLayoutEffect(() => {
    const panel = ref.current?.parentElement;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const [left, middle, right] = panel.querySelectorAll<HTMLElement>("[data-hero-phone]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          // From the top of the page until the panel is mostly scrolled past (still visible).
          scrollTrigger: { trigger: panel, start: 0, end: "bottom 40%", scrub: 0.6 },
        });
        if (left) tl.to(left, { xPercent: -32, yPercent: 10, rotate: -12, transformOrigin: "50% 100%" }, 0);
        if (middle) tl.to(middle, { yPercent: -14, scale: 1.08, transformOrigin: "50% 100%" }, 0);
        if (right) tl.to(right, { xPercent: 32, yPercent: 10, rotate: 12, transformOrigin: "50% 100%" }, 0);
      });
      revert = () => ctx.revert();
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
      revert?.();
    };
  }, []);

  return <span ref={ref} hidden />;
}
