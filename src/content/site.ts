// Global facts used across the site. Edit here, not in components.

export const site = {
  name: "Shahzaib Hassan",
  shortName: "Shahzaib",
  role: "Senior Flutter Developer",
  url: "https://www.shahzaib-dev.site",
  email: "shahzaibhassan414@gmail.com",
  // Digits only, international format, used for wa.me links.
  whatsapp: "923160984600",
  whatsappDisplay: "+92 316 0984600",
  location: "Pakistan (UTC+5), working remotely",
  available: true,
  availabilityNote: "Available for new projects",
  resumeUrl:
    "https://drive.google.com/file/d/1NoEbEf10bPoYPQt8yiaMGpaGDvDXYP5P/view?usp=sharing",
  // TODO(shahzaib): add a Calendly / Cal.com link. Booking UI stays hidden while this is null.
  bookingUrl: null as string | null,
  social: {
    github: "https://github.com/shahzaibhassan414",
    linkedin: "https://www.linkedin.com/in/shahzaibhassan414/",
  },
  description:
    "Senior Flutter developer who builds, fixes, and maintains production iOS and Android apps: payments, subscriptions, real-time chat, maps, and App Store and Google Play releases.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export const primaryCta = { href: "/contact", label: "Discuss your app" } as const;

export const openSource = [
  {
    name: "fancy_button_animations",
    href: "https://pub.dev/packages/fancy_button_animations",
    description: "Micro-animations and feedback states for buttons.",
  },
  {
    name: "inner_curved_circle",
    href: "https://pub.dev/packages/inner_curved_circle",
    description: "A painter for smooth inner-curved circle clipping.",
  },
] as const;

// Existing articles live on Notion for now. Move them onto /blog (see docs/copy-and-seo.md, section 14).
export const playbooks = [
  {
    title: "How to add a heat map to Google Maps in Flutter",
    href: "https://midnight-grape-a6b.notion.site/Playbook-How-to-Add-a-Heatmap-in-Flutter-Google-Maps-2854fb3615b880538317ede1721ce16a",
    topic: "Maps and location",
  },
  {
    title: "From SVG to Flutter widget",
    href: "https://midnight-grape-a6b.notion.site/Playbook-From-SVG-to-Flutter-Widget-2e94fb3615b880dd89a4fc2cc4d76f68",
    topic: "UI and widgets",
  },
] as const;

export const storeLinks = {
  pawPlayLove: {
    appStore: "https://apps.apple.com/id/app/paw-play-love/id6648773545",
    googlePlay: "https://play.google.com/store/apps/details?id=com.pawplaylove&hl=en",
  },
} as const;
