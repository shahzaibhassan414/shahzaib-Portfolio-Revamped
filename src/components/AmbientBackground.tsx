"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Three soft glows behind every page. They render with plain CSS (so nothing waits on
// JavaScript); GSAP then makes them drift on slow loops, shift a little with the scroll,
// and lean toward the pointer on desktop. Only transforms animate, and the glows are
// radial gradients rather than blurred shapes, so it stays cheap on phones. GSAP loads
// on the first interaction, and reduced motion keeps everything still.

const orbs = [
  // position and size, then its drift: x/y as % of its own size, scale, seconds per leg
  {
    style: { left: "-18%", top: "-22%", width: "70vmax", height: "70vmax" },
    glow: "--glow-a",
    drift: [14, 10, 1.12, 19],
    parallax: -10,
  },
  {
    style: { left: "52%", top: "8%", width: "62vmax", height: "62vmax" },
    glow: "--glow-b",
    drift: [-12, 14, 0.9, 23],
    parallax: -18,
  },
  {
    style: { left: "4%", top: "58%", width: "58vmax", height: "58vmax" },
    glow: "--glow-c",
    drift: [10, -12, 1.1, 21],
    parallax: -26,
  },
] as const;

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown", "pointermove"] as const;

export function AmbientBackground() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const refreshRef = useRef<(() => void) | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const layer = pointerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        layer.querySelectorAll<HTMLElement>("[data-orb]").forEach((orb, i) => {
          const [x, y, scale, seconds] = orbs[i].drift;
          // Slow, endless drift.
          gsap.to(orb.firstElementChild, {
            xPercent: x,
            yPercent: y,
            scale,
            duration: seconds,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          // A gentle shift across the whole page's scroll, deeper glows moving further.
          gsap.to(orb, {
            yPercent: orbs[i].parallax,
            ease: "none",
            scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 1.2 },
          });
        });
      });

      // Desktop: lean toward the pointer.
      let onMove: ((e: PointerEvent) => void) | undefined;
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const toX = gsap.quickTo(layer, "x", { duration: 1.4, ease: "power3.out" });
        const toY = gsap.quickTo(layer, "y", { duration: 1.4, ease: "power3.out" });
        onMove = (e) => {
          toX((e.clientX / window.innerWidth - 0.5) * 40);
          toY((e.clientY / window.innerHeight - 0.5) * 30);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
      }

      refreshRef.current = () => ScrollTrigger.refresh();
      cleanup = () => {
        if (onMove) window.removeEventListener("pointermove", onMove);
        refreshRef.current = undefined;
        ctx.revert();
        gsap.set(layer, { clearProps: "transform" });
      };
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

  // A new page has a different height: re-measure the scroll range.
  useEffect(() => {
    refreshRef.current?.();
  }, [pathname]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={pointerRef} className="absolute -inset-[6%]">
        {orbs.map((orb) => (
          <div key={orb.glow} data-orb className="absolute will-change-transform" style={orb.style}>
            <div
              className="size-full rounded-full will-change-transform"
              style={{ background: `radial-gradient(closest-side, var(${orb.glow}), transparent)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
