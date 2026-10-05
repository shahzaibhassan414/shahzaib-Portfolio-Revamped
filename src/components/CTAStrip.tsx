import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";

type CTAStripProps = {
  heading: string;
  body?: string;
  button: { href: string; label: string };
  link?: { href: string; label: string };
  avatar?: boolean;
  wide?: boolean;
};

/** Compact inverted CTA used at the end of case studies and the Work page. */
export function CTAStrip({ heading, body, button, link, avatar, wide }: CTAStripProps) {
  return (
    <section className={`${wide ? "wrap-wide" : "wrap"} pt-[88px] md:pt-[136px]`}>
      <div className="flex flex-wrap items-center justify-between gap-7 rounded-[28px] bg-cta-bg p-6 text-cta-text md:rounded-[32px] md:px-14 md:py-12">
        <div className="flex items-center gap-6">
          {avatar && (
            <Image
              src="/images/avatar.webp"
              alt=""
              width={80}
              height={80}
              className="hidden size-20 flex-none rounded-full object-cover sm:block"
            />
          )}
          <div className="flex max-w-[640px] flex-col gap-2.5">
            <h2 className="text-[clamp(30px,3.6vw,44px)] leading-[1.05] font-extrabold tracking-[-0.03em]">
              {heading}
            </h2>
            {body && <p className="text-lg leading-normal text-cta-muted">{body}</p>}
            {link && (
              <Link
                href={link.href}
                className="self-start text-base font-semibold underline underline-offset-2 hover:no-underline"
              >
                {link.label}
              </Link>
            )}
          </div>
        </div>
        <ButtonLink href={button.href} variant="cta">
          {button.label}
        </ButtonLink>
      </div>
    </section>
  );
}
