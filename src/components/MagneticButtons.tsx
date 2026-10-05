"use client";

import { useEffect } from "react";

// Magnetic buttons: anything marked data-magnetic is pulled toward the pointer while it's
// hovered, then springs back when the pointer leaves. One delegated listener covers every
// page. Desktop pointers only, GSAP loads on the first mouse move, and reduced motion
// turns it off.

const STRENGTH = 0.35; // share of the pointer's offset from the centre
const MAX = 14; // px, so wide buttons don't travel too far

export function MagneticButtons() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      let active: HTMLElement | null = null;
      const movers = new WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void }>();

      const release = (el: HTMLElement) =>
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });

      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (el !== active) {
          if (active) release(active);
          active = el;
          // The spring-back tween overwrites (kills) the followers, so start fresh on every
          // entry: otherwise a button only works the first time it's hovered.
          if (el) {
            gsap.killTweensOf(el, "x,y");
            movers.delete(el);
          }
        }
        if (!el || (el as HTMLButtonElement).disabled) return;
        let mover = movers.get(el);
        if (!mover) {
          mover = {
            x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
          };
          movers.set(el, mover);
        }
        // Measure from the button's resting position, not where it has already moved to.
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - (gsap.getProperty(el, "x") as number);
        const cy = rect.top + rect.height / 2 - (gsap.getProperty(el, "y") as number);
        const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));
        mover.x(clamp((e.clientX - cx) * STRENGTH));
        mover.y(clamp((e.clientY - cy) * STRENGTH));
      };
      const onLeaveWindow = () => {
        if (active) release(active);
        active = null;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeaveWindow);
      cleanup = () => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      };
    };

    const start = () => {
      window.removeEventListener("pointermove", start);
      setup();
    };
    window.addEventListener("pointermove", start, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", start);
      cleanup?.();
    };
  }, []);

  return null;
}
