"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type ProcessStep = { title: string; body: string };

// Scroll-selected steps. On larger screens the section pins and scrolling walks through the
// steps one by one: the active box lights up and the others dim. On phones (stacked boxes)
// each one is selected as it crosses the middle of the screen. Without JavaScript, or with
// reduced motion, every step shows at full strength.

const PIN_QUERY = "(min-width: 768px)";
const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"] as const;

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // A layout effect, so the cleanup (which unwraps GSAP's pin) runs before React removes
  // the page on navigation. With a plain effect React found the section still inside
  // GSAP's pin-spacer and failed with "removeChild ... not a child of this node".
  useLayoutEffect(() => {
    const list = listRef.current;
    const section = list?.closest("section");
    if (!list || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    // The section is below the fold: GSAP (and the dimming) waits for the first interaction.
    const load = () =>
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        const count = steps.length;

        // Desktop: pin the section and step through the boxes with the scroll.
        mm.add(PIN_QUERY, () => {
          setActive(0);
          ScrollTrigger.create({
            trigger: section,
            start: "center center",
            end: () => `+=${count * window.innerHeight * 0.45}`,
            pin: true,
            // The parent is a flex column, where GSAP would otherwise skip the spacing.
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(Math.min(count - 1, Math.floor(self.progress * count)));
            },
          });
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          return () => setActive(null);
        });

        // Phones: select each box as it crosses the middle of the screen.
        mm.add(`not all and ${PIN_QUERY}`, () => {
          setActive(0);
          list.querySelectorAll("li").forEach((item, i) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => {
                if (self.isActive) setActive(i);
              },
            });
          });
          return () => setActive(null);
        });

        revert = () => mm.revert();
      });

    const stopWaiting = () => INTERACTIONS.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stopWaiting();
      load();
    }
    INTERACTIONS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    return () => {
      cancelled = true;
      stopWaiting();
      revert?.();
    };
  }, [steps.length]);

  const on = active !== null;

  return (
    <div className="flex flex-col gap-6">
      <ol ref={listRef} className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 md:gap-5">
        {steps.map((step, i) => {
          const selected = on && i === active;
          const dimmed = on && i !== active;
          return (
            <li
              key={step.title}
              aria-current={selected ? "step" : undefined}
              className={`relative flex flex-col gap-3 rounded-2xl border bg-surface p-5 transition-[opacity,transform,border-color,box-shadow] duration-500 ease-spring md:p-6 ${
                selected
                  ? "-translate-y-1.5 border-accent shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
                  : "border-line"
              } ${dimmed ? "opacity-45" : "opacity-100"}`}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-full text-[15px] font-bold transition-colors duration-500 ${
                  selected ? "bg-accent text-on-accent" : "bg-surface-2 text-accent"
                }`}
              >
                {i + 1}
              </span>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-base leading-[1.55] text-body">{step.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
