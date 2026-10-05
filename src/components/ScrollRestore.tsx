"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToY } from "@/lib/scroll";

// Return to the same place after a reload or back/forward. GSAP's ScrollTrigger switches the
// browser's own scroll restoration off, and the pinned sections add their scroll space only
// after load, so a remembered pixel position would land in the wrong place anyway. Instead
// this remembers which top-level section was at the top of the screen and how far into it,
// then restores to that, re-applying while the layout settles. It stops the moment the
// visitor scrolls or types, and leaves #anchor links alone.

const SETTLE_MS = 2500;
const USER_INPUT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

type Saved = { index: number; offset: number; y: number };

const keyFor = (path: string) => `scroll:${path}`;

function sections() {
  const main = document.getElementById("main");
  return main ? [...main.children] : [];
}

function capture(): Saved {
  const y = window.scrollY;
  const list = sections();
  // The last section whose top is at or above the viewport top.
  let index = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].getBoundingClientRect().top <= 1) index = i;
    else break;
  }
  const top = list[index] ? list[index].getBoundingClientRect().top + y : 0;
  return { index, offset: y - top, y };
}

function targetFor(saved: Saved) {
  const el = sections()[saved.index];
  if (!el) return saved.y;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY + saved.offset);
}

let poppedState = false;

export function ScrollRestore() {
  const pathname = usePathname();

  // Remember the position for this page.
  useEffect(() => {
    let frame = 0;
    const save = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        try {
          sessionStorage.setItem(keyFor(pathname), JSON.stringify(capture()));
        } catch {
          // Storage unavailable (private mode): nothing to restore later.
        }
      });
    };
    const onHide = () => {
      try {
        sessionStorage.setItem(keyFor(pathname), JSON.stringify(capture()));
      } catch {}
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", onHide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", onHide);
    };
  }, [pathname]);

  // Note back/forward navigations inside the app.
  useEffect(() => {
    const onPop = () => (poppedState = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Restore after a reload, a browser back/forward, or an in-app back/forward.
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const firstLoad = !(window as { __scrollRestored?: boolean }).__scrollRestored;
    (window as { __scrollRestored?: boolean }).__scrollRestored = true;
    const restoring = poppedState || (firstLoad && (nav?.type === "reload" || nav?.type === "back_forward"));
    poppedState = false;
    if (!restoring || window.location.hash) return;

    let saved: Saved | null = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(keyFor(pathname)) ?? "null");
    } catch {}
    if (!saved) return;
    const target = saved;

    history.scrollRestoration = "manual";
    let active = true;
    const apply = () => {
      if (active) scrollToY(targetFor(target), { immediate: true });
    };
    const stop = () => {
      active = false;
      ro.disconnect();
      USER_INPUT.forEach((e) => window.removeEventListener(e, stop));
    };
    // Re-apply whenever the page height changes while it settles (pins, images, fonts).
    const ro = new ResizeObserver(apply);
    ro.observe(document.body);
    USER_INPUT.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    apply();
    requestAnimationFrame(apply);
    const timer = setTimeout(stop, SETTLE_MS);
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [pathname]);

  return null;
}
