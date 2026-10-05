"use client";

import { useEffect, useRef } from "react";

// Cursor follower: a thin accent ring that trails the pointer. It grows and fills softly
// over anything clickable, and tightens while pressed. The system cursor stays visible, so
// pointing works exactly as usual. Desktop pointers only; off with reduced motion.

const SIZE = 34;
const CLICKABLE = "a, button, summary, select, label, [role='button'], [data-magnetic]";

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ring || !fine || reduce) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = async (first: PointerEvent) => {
      window.removeEventListener("pointermove", start);
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const toX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
      const toY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });
      gsap.set(ring, { x: first.clientX - SIZE / 2, y: first.clientY - SIZE / 2 });
      let hovering = false;
      let pressed = false;

      const update = () =>
        gsap.to(ring, {
          scale: pressed ? 0.75 : hovering ? 1.65 : 1,
          backgroundColor: hovering ? "rgba(123, 152, 255, 0.16)" : "rgba(123, 152, 255, 0)",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      const onMove = (e: PointerEvent) => {
        toX(e.clientX - SIZE / 2);
        toY(e.clientY - SIZE / 2);
        const over = !!(e.target as Element | null)?.closest?.(CLICKABLE);
        if (over !== hovering) {
          hovering = over;
          update();
        }
      };
      const onDown = () => {
        pressed = true;
        update();
      };
      const onUp = () => {
        pressed = false;
        update();
      };
      const show = () => gsap.to(ring, { autoAlpha: 1, duration: 0.25 });
      const hide = () => gsap.to(ring, { autoAlpha: 0, duration: 0.25 });

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerenter", show);
      document.documentElement.addEventListener("pointerleave", hide);
      show();
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        document.documentElement.removeEventListener("pointerenter", show);
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
      className="pointer-events-none invisible fixed top-0 left-0 z-[70] rounded-full border-[1.5px] border-accent opacity-0"
      style={{ width: SIZE, height: SIZE }}
    />
  );
}
