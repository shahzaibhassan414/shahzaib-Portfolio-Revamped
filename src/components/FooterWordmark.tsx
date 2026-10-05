"use client";

import { useEffect, useRef } from "react";

// The footer's large faded name.
// - Fit: splitting into letters loses kerning, so the text is sized to fill the available
//   width exactly (on load and on resize) and never runs past the edge.
// - Reveal: each letter rises from behind a mask with a slight alternating tilt and fades
//   up, one after another, whenever the name comes into view.
// - Hover (desktop): a letter lifts and lights up in the accent under the pointer.
// Decorative: hidden from screen readers. Static with reduced motion.

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

  // Reveal: plays whenever the name comes into view (including right after a reload at the
  // bottom of the page), and resets when it leaves so it plays again next time.
  useEffect(() => {
    const line = lineRef.current;
    if (!line || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const reveal = gsap.fromTo(
          line.querySelectorAll("[data-letter]"),
          { yPercent: 115, rotate: (i: number) => (i % 2 ? 10 : -10), opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            transformOrigin: "50% 100%",
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.045,
            paused: true,
          },
        );
        ScrollTrigger.create({
          trigger: line,
          start: "top bottom-=40",
          onEnter: () => reveal.restart(),
          onLeaveBack: () => reveal.pause(0),
        });
      });
      cleanup = () => ctx.revert();
    };

    // Load GSAP as the footer approaches (it's far below the fold, so this costs nothing up top).
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        animate();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(line);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div aria-hidden="true" className="mx-auto mt-16 max-w-[1280px] px-5 select-none md:px-7">
      <div
        ref={lineRef}
        // pt/pb give the mask room for the glyphs (the line height is tighter than they are), and
        // keep the bottom bar below the letters instead of over them
        className="flex overflow-hidden pt-[0.14em] pb-[0.06em] text-[clamp(36px,10.4vw,156px)] leading-[0.8] font-extrabold tracking-[-0.05em] whitespace-nowrap"
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
