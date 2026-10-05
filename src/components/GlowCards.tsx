"use client";

import { useEffect } from "react";

/**
 * Pointer position for cards marked data-glow: sets --mx and --my on the hovered card so
 * its border and surface glow follow the cursor (styles in globals.css). One delegated
 * listener, desktop pointers only.
 */
export function GlowCards() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-glow]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
