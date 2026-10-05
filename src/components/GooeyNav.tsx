"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Desktop nav with a gooey hover pill. Two blobs sit behind the links, a quick leading one
// and a slower trailing one, inside a layer with an SVG "goo" filter: as they travel
// between links they stretch and fuse like liquid. At rest the pill marks the current
// page. The links sit above the filtered layer, so their text stays sharp.

type NavItem = { href: string; label: string };

export function GooeyNav({ items, isCurrent }: { items: readonly NavItem[]; isCurrent: (href: string) => boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLSpanElement>(null);
  const currentHref = items.find((i) => isCurrent(i.href))?.href;

  useEffect(() => {
    const row = rowRef.current;
    const lead = leadRef.current;
    const trail = trailRef.current;
    if (!row || !lead || !trail || !window.matchMedia("(width >= 64rem)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const linkFor = (href?: string) => (href ? row.querySelector<HTMLElement>(`a[href="${href}"]`) : null);

      const moveTo = (link: HTMLElement | null, instant = false) => {
        if (!link) {
          gsap.to([lead, trail], {
            scale: 0.4,
            autoAlpha: 0,
            duration: reduce || instant ? 0 : 0.35,
            overwrite: "auto",
          });
          return;
        }
        const box = { x: link.offsetLeft, width: link.offsetWidth, height: link.offsetHeight, y: link.offsetTop };
        const common = { ...box, scale: 1, autoAlpha: 1, overwrite: "auto" as const };
        if (reduce || instant) {
          gsap.set([lead, trail], common);
          return;
        }
        gsap.to(lead, { ...common, duration: 0.35, ease: "power3.out" });
        gsap.to(trail, { ...common, duration: 0.7, ease: "elastic.out(1, 0.7)" });
      };

      const rest = (instant = false) => moveTo(linkFor(currentHref), instant);
      rest(true);

      const onEnter = (e: Event) => {
        const link = (e.target as Element).closest<HTMLElement>("a");
        if (link && row.contains(link)) moveTo(link);
      };
      const onLeave = () => rest();
      const onFocusOut = (e: FocusEvent) => {
        if (!row.contains(e.relatedTarget as Node)) rest();
      };
      const onResize = () => rest(true);

      row.addEventListener("pointerover", onEnter);
      row.addEventListener("focusin", onEnter);
      row.addEventListener("pointerleave", onLeave);
      row.addEventListener("focusout", onFocusOut);
      window.addEventListener("resize", onResize);
      cleanup = () => {
        row.removeEventListener("pointerover", onEnter);
        row.removeEventListener("focusin", onEnter);
        row.removeEventListener("pointerleave", onLeave);
        row.removeEventListener("focusout", onFocusOut);
        window.removeEventListener("resize", onResize);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [currentHref]);

  const blob = "invisible absolute top-0 left-0 rounded-full bg-(--nav-blob)";

  return (
    <div ref={rowRef} className="relative flex items-center gap-2">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ filter: "url(#nav-goo)" }}>
        <span ref={trailRef} className={blob} />
        <span ref={leadRef} className={blob} />
      </div>
      {items.map((item) => {
        const current = isCurrent(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`relative rounded-full px-3.5 py-2.5 text-[15px] no-underline transition-colors hover:text-accent ${
              current ? "font-bold text-accent" : "font-medium"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <defs>
          <filter id="nav-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
