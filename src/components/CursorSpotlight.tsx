"use client";

import { useEffect, useRef } from "react";

// Cursor spotlight: a soft light that follows the pointer across the page with a slight
// lag. A fixed-size gradient is moved with a transform (never repainted), so it stays
// cheap. Desktop pointers only; off with reduced motion; hidden when the pointer leaves.

const SIZE = 280;

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || reduce) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = async (first: PointerEvent) => {
      window.removeEventListener("pointermove", start);
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const toX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const toY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      gsap.set(el, { x: first.clientX - SIZE / 2, y: first.clientY - SIZE / 2 });
      const show = () => gsap.to(el, { autoAlpha: 1, duration: 0.4, overwrite: "auto" });
      const hide = () => gsap.to(el, { autoAlpha: 0, duration: 0.4, overwrite: "auto" });
      const onMove = (e: PointerEvent) => {
        toX(e.clientX - SIZE / 2);
        toY(e.clientY - SIZE / 2);
        show();
      };
      show();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", hide);
      };
    };
    window.addEventListener("pointermove", start, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", start);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-40 rounded-full opacity-0"
      style={{ width: SIZE, height: SIZE, background: "radial-gradient(closest-side, var(--spotlight), transparent)" }}
    />
  );
}
