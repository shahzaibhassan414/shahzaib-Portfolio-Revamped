import Image from "next/image";
import type { ReactNode } from "react";
import { AboutMotion } from "@/components/AboutMotion";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Toolkit } from "@/components/Toolkit";
import { CTAStrip } from "@/components/CTAStrip";
import { JsonLd } from "@/components/JsonLd";
import { Download } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
import { experience } from "@/content/experience";
import { testimonials } from "@/content/testimonials";
import { primaryCta, site } from "@/content/site";
import { pageMetadata, personSchema } from "@/lib/seo";

// Copy: docs/copy-and-seo.md section 5. Layout: design/about.html.

export const metadata = pageMetadata({
  title: "About Shahzaib Hassan, Senior Flutter Developer",
  description:
    "Four years building production Flutter apps at Code Encoders and Rex Technologies, and how I approach new and existing codebases.",
  path: "/about",
});

const facts = [
  { label: "Based in", value: "Pakistan (UTC+5)" },
  { label: "Currently", value: "Senior Flutter Developer at Code Encoders" },
  { label: "Shipping Flutter since", value: "2022" },
  { label: "Open to", value: "Freelance projects and remote roles", live: true },
];

const values = [
  {
    title: "Stable beats clever.",
    body: "An app that loads fast and never crashes earns more trust than a feature that impresses in a demo.",
  },
  {
    title: "Architecture before screens.",
    body: "Good structure is what keeps a growing app from slowing every release down.",
  },
  {
    title: "No surprises.",
    body: "Clients always know what shipped, what's next, and what's at risk, in plain language.",
  },
];

// The copy doc's "Who I work best with" paragraph, split into the design's four cards.
const audiences = [
  {
    title: "Founders",
    body: "Who have a clear problem and want a developer who'll push back when something won't work.",
  },
  { title: "Product teams", body: "With a live app that needs a dependable Flutter owner." },
  { title: "Agencies", body: "That need a senior developer they can put in front of a client." },
  {
    title: "Companies hiring",
    body: "For a Flutter role where shipping and stability matter more than buzzwords.",
  },
];

const toolkit = [
  { group: "Core", items: ["Flutter", "Dart", "Riverpod", "Provider", "GetX", "Clean architecture"] },
  {
    group: "Data and real-time",
    items: ["Firebase", "REST APIs", "Socket.IO", "WebSockets", "TanStack Query", "Dio"],
  },
  {
    group: "Integrations",
    items: ["RevenueCat", "Stripe", "Google Maps", "Web3Auth", "DIDIT KYC", "Push notifications"],
  },
  { group: "Shipping", items: ["App Store", "Google Play", "App Store Optimization", "Figma handoff"] },
];

const gap = "pt-[88px] md:pt-[136px]";

function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`wrap flex flex-wrap gap-x-16 gap-y-6 ${gap}`}>
      {/* Stays beside the paragraphs while they scroll (desktop). */}
      <h2 className="flex-[0_1_340px] text-[clamp(32px,3.4vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em] md:sticky md:top-[calc(var(--header-h)+32px)] md:self-start">
        {title}
      </h2>
      <div className="flex max-w-[720px] min-w-0 flex-[1_1_560px] flex-col gap-5 text-lg leading-[1.7] text-body md:text-[19px]">
        {children}
      </div>
    </section>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-[clamp(32px,3.4vw,40px)] leading-[1.05] font-extrabold tracking-[-0.03em]">{children}</h2>;
}

