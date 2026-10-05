import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CapabilityMatrix } from "@/components/CapabilityMatrix";
import { CTABand } from "@/components/CTABand";
import { HeroLockscreen } from "@/components/HeroLockscreen";
import { ArrowUpRight, Book, Package, PhonePlus, Refresh, Wrench } from "@/components/icons";
import { HeatMapVisual, SvgToWidgetVisual } from "@/components/PlaybookVisuals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectRail } from "@/components/ProjectRail";
import { Timeline } from "@/components/Timeline";
import { ButtonLink, SectionTitle, TextLink } from "@/components/ui";
import { experience } from "@/content/experience";
import { publishedProjects } from "@/content/projects";
import { openSource, playbooks, primaryCta, site, storeLinks } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Senior Flutter Developer for iOS and Android | Shahzaib Hassan",
  description:
    "I build new Flutter apps and fix existing ones: payments, real-time chat, maps, and App Store releases. Four years of production work.",
  path: "/",
});

// Copy: docs/copy-and-seo.md section 4. Layout: design/home.html.

const entryPoints = [
  {
    icon: PhonePlus,
    title: "Build a new app",
    body: "You have an idea, designs, or a rough MVP spec. I plan the architecture, build iOS and Android from one Flutter codebase, and take the app through App Store and Google Play review.",
    link: { href: "/services/flutter-app-development", label: "How a new build works" },
  },
  {
    icon: Wrench,
    title: "Rescue an existing app",
    body: "The app crashes, lags, fails to build, or the last developer left it half-finished. I audit the code, fix what's hurting users first, and get releases moving again, without rewriting everything.",
    link: { href: "/services/flutter-app-rescue", label: "What a rescue looks like" },
  },
  {
    icon: Refresh,
    title: "Keep a live app moving",
    body: "Your app is in the stores and you need someone dependable for new features, fixes, OS updates, and releases. I work as your Flutter developer on a monthly basis.",
    link: { href: "/services/flutter-app-maintenance", label: "How maintenance works" },
  },
];

const processSteps = [
  { title: "Scope call", body: "We agree what ships first, what can wait, and how we'll know it works." },
  {
    title: "Architecture first",
    body: "State, data, and integrations are planned before screens, so features don't fight each other later.",
  },
  {
    title: "Builds you can install",
    body: "You test real builds on TestFlight and Google Play internal testing, not screenshots and status reports.",
  },
  {
    title: "Store release",
    body: "Store listings, review guidelines, and rejections are handled until the app is live.",
  },
  { title: "Handover", body: "You own a clean, documented repo that any Flutter developer can pick up." },
];

