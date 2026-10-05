"use client";

import { useState, type ReactNode } from "react";

type Filter = { id: string; label: string; count: number };

/**
 * Category chips for the Work page. Projects are server-rendered with a `data-cat`
 * attribute; this only sets `data-filter` on the wrapper and CSS hides the rest.
 */
export function WorkFilter({
  filters,
  total,
  intro,
  children,
}: {
  filters: Filter[];
  total: number;
  intro: ReactNode;
  children: ReactNode;
}) {
  const [active, setActive] = useState("all");
  const all = [{ id: "all", label: "All", count: total }, ...filters];

  return (
    <div data-filter={active}>
      <section className="wrap-wide flex flex-wrap items-end justify-between gap-8 pt-10 pb-10 md:pt-[72px] md:pb-14">
        {intro}
        <div role="group" aria-label="Filter projects" className="flex max-w-[460px] flex-wrap gap-2 md:justify-end">
          {all.map((f) => {
            const pressed = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setActive(f.id)}
                className={`min-h-11 rounded-full border px-4 py-2.5 text-[15px] transition-colors ${
                  pressed ? "border-text bg-text font-semibold text-bg" : "border-btn2-line hover:border-text"
                }`}
              >
                {f.label} <span className={pressed ? "opacity-60" : "text-muted"}>{f.count}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {active === "all" ? "" : `Showing ${all.find((f) => f.id === active)?.count ?? 0} projects`}
        </p>
      </section>
      {children}
    </div>
  );
}
