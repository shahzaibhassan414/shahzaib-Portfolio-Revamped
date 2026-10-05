"use client";

import { useEffect, useRef } from "react";

// A number that counts up from 0 when it scrolls into view. The final value is in the HTML,
// and the count only resets to 0 while the number is still off-screen, so it never sits at
// 0 waiting for JavaScript. Screen readers always get the final value. Reduced motion shows
// it straight away.

const format = (n: number) => n.toLocaleString("en-US");

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already in view: leave it
    el.textContent = format(0) + suffix;

    let tween: { kill: () => void } | undefined;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const { gsap } = await import("gsap");
        const counter = { n: 0 };
        tween = gsap.to(counter, {
          n: value,
          duration: value > 100 ? 2 : 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(Math.round(counter.n)) + suffix;
          },
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
      el.textContent = format(value) + suffix;
    };
  }, [value, suffix]);

  return (
    <>
      <span className="sr-only">{format(value) + suffix}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(value) + suffix}
      </span>
    </>
  );
}
