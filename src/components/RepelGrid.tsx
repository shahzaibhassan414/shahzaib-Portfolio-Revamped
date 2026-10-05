"use client";

import { useEffect, useRef } from "react";

// Magnetic repel grid behind the hero: a field of dots that the pointer pushes away, each
// one springing back once the pointer moves on. Dots near the pointer brighten toward the
// accent colour. Drawn on a canvas (a few hundred DOM nodes would be too heavy), driven by
// GSAP's ticker only while something is moving. Phones and reduced motion get the still grid.

const GAP = 28; // px between dots
const RADIUS = 140; // reach of the pointer, px
const PUSH = 26; // how far a dot directly under the pointer moves, px
const SPRING = 0.14; // how quickly dots follow their target
const DAMPING = 0.78; // velocity kept per frame

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; glow: number };

export function RepelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = canvas.parentElement!;
    const interactive =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent").trim() || "#7b98ff";
    const base = styles.getPropertyValue("--line-strong").trim() || "#3a4352";

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const offX = (width % GAP) / 2;
      const offY = (height % GAP) / 2;
      for (let y = offY; y <= height; y += GAP)
        for (let x = offX; x <= width; x += GAP) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, glow: 0 });
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.globalAlpha = 0.55 + d.glow * 0.45;
        ctx.fillStyle = d.glow > 0.05 ? accent : base;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.3 + d.glow * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // One physics step; returns whether anything is still moving.
    const step = () => {
      let moving = false;
      for (const d of dots) {
        let tx = d.hx;
        let ty = d.hy;
        let glow = 0;
        if (pointer.active) {
          const dx = d.hx - pointer.x;
          const dy = d.hy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.01) {
            const force = (1 - dist / RADIUS) ** 2;
            tx += (dx / dist) * force * PUSH;
            ty += (dy / dist) * force * PUSH;
            glow = force;
          }
        }
        d.vx = (d.vx + (tx - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (ty - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;
        d.glow += (glow - d.glow) * 0.2;
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.02 || Math.abs(tx - d.x) + Math.abs(ty - d.y) > 0.05 || d.glow > 0.01)
          moving = true;
      }
      draw();
      return moving;
    };

    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(host);
    if (!interactive) return () => resize.disconnect();

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      let running = false;
      const tick = () => {
        if (!step() && !pointer.active) {
          gsap.ticker.remove(tick);
          running = false;
        }
      };
      const wake = () => {
        if (running) return;
        running = true;
        gsap.ticker.add(tick);
      };
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
        wake();
      };
      const onLeave = () => {
        pointer.active = false;
        wake();
      };
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        gsap.ticker.remove(tick);
      };
    });

    return () => {
      cancelled = true;
      resize.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_40%,#000_40%,transparent_100%)]"
    />
  );
}
