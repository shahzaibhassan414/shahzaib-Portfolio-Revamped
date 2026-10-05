import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { site } from "@/content/site";

type CTABandProps = {
  heading: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  showEmail?: boolean;
  showPortrait?: boolean;
  id?: string;
};

/** Inverted call-to-action band that closes most pages. */
export function CTABand({
  heading,
  body,
  primary,
  secondary,
  showEmail = true,
  showPortrait = true,
  id,
}: CTABandProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="wrap pt-[88px] md:pt-[152px]">
      <div className="flex flex-wrap items-stretch gap-8 rounded-[28px] bg-cta-bg p-5 text-cta-text md:gap-12 md:rounded-[36px] md:p-12">
        {showPortrait && (
          <Image
            src="/images/portrait.webp"
            alt={site.name}
            width={864}
            height={1080}
            sizes="(min-width: 768px) 300px, calc(100vw - 80px)"
            className="aspect-[4/5] w-full max-w-[300px] flex-[0_1_300px] rounded-3xl object-cover object-top"
          />
        )}
        <div className="flex flex-[1_1_420px] flex-col justify-between gap-10 md:pt-4 md:pr-4 md:pb-2">
          <div className="flex flex-col gap-5">
            <h2
              id={id ? `${id}-title` : undefined}
              className="text-[clamp(40px,5vw,60px)] leading-none font-extrabold tracking-[-0.035em]"
            >
              {heading}
            </h2>
            <p className="max-w-[30em] text-[19px] leading-[1.55] text-cta-muted">{body}</p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="cta">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="cta-secondary">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
            {showEmail && (
              <a href={`mailto:${site.email}`} className="text-[17px] break-all underline underline-offset-2">
                {site.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
