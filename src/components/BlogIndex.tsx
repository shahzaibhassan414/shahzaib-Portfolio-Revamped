"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

export type BlogCard = {
  href: string;
  title: string;
  summary: string;
  topic: string;
  /** "Playbook" for the Notion write-ups, "Article" for posts on this site. */
  label: string;
  action: string;
  visual?: ReactNode;
  external?: boolean;
};

type Props = {
  cards: BlogCard[];
  upcoming: { topic: string; title: string }[];
  intro: ReactNode;
};

type Gsap = typeof import("gsap").gsap;
type FlipPlugin = typeof import("gsap/Flip").Flip;
type FlipState = ReturnType<FlipPlugin["getState"]>;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Topic filter plus the card grid and "Coming next" list on /blog. Changing the topic
 * animates with GSAP Flip (cards glide to their new places, new ones scale in); the hero
 * word drifts and fades on scroll. Cards and rows rise in on scroll (data-tile, TileMotion).
 */
export function BlogIndex({ cards, upcoming, intro }: Props) {
  const [topic, setTopic] = useState("All");
  const gsapRef = useRef<{ gsap: Gsap; Flip: FlipPlugin } | null>(null);
  const flipState = useRef<FlipState | null>(null);

  // Load GSAP + Flip when the filter is first approached, so the first click can animate.
  const preload = () => {
    if (gsapRef.current || reducedMotion()) return;
    Promise.all([import("gsap"), import("gsap/Flip")]).then(([{ gsap }, { Flip }]) => {
      gsap.registerPlugin(Flip);
      gsapRef.current = { gsap, Flip };
    });
  };

  const choose = (t: string) => {
    if (t === topic) return;
    const g = gsapRef.current;
    // Using the filter makes the scroll entrance moot: show anything it was still hiding (it
    // would otherwise stay hidden after moving to a new place), then record where everything
    // is; the layout effect animates from here after React updates.
    if (g) {
      g.gsap.set("[data-flip]", { clearProps: "opacity,visibility,transform" });
      flipState.current = g.Flip.getState("[data-flip]");
    } else {
      document.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("visibility");
        el.style.removeProperty("transform");
      });
    }
    setTopic(t);
  };

  useLayoutEffect(() => {
    const g = gsapRef.current;
    const state = flipState.current;
    flipState.current = null;
    if (!g || !state) return;
    g.Flip.from(state, {
      duration: 0.6,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      targets: "[data-flip]",
      onEnter: (els) =>
        g.gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }),
    });
  }, [topic]);

  // The hero word drifts down and fades as the page scrolls (after the first interaction).
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const run = async () => {
      const hero = document.querySelector<HTMLElement>("[data-blog-hero]");
      if (!hero) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.to(hero, {
          yPercent: 35,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: hero, start: 0, end: "bottom top", scrub: 0.5 },
        });
      });
      revert = () => ctx.revert();
    };
    const events = ["scroll", "wheel", "touchstart", "keydown"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      run();
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, start));
      revert?.();
    };
  }, []);
  const topics = ["All", ...new Set([...cards, ...upcoming].map((i) => i.topic))];
  const show = (t: string) => topic === "All" || topic === t;
  const visibleCards = cards.filter((c) => show(c.topic));
  const visibleUpcoming = upcoming.filter((u) => show(u.topic));

  return (
    <>
      <section className="wrap flex flex-col gap-6 pt-10 pb-12 md:pt-[72px] md:pb-14">
        {intro}
        <div
          role="group"
          aria-label="Filter by topic"
          className="mt-2 flex flex-wrap gap-2"
          onPointerEnter={preload}
          onFocus={preload}
          onTouchStart={preload}
        >
          {topics.map((t) => {
            const pressed = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={pressed}
                onClick={() => choose(t)}
                className={`min-h-11 rounded-full border px-4 py-2.5 text-[15px] transition-colors ${
                  pressed ? "border-text bg-text font-semibold text-bg" : "border-btn2-line hover:border-text"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {topic === "All" ? "" : `Showing ${visibleCards.length + visibleUpcoming.length} items about ${topic}`}
        </p>
      </section>

      {visibleCards.length > 0 && (
        <section aria-label="Latest" className="wrap flex flex-wrap gap-7">
          {visibleCards.map((card, i) => (
            <CardLink
              key={card.href}
              href={card.href}
              className={`tile glow-card group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface no-underline md:rounded-[32px] ${
                i % 2 === 0 ? "flex-[3_1_560px]" : "flex-[2_1_380px]"
              }`}
            >
              {card.visual && (
                <span aria-hidden="true" className="relative z-[2] block h-[220px] overflow-hidden md:h-[340px]">
                  <span className="block h-full transition-transform duration-700 ease-spring group-hover:scale-[1.05] motion-reduce:transition-none">
                    {card.visual}
                  </span>
                </span>
              )}
              <span className="relative z-[2] flex flex-col gap-3.5 p-6 md:p-8">
                <span className="flex flex-wrap items-center gap-2.5 text-sm text-muted">
                  <span className="rounded-full bg-surface-2 px-2.5 py-[5px] font-semibold">{card.topic}</span>
                  <span>{card.label}</span>
                </span>
                <span
                  className={`leading-[1.1] font-extrabold tracking-[-0.025em] ${
                    i % 2 === 0 ? "text-[clamp(26px,2.8vw,34px)]" : "text-[clamp(24px,2.4vw,30px)]"
                  }`}
                >
                  {card.title}
                </span>
                <span className="text-[17px] leading-[1.6] text-body">{card.summary}</span>
                <span className="mt-1 flex items-center gap-2 text-base font-bold text-accent">
                  {card.action}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </CardLink>
          ))}
        </section>
      )}

      {visibleUpcoming.length > 0 && (
        <section aria-labelledby="next-title" className="wrap flex flex-col gap-7 pt-[88px] md:pt-[120px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="next-title"
              className="text-[clamp(32px,3.4vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em]"
            >
              Coming next
            </h2>
            <p className="text-base text-muted">Topics I&apos;m writing up from real projects.</p>
          </div>
          <ul className="flex flex-col border-t border-line">
            {visibleUpcoming.map((u) => (
              <li
                key={u.title}
                data-flip
                data-tile
                className="group grid grid-cols-1 gap-1 rounded-xl border-b border-line px-2 py-5 transition-colors duration-300 hover:bg-surface md:grid-cols-[200px_1fr_auto] md:items-center md:gap-6 md:px-4 md:py-[22px]"
              >
                <span className="text-sm text-muted">{u.topic}</span>
                <span className="text-lg font-bold transition-colors duration-300 group-hover:text-accent md:text-xl">
                  {u.title}
                </span>
                {/* "In the works": a softly pulsing dot (decorative). */}
                <span aria-hidden="true" className="relative hidden size-2.5 md:block">
                  <span className="absolute inset-0 rounded-full bg-accent motion-safe:animate-ping motion-safe:opacity-60" />
                  <span className="absolute inset-0 rounded-full bg-accent" />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function CardLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  // data-flip: filter animation; data-tile: scroll entrance; data-glow: pointer glow.
  const hooks = { "data-flip": "", "data-tile": "", "data-glow": "" };
  return href.startsWith("/") ? (
    <Link href={href} className={className} {...hooks}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...hooks}>
      {children}
    </a>
  );
}
