"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling on desktop pointers only. Touch devices and reduced-motion users
 * keep native scrolling. Lenis is loaded on demand so it never ships to phones.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePointer) return;

    let lenis: InstanceType<typeof import("lenis").default> | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        autoRaf: true,
        // Anchor links (#work, #top, service sections) scroll smoothly. Lenis reads the
        // sticky-header clearance from scroll-padding-top and scroll-margin-top in CSS.
        anchors: true,
        // Let the project rail, tables, and code blocks scroll on their own.
        allowNestedScroll: true,
        prevent: (node) => node.closest("dialog") !== null,
      });
      setLenis(lenis);
    });

    return () => {
      cancelled = true;
      setLenis(undefined);
      lenis?.destroy();
    };
  }, []);

  return null;
}
