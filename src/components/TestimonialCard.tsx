import type { Testimonial } from "@/content/testimonials";

/** A client quote. "large" is the featured version used on the homepage and case studies. */
export function TestimonialCard({ testimonial: t, size = "md" }: { testimonial: Testimonial; size?: "md" | "large" }) {
  const large = size === "large";
  return (
    <figure
      data-tile
      className={`relative flex flex-col gap-5 rounded-3xl border border-line bg-surface ${
        large ? "p-7 md:p-12" : "p-6 md:p-8"
      }`}
    >
      <span
        aria-hidden="true"
        className={`font-extrabold leading-none text-accent ${large ? "text-[72px] md:text-[96px]" : "text-[56px]"} -mb-6`}
      >
        “
      </span>
      <blockquote className="flex flex-col gap-3">
        <p
          className={`font-extrabold tracking-[-0.02em] ${
            large ? "text-[clamp(24px,2.8vw,34px)] leading-[1.15]" : "text-[22px] leading-[1.2]"
          }`}
        >
          {t.headline}
        </p>
        <p className={`text-body ${large ? "text-lg leading-[1.65] md:text-[19px]" : "text-base leading-[1.6]"}`}>
          {t.quote}
        </p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex size-10 flex-none items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-accent"
        >
          {t.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] font-bold">{t.name}</span>
          <span className="text-sm text-muted">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
