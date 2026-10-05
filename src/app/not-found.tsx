import type { Metadata } from "next";
import Link from "next/link";
import { primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap flex flex-1 flex-col justify-center gap-8 py-[88px] md:py-[136px]">
      <p className="font-mono text-sm tracking-wide text-muted">404</p>
      <h1 className="max-w-[14ch] text-[clamp(44px,6vw,84px)] leading-none font-extrabold tracking-[-0.04em]">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-[34em] text-[19px] leading-[1.55] text-body">
        The link may be old, or the page may have moved. The work and the contact page are still here.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/work"
          className="rounded-[14px] bg-accent px-6 py-4 text-[17px] font-semibold text-on-accent no-underline transition-opacity hover:opacity-90"
        >
          See the work
        </Link>
        <Link
          href={primaryCta.href}
          className="rounded-[14px] border border-btn2-line bg-surface px-[23px] py-[15px] text-[17px] font-semibold no-underline transition-colors hover:text-accent"
        >
          {primaryCta.label}
        </Link>
      </div>
    </section>
  );
}
