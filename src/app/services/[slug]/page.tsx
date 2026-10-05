import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTAStrip } from "@/components/CTAStrip";
import { FAQ } from "@/components/FAQ";
import { ArrowLeft } from "@/components/icons";
import { RelatedProjects } from "@/components/RelatedProjects";
import { serviceIcons, ServiceSteps } from "@/components/ServiceParts";
import { SplitSection } from "@/components/SplitSection";
import { ButtonLink } from "@/components/ui";
import { faq, getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

// Copy: docs/copy-and-seo.md section 6 ("the dedicated page uses all of it").
// H2 structure from section 12: The problem · Who it's for · What I do · How it runs ·
// What you get · Related case studies · Questions · CTA.

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${slug}` });
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = serviceIcons[service.id];
  const contactHref = `/contact?type=${service.id}`;

  return (
    <>
      <section className="wrap flex flex-col gap-7 pt-6 pb-12 md:pt-10 md:pb-16">
        <Link
          href="/services"
          className="-ml-1 flex min-h-11 items-center gap-2 self-start text-base font-semibold text-muted no-underline hover:text-accent"
        >
          <ArrowLeft size={18} />
          Services
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="flex size-14 items-center justify-center rounded-2xl"
            style={{ background: service.accent.bg, color: service.accent.color }}
          >
            <Icon size={28} strokeWidth={1.8} />
          </span>
          <span className="text-[17px] font-semibold text-muted">{service.title}</span>
        </div>
        <h1 className="max-w-[14em] text-[clamp(44px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          {service.h1}
        </h1>
        <ButtonLink href={contactHref} className="mt-2 self-start">
          {service.cta.button}
        </ButtonLink>
      </section>

      <div className="wrap">
        <hr className="border-line" />
      </div>

      <article className="wrap flex flex-col gap-16 pt-16 md:gap-[88px] md:pt-24">
        <SplitSection title="The problem">
          <p>{service.problem}</p>
        </SplitSection>
        <SplitSection title="Who it's for">
          <p>{service.whoFor}</p>
        </SplitSection>
        <SplitSection title="What I do">
          <p>{service.whatIDo}</p>
        </SplitSection>
        <SplitSection title="How it runs">
          {service.howItRuns && <p>{service.howItRuns}</p>}
          <ServiceSteps service={service} />
        </SplitSection>
        <SplitSection title="What you get">
          <p>{service.whatYouGet}</p>
        </SplitSection>
        {service.whyExperience && (
          <SplitSection title="Why experience matters here">
            <p>{service.whyExperience}</p>
          </SplitSection>
        )}
        <SplitSection title="Related case studies">
          <RelatedProjects slugs={service.related} />
        </SplitSection>
        <SplitSection title="Questions">
          <FAQ items={service.faq.map((k) => faq[k])} />
        </SplitSection>
      </article>

      <CTAStrip
        heading={service.cta.heading}
        button={{ href: contactHref, label: service.cta.button }}
        link={service.id === "maintain" ? { href: "/about", label: "how I work" } : undefined}
      />
    </>
  );
}
