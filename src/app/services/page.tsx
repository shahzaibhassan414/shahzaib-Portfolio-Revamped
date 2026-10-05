import type { Metadata } from "next";
import Link from "next/link";
import { CTAStrip } from "@/components/CTAStrip";
import { ArrowRight } from "@/components/icons";
import { FAQ } from "@/components/FAQ";
import { serviceIcons, ServiceSteps } from "@/components/ServiceParts";
import { ButtonLink, SectionTitle } from "@/components/ui";
import { primaryCta } from "@/content/site";
import { engagements, faq, faqOrder, services, specialistAreas } from "@/content/services";

// Copy: docs/copy-and-seo.md section 6. Layout: design/services.html.

export const metadata: Metadata = {
  title: "Flutter App Development Services | Shahzaib Hassan",
  description:
    "New Flutter apps, rescues of struggling ones, and ongoing maintenance for iOS and Android. See which fits your situation.",
};

const situations = [
  { href: "#build", label: "There's no app yet" },
  { href: "#rescue", label: "My app is struggling" },
  { href: "#maintain", label: "My app is live and needs a developer" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="wrap flex flex-col gap-7 pt-10 pb-12 md:pt-[72px] md:pb-16">
        <h1 className="max-w-[13em] text-[clamp(44px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          Flutter app development, rescue, and maintenance
        </h1>
        <p className="max-w-[34em] text-[19px] leading-normal text-body md:text-[22px]">
          Most projects start in one of three places: there&apos;s no app yet, there&apos;s an app that&apos;s
          struggling, or there&apos;s a live app that needs a dependable developer. Pick the one that sounds like you.
        </p>
        <nav aria-label="Pick your situation" className="mt-2 flex flex-wrap gap-2.5">
          {situations.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="flex min-h-11 items-center rounded-full border border-btn2-line bg-surface px-[18px] py-3 text-base font-semibold no-underline transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </section>

      <div className="wrap flex flex-col gap-7">
        {services.map((service) => {
          const Icon = serviceIcons[service.id];
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className="flex scroll-mt-4 flex-wrap gap-12 rounded-[28px] border border-line bg-surface p-6 md:rounded-[32px] md:p-12"
            >
              <div className="flex flex-[1_1_380px] flex-col gap-[18px]">
                <span
                  className="flex size-14 items-center justify-center rounded-2xl"
                  style={{ background: service.accent.bg, color: service.accent.color }}
                >
                  <Icon size={28} strokeWidth={1.8} />
                </span>
                <span className="text-[15px] font-semibold text-muted">{service.label}</span>
                <h2
                  id={`${service.id}-title`}
                  className="text-[clamp(32px,3.4vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em]"
                >
                  <Link href={service.href} className="group no-underline hover:text-accent">
                    {service.title}
                    <ArrowRight
                      size={28}
                      className="ml-2 inline-block align-[-0.1em] text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </Link>
                </h2>
                <p className="text-lg leading-[1.6] text-body">{service.problem}</p>
                <p className="text-base leading-[1.6] text-muted">{service.whoFor}</p>
                <ButtonLink href={`/contact?type=${service.id}`} size="sm" className="mt-2 self-start">
                  {service.cta.button}
                </ButtonLink>
              </div>

              <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
                <p className="text-[17px] leading-[1.65] text-body">{service.whatIDo}</p>
                <ServiceSteps service={service} />
                <p className="text-base leading-[1.6] text-body">
                  <strong className="text-text">What you get:</strong> {service.whatYouGet}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="areas-title" className="wrap flex flex-col gap-10 pt-[88px] md:pt-[136px]">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <SectionTitle id="areas-title">The parts that usually go wrong</SectionTitle>
          <p className="text-[19px] leading-[1.55] text-body">
            Whichever way a project starts, these are the areas I&apos;m most often brought in for.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
          {specialistAreas.map((area) => (
            <div
              key={area.id}
              id={area.id}
              className="flex scroll-mt-4 flex-col gap-3.5 rounded-3xl border border-line bg-surface p-6 md:p-8"
            >
              <h3 className="text-[22px] font-bold">{area.title}</h3>
              <p className="text-base leading-[1.6] text-body">{area.body}</p>
              <span className="mt-auto pt-2 text-sm text-muted">{area.tools}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="engage-title" className="wrap flex flex-col gap-10 pt-[88px] md:pt-[136px]">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <SectionTitle id="engage-title">Ways to work together</SectionTitle>
          <p className="text-[19px] leading-[1.55] text-body">
            Every project is quoted after a short scope call, so you pay for what your app actually needs.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {engagements.map((e) => (
            <div
              key={e.title}
              className={`flex flex-col gap-3 rounded-3xl border p-6 md:p-8 ${e.highlight ? "border-accent" : "border-line"}`}
            >
              <h3 className="text-2xl font-bold">{e.title}</h3>
              <p className="text-base leading-[1.6] text-body">{e.body}</p>
              <Link
                href={`/contact?type=${e.type}`}
                className={`mt-auto flex min-h-11 items-center self-start rounded-xl px-[18px] py-3 text-[15px] font-semibold no-underline transition-opacity hover:opacity-90 ${
                  e.highlight ? "bg-accent text-on-accent" : "border border-btn2-line bg-surface"
                }`}
              >
                Contact for pricing
                <span className="sr-only">: {e.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-title" className="wrap flex flex-wrap gap-x-16 gap-y-8 pt-[88px] md:pt-[136px]">
        <SectionTitle id="faq-title" className="flex-[0_1_340px]">
          Questions clients ask
        </SectionTitle>
        <div className="min-w-0 flex-[1_1_560px]">
          <FAQ items={faqOrder.map((k) => faq[k])} />
        </div>
      </section>

      <CTAStrip
        heading="Not sure which fits?"
        body="Describe the app and where it's stuck. I'll tell you which option makes sense, even if the answer is a small fix."
        button={primaryCta}
      />
    </>
  );
}