export default function AboutPage() {
  const roles = [...experience].reverse();
  const current = experience.find((r) => r.current);

  return (
    <>
      <JsonLd
        data={{
          ...personSchema,
          description: site.description,
          ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
          homeLocation: { "@type": "Country", name: "Pakistan" },
          knowsAbout: toolkit.flatMap((t) => t.items),
        }}
      />
      <section className="wrap flex flex-wrap items-center gap-16 pt-8 md:pt-16">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
          <h1 className="text-[clamp(48px,6.6vw,92px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
            The developer
            <br /> behind the apps
          </h1>
          <p className="max-w-[32em] text-[19px] leading-[1.55] text-body md:text-[21px]">
            I&apos;m Shahzaib Hassan, a senior Flutter developer based in Pakistan. For four years I&apos;ve been
            building iOS and Android apps that people pay for, chat in, and rely on, and fixing the ones that stopped
            working.
          </p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] border-t border-line">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-1 border-b border-line py-[18px] pr-5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="flex items-start gap-2 text-[17px] font-semibold">
                  {f.live && <span aria-hidden="true" className="mt-[9px] size-2 flex-none rounded-full bg-live" />}
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.resumeUrl} size="sm" className="gap-2.5">
              <Download size={18} />
              Download resume
            </ButtonLink>
            <ButtonLink href={site.social.linkedin} variant="secondary" size="sm">
              LinkedIn
            </ButtonLink>
            <ButtonLink href={site.social.github} variant="secondary" size="sm">
              GitHub
            </ButtonLink>
          </div>
        </div>
        <figure data-about="portrait" className="w-full max-w-[440px] flex-[0_1_440px] [perspective:1100px]">
          <div data-about="tilt" className="relative rounded-[32px]">
            <Image
              src="/images/portrait.webp"
              alt="Portrait of Shahzaib Hassan"
              width={864}
              height={1080}
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 60vw, calc(100vw - 40px)"
              className="aspect-[4/5] w-full rounded-[32px] object-cover object-top shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]"
            />
            <span
              data-about="glare"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 mix-blend-soft-light"
            />
          </div>
        </figure>
      </section>

      <Prose title="How I got here">
        <p>
          I studied Computer Science, and I shipped my first real Flutter app during my internship at Rex Technologies
          in 2022. Flutter won me over because a single codebase gave me Android and iOS at once, which meant I could
          build faster and own the whole app. Four years on, I specialise in real-time chat and messaging apps for
          startups and businesses.
        </p>
        <p>
          I started building Flutter apps professionally at Rex Technologies in 2022. That&apos;s where I learned what
          production really means: chasing crashes reported by users, fixing screens that stuttered on cheaper Android
          phones, and turning designs into UI that matched them pixel for pixel. One of the apps I worked on there
          passed 10,000 downloads.
        </p>
        <p>
          In 2024 I joined Code Encoders as a senior Flutter developer. Most of what I know about the hard parts of
          mobile comes from there: subscriptions that have to agree across Apple and Google, maps full of live data,
          wallets created from a Google login, and identity checks that can&apos;t feel like paperwork.
        </p>
      </Prose>

      <Prose title="The products I work on">
        <p>
          Most of my work falls into four groups: social and dating apps with real-time chat and presence, marketplaces
          with several kinds of users in one app, fintech and Web3 products with payments and verification, and apps
          built around location. They look different, but they share one trait: they only work if the data underneath is
          live, correct, and fast.
        </p>
      </Prose>

      <Prose title="How I approach engineering">
        <p>
          I plan state, data flow, and integrations before I build screens. It feels slower in week one and saves months
          later, because the tenth feature should be as easy to add as the first. I choose boring, well-supported tools
          over clever ones, and I&apos;d rather ship a smaller app that never crashes than a bigger one that does.
        </p>
      </Prose>

      <Prose title="How I approach an existing codebase">
        <p>
          When I take over an app, I don&apos;t start by rewriting it. I read it, run it, and find out where it actually
          hurts: crash reports, slow screens, flaky builds, state that&apos;s shared in ways nobody intended.
        </p>
        <p>
          Then I fix what affects users first and improve the structure gradually, so the app keeps shipping while it
          gets healthier. A full rewrite is sometimes the right call, but it should be a decision backed by evidence,
          not a reflex.
        </p>
      </Prose>

      <section className={`wrap flex flex-col gap-10 overflow-x-clip ${gap}`}>
        <Heading>What I care about</Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5 [perspective:1200px]">
          {values.map((v) => (
            <div
              key={v.title}
              data-about="value"
              className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-6 md:p-8"
            >
              <h3 className="text-[22px] font-bold">{v.title}</h3>
              <p className="text-base leading-[1.6] text-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap flex flex-col gap-10 overflow-x-clip ${gap}`}>
        <Heading>Who I work best with</Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5">
          {audiences.map((a) => (
            <div
              key={a.title}
              data-about="audience"
              className="flex flex-col gap-2.5 rounded-[22px] border border-line p-7"
            >
              <h3 className="text-[19px] font-bold">{a.title}</h3>
              <p className="text-base leading-[1.55] text-body">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap flex flex-col gap-10 ${gap}`}>
        <Heading>What clients say</Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      <section className={`wrap flex flex-wrap gap-x-16 gap-y-8 overflow-x-clip ${gap}`}>
        <div className="flex-[0_1_340px]">
          <Heading>Experience</Heading>
        </div>
        <div data-about="timeline" className="relative min-w-0 flex-[1_1_560px]">
          {/* The progress line: drawn from the first dot to the last as the page scrolls.
              AboutMotion sets its top and height from the dots; decorative. */}
          <span
            data-about="line"
            aria-hidden="true"
            className="absolute top-0 left-[7px] h-0 w-0.5 origin-top scale-y-0 rounded-full bg-accent"
          />
          <ol className="flex flex-col">
            {roles.map((role, i) => {
              const last = i === roles.length - 1;
              return (
                <li
                  key={role.title}
                  data-about="role"
                  // A plain grey track: the blue progress line draws over it.
                  className={`relative ml-[7px] border-l-2 pl-9 ${last ? "border-transparent" : "border-line pb-12"}`}
                >
                  <span
                    aria-hidden="true"
                    data-about="dot"
                    className={`absolute top-0.5 -left-[9px] z-[1] size-4 rounded-full ${
                      role.current
                        ? "bg-live shadow-[0_0_0_5px_rgba(61,214,140,0.18)]"
                        : "bg-bg shadow-[inset_0_0_0_2px_var(--btn2-line)]"
                    }`}
                  />
                  <div className="flex flex-col gap-2.5">
                    <span className={`text-[15px] ${role.current ? "font-semibold text-live" : "text-muted"}`}>
                      {role.dates}
                    </span>
                    <h3 className={`font-bold ${role.minor ? "text-[21px]" : "text-2xl"}`}>
                      {role.title}, {role.company}
                    </h3>
                    {role.summary && <p className="text-base leading-[1.55] text-body">{role.summary}</p>}
                    {role.highlights.length > 0 && (
                      <ul className="mt-1 flex list-disc flex-col gap-2 pl-5 text-base leading-[1.55] text-body">
                        {role.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Full width so the marquee runs edge to edge; the heading and cards keep the page width. */}
      <section className={`overflow-x-clip ${gap}`}>
        <Toolkit groups={toolkit} heading={<Heading>Toolkit</Heading>} />
      </section>

      <CTAStrip
        avatar
        heading="Let's talk about your app"
        body="You'll work directly with me, from the first call to the release."
        button={primaryCta}
        link={{ href: "/work", label: "the apps I've built" }}
      />
      <AboutMotion />
    </>
  );
}
