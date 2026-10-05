"use client";

import { useEffect, useRef } from "react";

// The footer's large faded name.
// - Fit: splitting into letters loses kerning, so the text is sized to fill the available
//   width exactly (on load and on resize) and never runs past the edge.
// - Reveal: each letter rises from behind a mask with a slight alternating tilt and fades
//   up, one after another, in step with the scroll (reversing on the way back up).
// - Hover (desktop): a letter lifts and lights up in the accent under the pointer.
// Decorative: hidden from screen readers. Static with reduced motion or before any scroll.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function FooterWordmark({ text }: { text: string }) {
  const lineRef = useRef<HTMLDivElement>(null);

  // Fit the name to the container width.
  useEffect(() => {
    const line = lineRef.current;
    const box = line?.parentElement;
    if (!line || !box) return;
    const fit = () => {
      line.style.fontSize = "";
      const font = parseFloat(getComputedStyle(line).fontSize);
      // The letters' own span (scrollWidth never reports less than the box, so it can't grow).
      const first = line.firstElementChild as HTMLElement | null;
      const last = line.lastElementChild as HTMLElement | null;
      if (!first || !last) return;
      const natural = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      if (natural > 0) line.style.fontSize = `${(font * line.clientWidth * 0.97) / natural}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  // Scroll reveal.
  useEffect(() => {
    const line = lineRef.current;
    if (!line || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      if (line.getBoundingClientRect().top < window.innerHeight) return; // already in view: leave it
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from(line.querySelectorAll("[data-letter]"), {
          yPercent: 115,
          rotate: (i: number) => (i % 2 ? 9 : -9),
          opacity: 0.15,
          transformOrigin: "50% 100%",
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: line.closest("footer") ?? line,
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
    <div aria-hidden="true" className="mx-auto mt-16 max-w-[1280px] px-5 select-none md:px-7">
      <div
        ref={lineRef}
        // pt/-mb give the mask room for the cap height (the line height is tighter than the glyphs)
        className="-mb-[0.14em] flex overflow-hidden pt-[0.14em] text-[clamp(36px,10.4vw,156px)] leading-[0.8] font-extrabold tracking-[-0.05em] whitespace-nowrap"
      >
        {[...text].map((char, i) => (
          // Outer span: the scroll reveal (GSAP owns its transform). Inner span: the hover lift,
          // kept separate because GSAP sets `translate: none` on elements it animates.
          <span key={i} data-letter className="inline-block">
            <span className="wordmark-letter inline-block bg-clip-text text-transparent transition-[translate] duration-300 ease-spring">
              {char === " " ? "\u00a0" : char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
