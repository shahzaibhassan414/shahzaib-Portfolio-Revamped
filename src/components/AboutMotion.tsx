"use client";

import { useLayoutEffect } from "react";

// About page motion (hooks are data-about attributes in app/about/page.tsx):
// - portrait: drifts down and shrinks a touch as the hero scrolls away; on desktop it tilts
//   toward the pointer in 3D with a moving glare
// - "What I care about": cards flip up out of the page one by one, scrubbed with the scroll
// - "Who I work best with": cards slide in from alternating sides, scrubbed
// - Experience: a line draws down the timeline; each role slides in and its dot pops as the
//   line reaches it
// - Toolkit: each group's chips pop in with a stagger
// Only things still below the fold are hidden, GSAP loads on the first interaction, and
// reduced motion leaves the page as it is.

const INTERACTIONS = ["scroll", "wheel", "touchstart", "keydown", "pointerdown", "pointermove"] as const;

export function AboutMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const animate = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const $ = (sel: string) => [...document.querySelectorAll<HTMLElement>(`[data-about="${sel}"]`)];
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;
      const removers: (() => void)[] = [];

      const ctx = gsap.context(() => {
        // Portrait: scroll drift, and pointer tilt with glare on desktop.
        const [portrait] = $("portrait");
        const [tilt] = $("tilt");
        const [glare] = $("glare");
        if (portrait && tilt) {
          gsap.to(tilt, {
            yPercent: 10,
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: portrait, start: "top top+=80", end: "bottom top", scrub: 0.6 },
          });
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3.out" });
            const onMove = (e: PointerEvent) => {
              const r = portrait.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * 14);
              rx(-py * 12);
              if (glare) {
                glare.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.55), transparent 55%)`;
                gsap.to(glare, { opacity: 1, duration: 0.3, overwrite: "auto" });
              }
            };
            const onLeave = () => {
              rx(0);
              ry(0);
              if (glare) gsap.to(glare, { opacity: 0, duration: 0.4, overwrite: "auto" });
            };
            portrait.addEventListener("pointermove", onMove);
            portrait.addEventListener("pointerleave", onLeave);
            removers.push(() => {
              portrait.removeEventListener("pointermove", onMove);
              portrait.removeEventListener("pointerleave", onLeave);
            });
          }
        }

        // Values: flip up out of the page, one after another, scrubbed.
        const values = $("value").filter(below);
        if (values.length)
          gsap.from(values, {
            rotationX: -55,
            yPercent: 30,
            opacity: 0,
            transformOrigin: "50% 100%",
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: { trigger: values[0], start: "top 95%", end: "top 45%", scrub: 0.6 },
          });

        // Audiences: slide in from alternating sides, scrubbed.
        const audiences = $("audience").filter(below);
        if (audiences.length)
          gsap.from(audiences, {
            x: (i: number) => (i % 2 ? 90 : -90),
            opacity: 0,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: audiences[0], start: "top 95%", end: "top 55%", scrub: 0.6 },
          });

        // Timeline: the line runs from the first dot's centre to the last. Its tip and every
        // dot's trigger use the same mark (60% down the window), so each dot pops exactly as
        // the tip reaches it, and both reverse together on the way back up.
        const [timeline] = $("timeline");
        const [line] = $("line");
        const roles = $("role");
        const dots = roles
          .map((r) => r.querySelector<HTMLElement>('[data-about="dot"]'))
          .filter(Boolean) as HTMLElement[];
        if (timeline && line && dots.length > 1) {
          const centre = (dot: HTMLElement) =>
            dot.getBoundingClientRect().top + dot.offsetHeight / 2 - timeline.getBoundingClientRect().top;
          const place = () => {
            const top = centre(dots[0]);
            line.style.top = `${top}px`;
            line.style.height = `${centre(dots[dots.length - 1]) - top}px`;
          };
          place();
          ScrollTrigger.addEventListener("refreshInit", place);
          removers.push(() => ScrollTrigger.removeEventListener("refreshInit", place));
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: dots[0],
                start: "center 60%",
                endTrigger: dots[dots.length - 1],
                end: "center 60%",
                scrub: 0.3,
              },
            },
          );
          roles.forEach((role, i) => {
            const dot = dots[i];
            const tl = gsap.timeline({ paused: true });
            tl.from(role.children[1] ?? role, { x: 40, opacity: 0, duration: 0.7, ease: "power3.out" });
            if (dot) tl.from(dot, { scale: 0, duration: 0.5, ease: "back.out(3)" }, 0);
            ScrollTrigger.create({
              trigger: dot ?? role,
              start: "center 60%",
              onEnter: () => tl.play(),
              onLeaveBack: () => tl.reverse(),
            });
            // Already past the mark when this runs (e.g. after a reload further down): show it done.
            const r = (dot ?? role).getBoundingClientRect();
            if (r.top + r.height / 2 < window.innerHeight * 0.6) tl.progress(1);
          });
        }

        // Toolkit: chips pop in per group.
        $("chips")
          .filter(below)
          .forEach((group) => {
            gsap.from(group.children, {
              scale: 0.6,
              y: 14,
              opacity: 0,
              duration: 0.5,
              ease: "back.out(2.2)",
              stagger: 0.035,
              scrollTrigger: { trigger: group, start: "top 90%", toggleActions: "play none none reverse" },
            });
          });
      });

      cleanup = () => {
        removers.forEach((r) => r());
        ctx.revert();
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

  return null;
}
