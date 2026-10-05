"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
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

/** Topic filter plus the card grid and "Coming next" list on /blog. */
export function BlogIndex({ cards, upcoming, intro }: Props) {
  const [topic, setTopic] = useState("All");
  const topics = ["All", ...new Set([...cards, ...upcoming].map((i) => i.topic))];
  const show = (t: string) => topic === "All" || topic === t;
  const visibleCards = cards.filter((c) => show(c.topic));
  const visibleUpcoming = upcoming.filter((u) => show(u.topic));

  return (
    <>
      <section className="wrap flex flex-col gap-6 pt-10 pb-12 md:pt-[72px] md:pb-14">
        {intro}
        <div role="group" aria-label="Filter by topic" className="mt-2 flex flex-wrap gap-2">
          {topics.map((t) => {
            const pressed = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={pressed}
                onClick={() => setTopic(t)}
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
              className={`group flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface no-underline transition-colors hover:border-line-strong md:rounded-[32px] ${
                i % 2 === 0 ? "flex-[3_1_560px]" : "flex-[2_1_380px]"
              }`}
            >
              {card.visual && (
                <span aria-hidden="true" className="block h-[220px] md:h-[340px]">
                  {card.visual}
                </span>
              )}
              <span className="flex flex-col gap-3.5 p-6 md:p-8">
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
                className="grid grid-cols-1 gap-1 border-b border-line px-2 py-5 md:grid-cols-[200px_1fr] md:items-center md:gap-6 md:px-4 md:py-[22px]"
              >
                <span className="text-sm text-muted">{u.topic}</span>
                <span className="text-lg font-bold md:text-xl">{u.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function CardLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