const sectionGap = "pt-[88px] md:pt-[136px]";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="wrap flex flex-wrap items-center gap-14 pt-8 pb-16 md:pt-14 md:pb-24">
        <div className="flex min-w-0 flex-[1_1_600px] flex-col gap-8">
          <div className="flex items-center gap-3.5 text-[15px] font-medium text-body">
            <span className="relative size-12 flex-none">
              <Image
                src="/images/avatar.webp"
                alt=""
                width={48}
                height={48}
                priority
                className="size-12 rounded-full object-cover shadow-[0_0_0_2px_var(--line)]"
              />
              {site.available && (
                <span className="absolute -right-px -bottom-px size-3 rounded-full bg-live shadow-[0_0_0_3px_var(--bg)]" />
              )}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-bold text-text">{site.name}</span>
              {site.available && <span>{site.availabilityNote}</span>}
            </span>
          </div>

          <h1 className="text-[clamp(44px,6vw,84px)] leading-none font-extrabold tracking-[-0.04em]">
            <span className="mb-[18px] block text-xl leading-[1.2] font-semibold tracking-normal text-accent">
              Senior Flutter Developer<span className="sr-only">:</span>
            </span>{" "}
            Mobile apps
            <br /> that hold up
            <br /> in production.
          </h1>

          <p className="max-w-[34em] text-[19px] leading-normal text-body md:text-[21px]">
            I&apos;m Shahzaib Hassan. I build iOS and Android apps in Flutter for startups, product teams, and
            agencies, and I take over existing Flutter apps that have become slow, unstable, or hard to change. Most
            of my work is in the parts that break first: payments, subscriptions, real-time chat, and maps.
          </p>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href="#work" variant="secondary">
              See the work
            </ButtonLink>
          </div>
        </div>

        <HeroLockscreen caption="Notifications from apps I've built and shipped." />
      </section>

      {/* Proof line */}
      <section aria-label="Background" className="wrap">
        <div className="flex flex-wrap items-start gap-8 border-t border-line pt-10">
          <p className="max-w-[30em] flex-[2_1_560px] text-[22px] leading-[1.35] font-medium tracking-[-0.015em] md:text-[28px]">
            Four years building Flutter apps at Code Encoders and Rex Technologies. Apps live on the App Store and
            Google Play, one past 10,000 downloads, and two open-source packages on pub.dev.
          </p>
          <ul className="flex flex-[1_1_240px] flex-col gap-2.5 text-base leading-[1.2] font-medium text-body">
            <li>
              <a href={storeLinks.pawPlayLove.appStore} className="no-underline hover:text-accent">
                Paw Play Love on the App Store
              </a>
            </li>
            <li>
              <a href={storeLinks.pawPlayLove.googlePlay} className="no-underline hover:text-accent">
                Paw Play Love on Google Play
              </a>
            </li>
            <li>
              <a href={site.social.pubDev} className="no-underline hover:text-accent">
                Packages on pub.dev
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Where I come in */}
      <section aria-labelledby="start-title" className="wrap flex flex-col gap-12 pt-[88px] md:pt-32">
        <SectionTitle id="start-title" className="max-w-[14em]">
          Three ways projects usually start
        </SectionTitle>
        <div className="grid grid-cols-1 border-t border-line md:grid-cols-3">
          {entryPoints.map(({ icon: Icon, title, body, link }, i) => (
            <div
              key={title}
              className={`flex flex-col gap-3.5 border-line py-8 ${
                i < entryPoints.length - 1 ? "border-b md:border-r md:border-b-0" : ""
              } ${i === 0 ? "md:pr-8" : i === entryPoints.length - 1 ? "md:pl-8" : "md:px-8"}`}
            >
              <Icon size={28} strokeWidth={1.8} />
              <h3 className="text-2xl font-bold tracking-[-0.015em]">{title}</h3>
              <p className="text-[17px] leading-[1.55] text-body">{body}</p>
              <TextLink href={link.href} className="mt-1.5 text-base">
                {link.label}
              </TextLink>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" aria-labelledby="work-title" className={sectionGap}>
        <ProjectRail
          label="Projects"
          header={
            <div className="flex max-w-[640px] flex-col gap-3.5">
              <SectionTitle id="work-title">Work</SectionTitle>
              <p className="text-[19px] leading-[1.55] text-body">
                Nine production apps across social discovery, marketplaces, Web3 commerce, and real-time systems.
                Each one had a part that was harder than it looked.
              </p>
            </div>
          }
          trailing={
            <Link href="/work" className="tap-target ml-2.5 text-base font-semibold text-accent underline underline-offset-2 hover:no-underline">
              See all work
            </Link>
          }
        >
          {publishedProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </ProjectRail>
      </section>

      {/* Capability table */}
      <section aria-labelledby="capabilities-title" className={`wrap flex flex-col gap-10 ${sectionGap}`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-end gap-8">
          <SectionTitle id="capabilities-title">Shipped, not just listed</SectionTitle>
          <p className="max-w-[30em] text-[19px] leading-[1.55] text-body">
            Every capability here is running in an app I built. If it&apos;s on this page, there&apos;s a project
            behind it.
          </p>
        </div>
        <CapabilityMatrix />
      </section>

      {/* How a project runs */}
      <section aria-labelledby="process-title" className="wrap flex flex-col gap-12 pt-[88px] md:pt-[152px]">
        <SectionTitle id="process-title">How a project runs</SectionTitle>
        <ProcessSteps steps={processSteps} />
      </section>

      {/* Experience */}
      <section
        aria-labelledby="experience-title"
        className="wrap flex flex-wrap items-start gap-x-[72px] gap-y-10 pt-[88px] md:pt-[152px]"
      >
        <div className="flex flex-[1_1_320px] flex-col gap-5 md:sticky md:top-[calc(var(--header-h)+24px)]">
          <SectionTitle id="experience-title">From developer to senior engineer</SectionTitle>
          <p className="text-lg leading-[1.6] text-body">
            Four years of production Flutter work, from shipping features and fixing crashes to leading apps from
            first design to store release.
          </p>
          <TextLink href="/about" className="text-[17px]">
            More about me
          </TextLink>
        </div>
        <div className="min-w-0 flex-[2_1_560px]">
          <Timeline roles={experience} nowLabel="Now: open to new projects and remote roles" />
        </div>
      </section>

      {/* Blog */}
      <section aria-labelledby="blog-title" className={`wrap flex flex-col gap-10 ${sectionGap}`}>
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <SectionTitle id="blog-title">Blog</SectionTitle>
          <p className="text-[19px] leading-[1.55] text-body">
            Problems I&apos;ve solved, written up for other Flutter developers.
          </p>
          <TextLink href="/blog" className="text-[17px]">
            Read the blog
          </TextLink>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          {playbooks.map((playbook, i) => (
            <ResourceCard
              key={playbook.href}
              href={playbook.href}
              visual={i === 0 ? <HeatMapVisual /> : <SvgToWidgetVisual />}
              badge={
                <>
                  <Book size={14} />
                  Playbook
                </>
              }
              title={playbook.title}
              action="Read the playbook"
            />
          ))}
        </div>
      </section>

      {/* Open source */}
      <section aria-labelledby="oss-title" className="wrap flex flex-col gap-10 pt-[88px] md:pt-[120px]">
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <SectionTitle id="oss-title">Open source</SectionTitle>
          <p className="text-[19px] leading-[1.55] text-body">
            Flutter packages I&apos;ve published on pub.dev for other developers to use.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          {openSource.map((pkg, i) => (
            <ResourceCard
              key={pkg.href}
              href={pkg.href}
              visual={i === 0 ? <ButtonVisual /> : <CurvedCircleVisual />}
              badge={
                <>
                  <Package size={14} />
                  pub.dev package
                </>
              }
              title={pkg.name}
              mono
              description={pkg.description}
              action="View on pub.dev"
            />
          ))}
        </div>
      </section>

      <CTABand
        id="contact"
        heading="Have an app to build or fix?"
        body="Send a few lines about the app and where it's stuck. You'll work directly with me, and I'll reply with questions or a rough plan."
        primary={primaryCta}
        secondary={{ href: `https://wa.me/${site.whatsapp}`, label: "Message on WhatsApp" }}
      />
    </>
  );
}

type ResourceCardProps = {
  href: string;
  visual: ReactNode;
  badge: ReactNode;
  title: string;
  description?: string;
  action: string;
  mono?: boolean;
};

function ResourceCard({ href, visual, badge, title, description, action, mono }: ResourceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-4 rounded-3xl border border-line bg-surface px-4 pt-4 pb-[22px] no-underline transition-colors hover:border-line-strong"
    >
      <span aria-hidden="true" className="block h-[150px] overflow-hidden rounded-2xl">
        {visual}
      </span>
      <span className="flex items-center gap-1.5 self-start rounded-full bg-surface-2 px-2.5 py-[5px] text-[13px] font-semibold text-muted">
        {badge}
      </span>
      <span
        className={`px-1 leading-[1.3] font-bold ${mono ? "font-mono text-lg tracking-[-0.02em]" : "text-[19px]"}`}
      >
        {title}
      </span>
      {description && <span className="px-1 text-[15px] leading-normal text-muted">{description}</span>}
      <span className="mt-auto flex items-center gap-1.5 px-1 text-[15px] font-semibold text-accent">
        {action}
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function ButtonVisual() {
  return (
    <span className="flex h-full items-center justify-center bg-[#1A2433]">
      <span className="rounded-xl bg-[#7B98FF] px-[18px] py-3 text-sm font-bold text-[#0E1530] shadow-[0_0_0_6px_rgba(123,152,255,0.18),0_0_0_12px_rgba(123,152,255,0.08)]">
        Tap me
      </span>
    </span>
  );
}

function CurvedCircleVisual() {
  return (
    <span className="flex h-full items-center justify-center bg-[#1A2433]">
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        <defs>
          <mask id="icc-mask">
            <rect width="96" height="96" fill="#fff" />
            <circle cx="48" cy="-6" r="36" fill="#000" />
          </mask>
        </defs>
        <circle cx="48" cy="52" r="40" fill="#7B98FF" mask="url(#icc-mask)" />
      </svg>
    </span>
  );
}
