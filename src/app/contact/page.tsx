import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/ContactForm";
import { ArrowUpRight, Calendar, Mail, MessageCircle } from "@/components/icons";
import { site } from "@/content/site";

// Copy: docs/copy-and-seo.md section 11. Layout: design/contact.html.

export const metadata: Metadata = {
  title: "Hire a Flutter Developer | Contact Shahzaib Hassan",
  description:
    "Tell me about your app: a new build, a rescue, or ongoing work. You'll hear back from me directly.",
};

const steps = [
  "I read your message and reply with questions or a first take.",
  "We have a short call to agree on scope and priorities.",
  "You get a written plan with a timeline and a quote.",
];

export default function ContactPage() {
  const direct = [
    {
      href: `https://wa.me/${site.whatsapp}`,
      label: "WhatsApp",
      detail: site.whatsappDisplay,
      icon: MessageCircle,
      tone: { bg: "rgba(61,214,140,0.14)", color: "var(--live)" },
    },
    {
      href: `mailto:${site.email}`,
      label: "Email",
      detail: site.email,
      icon: Mail,
      tone: { bg: "rgba(123,152,255,0.16)", color: "var(--accent)" },
    },
    // Hidden until site.bookingUrl is set (copy doc: booking link still needed).
    ...(site.bookingUrl
      ? [
          {
            href: site.bookingUrl,
            label: "Book a call",
            detail: "Pick a time that suits you",
            icon: Calendar,
            tone: { bg: "rgba(245,162,122,0.16)", color: "#F5A27A" },
          },
        ]
      : []),
  ];

  return (
    <section className="wrap flex flex-wrap items-start gap-16 pt-8 md:pt-16">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-8">
        <div className="flex items-center gap-3.5">
          <span className="relative size-14 flex-none">
            <Image
              src="/images/avatar.webp"
              alt=""
              width={56}
              height={56}
              priority
              className="size-14 rounded-full object-cover"
            />
            {site.available && (
              <span className="absolute right-0 bottom-0 size-[13px] rounded-full bg-live shadow-[0_0_0_3px_var(--bg)]" />
            )}
          </span>
          <span className="flex flex-col gap-0.5 text-[15px]">
            <span className="font-bold">{site.name}</span>
            {site.available && <span className="text-muted">{site.availabilityNote}</span>}
          </span>
        </div>

        <h1 className="text-[clamp(48px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-[-0.045em]">
          Tell me about your app
        </h1>
        <p className="max-w-[30em] text-lg leading-[1.55] text-body md:text-xl">
          A few lines is enough: what the app does, where it is now, and what&apos;s in the way. You&apos;ll hear back
          from me directly, not from a sales team.
        </p>

        <ul className="flex flex-col border-t border-line">
          {direct.map(({ href, label, detail, icon: Icon, tone }) => (
            <li key={label}>
              <a
                href={href}
                className="group flex items-center gap-4 border-b border-line py-5 no-underline"
              >
                <span
                  className="flex size-11 flex-none items-center justify-center rounded-xl"
                  style={{ background: tone.bg, color: tone.color }}
                >
                  <Icon size={20} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[17px] font-bold group-hover:text-accent">{label}</span>
                  <span className="truncate text-[15px] text-muted">{detail}</span>
                </span>
                <ArrowUpRight size={18} className="flex-none text-muted transition-colors group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-[18px]">
          <h2 className="text-[22px] font-bold">What happens next</h2>
          <ol className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <li key={step} className="grid grid-cols-[36px_1fr] gap-2.5 text-base leading-normal text-body">
                <span className="flex size-7 items-center justify-center rounded-full bg-surface-2 text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Suspense fallback={<ContactForm />}>
        <ContactFormWithParams />
      </Suspense>
    </section>
  );
}
