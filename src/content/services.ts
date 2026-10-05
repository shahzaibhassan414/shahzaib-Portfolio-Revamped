// Services copy, verbatim from docs/copy-and-seo.md section 6 (plus the CTA library in
// section 11 and SEO H1s in section 12). Layout details come from design/services.html.

export type FaqItem = { q: string; a: string };

export type ServiceType = "build" | "rescue" | "maintain";

export type Service = {
  id: ServiceType;
  slug: string;
  href: string;
  /** Small label above the hub H2. */
  label: string;
  /** Hub H2. */
  title: string;
  /** H1 on the dedicated page. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  problem: string;
  whoFor: string;
  whatIDo: string;
  steps: string[];
  /** Maintenance describes how it runs in one sentence instead of numbered steps. */
  howItRuns?: string;
  /** Design tiles summarizing how maintenance runs. */
  runTiles?: { title: string; detail: string }[];
  whatYouGet: string;
  whyExperience?: string;
  cta: { heading: string; button: string };
  related: string[];
  faq: string[];
  accent: { color: string; bg: string };
};

export const faq: Record<string, FaqItem> = {
  timezone: {
    q: "What time zone do you work in?",
    a: "Pakistan, UTC+5. That overlaps with European working hours and US mornings. We agree on shared hours at the start of each project.",
  },
  design: {
    q: "Do you design the app too?",
    a: "I build from your designs, usually in Figma. If you don't have designs, I can work with a designer you choose or recommend one.",
  },
  ownership: {
    q: "Who owns the code?",
    a: "You do, from the first commit. The code lives in your repository, and the app is published under your developer accounts.",
  },
  team: {
    q: "Can you join our existing team?",
    a: "Yes. I can work inside your repository, your process, and your tools, alongside your backend and design team.",
  },
  stores: {
    q: "Do you handle App Store and Google Play submission?",
    a: "Yes, including store listings, review guidelines, and fixing rejections until the app is approved.",
  },
  flutter: {
    q: "Is Flutter the right choice for my app?",
    a: "For most products that need iOS and Android, yes: one codebase, native performance, and faster releases. If your app depends heavily on platform-specific features, I'll tell you before we start.",
  },
};

export const faqOrder = ["timezone", "design", "ownership", "team", "stores", "flutter"];

export const services: Service[] = [
  {
    id: "build",
    slug: "flutter-app-development",
    href: "/services/flutter-app-development",
    label: "Flutter app development",
    title: "Build a new app",
    h1: "Flutter app development for startups and product teams",
    metaTitle: "Flutter App Development for Startups and Teams",
    metaDescription:
      "A production Flutter app for iOS and Android from one codebase, with architecture planned before screens and store release handled.",
    problem:
      "A first version built quickly and carelessly gets expensive fast. Features start breaking each other, releases slow down, and within a year someone suggests a rewrite.",
    whoFor:
      "Founders with an idea or designs and no mobile team, companies adding a mobile product, and agencies that need a senior Flutter developer for a client build.",
    whatIDo:
      "I turn your designs or spec into a production Flutter app for iOS and Android from one codebase. I plan the architecture first: how state is managed, how the app talks to your backend, and where integrations like payments or real-time chat fit. Then I build in milestones you can install and test, and take the app through App Store and Google Play review.",
    steps: [
      "Scope call: what ships first, what waits, how we'll measure it",
      "Architecture and a milestone plan",
      "Builds on TestFlight and Google Play internal testing as features land",
      "Store submission, review fixes, and launch",
      "Handover with documentation, or straight into maintenance",
    ],
    whatYouGet:
      "A production app on both stores, a clean repository you own, setup notes for your next developer, and a codebase that won't need rewriting when you grow.",
    whyExperience:
      "The expensive mistakes in a new app are made in the first two weeks: state management choices, API structure, how subscriptions are verified. I've lived with those decisions long after launch, so I make them carefully.",
    cta: { heading: "Planning a new app?", button: "Plan your new app" },
    related: ["on-scene", "zera"],
    faq: ["design", "ownership", "stores", "flutter", "timezone"],
    accent: { color: "var(--accent)", bg: "rgba(123,152,255,0.16)" },
  },
  {
    id: "rescue",
    slug: "flutter-app-rescue",
    href: "/services/flutter-app-rescue",
    label: "Flutter app rescue",
    title: "Rescue an existing app",
    h1: "Rescue a struggling Flutter app",
    metaTitle: "Flutter App Rescue: Fix a Buggy or Slow Flutter App",
    metaDescription:
      "Crashes, lag, failing builds, or messy code? I audit your Flutter app, fix what hurts users first, and get releases moving again.",
    problem:
      "The app crashes, screens lag, builds fail, or a feature that should take a day takes two weeks. Often the original developer has moved on and nobody fully understands the code.",
    whoFor:
      "Product owners and founders with a Flutter app that's buggy, slow, unstable, or hard to change, and teams that inherited a codebase from an agency or freelancer.",
    whatIDo:
      "I start with an audit, not a rewrite. I go through crash reports, profile slow screens, review state management and API handling, check dependencies and Flutter version, and get the build pipeline working. You get a written list of problems ranked by how much they hurt users. Then I fix them in that order, improving structure as I go so the app keeps shipping.",
    steps: [
      "Audit: code review, crash and performance analysis, written findings",
      "Stabilize: crashes, blocking bugs, and anything stopping store review",
      "Improve: untangle state, fix API handling, cut unnecessary rebuilds",
      "Resume regular releases, with you deciding what comes next",
    ],
    whatYouGet:
      "A clear picture of what's wrong and why, a stable app, a faster release cycle, and a codebase another developer could pick up.",
    whyExperience:
      "Rescuing an app means reading someone else's decisions and knowing which ones to keep. That judgment comes from having built similar apps, not from the code alone.",
    cta: { heading: "Is your app fighting you?", button: "Get your app audited" },
    related: ["on-scene", "simman"],
    faq: ["ownership", "team", "timezone", "stores"],
    accent: { color: "#F5A27A", bg: "rgba(245,162,122,0.16)" },
  },
  {
    id: "maintain",
    slug: "flutter-app-maintenance",
    href: "/services/flutter-app-maintenance",
    label: "Flutter app maintenance",
    title: "Keep a live app moving",
    h1: "Flutter app maintenance and ongoing development",
    metaTitle: "Flutter App Maintenance and Ongoing Development",
    metaDescription:
      "A dependable Flutter developer for your live app: new features, fixes, upgrades, and regular App Store and Google Play releases.",
    problem:
      "Your app is live and people use it, but features pile up, iOS and Android updates break things, and there's no one dependable to own the Flutter side.",
    whoFor:
      "Startups after launch, companies whose original developer left, and agencies with apps in long-term support.",
    whatIDo:
      "I work as your Flutter developer on a monthly basis. New features, bug fixes, Flutter and dependency upgrades, OS changes, store releases, and performance work, prioritized with you each cycle.",
    steps: [],
    howItRuns:
      "A shared backlog, an agreed number of hours or days each month, written updates, and regular releases.",
    runTiles: [
      { title: "Shared backlog", detail: "You set priorities each cycle" },
      { title: "Agreed monthly time", detail: "Hours or days, reserved for you" },
      { title: "Written updates", detail: "What shipped and what's next" },
      { title: "Regular releases", detail: "On both stores" },
    ],
    whatYouGet:
      "A dependable owner for your Flutter code, predictable releases, and an app that keeps up with iOS, Android, and Flutter changes.",
    cta: { heading: "Need a dependable Flutter owner?", button: "Discuss ongoing support" },
    related: ["paw-play-love", "lawnolu"],
    faq: ["team", "stores", "ownership", "timezone"],
    accent: { color: "var(--live)", bg: "rgba(61,214,140,0.14)" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const specialistAreas = [
  {
    id: "performance",
    title: "Performance and stability",
    body: "Slow screens, excessive rebuilds, janky scrolling, memory problems, crash spikes, and poor API handling. I profile first, then fix the actual bottleneck instead of guessing.",
    tools: "Flutter DevTools, crash reporting, caching",
  },
  {
    id: "realtime",
    title: "Real-time features",
    body: "Chat, presence, typing indicators, live updates, and push notifications with Socket.IO, WebSockets, and Firebase, built to handle reconnects and background states properly.",
    tools: "Socket.IO, WebSockets, Firebase",
  },
  {
    id: "payments",
    title: "Payments and subscriptions",
    body: "RevenueCat subscriptions and paywalls, Stripe payments, and payouts, with entitlements that stay correct across Apple and Google billing.",
    tools: "RevenueCat, Stripe, store billing",
  },
];

export const engagements = [
  {
    title: "Fixed-scope project",
    body: "A defined set of features, a timeline, and a price agreed up front. Best for new builds and single features.",
    type: "build" as ServiceType,
  },
  {
    title: "App audit",
    body: "A short, paid review of an existing codebase with a written report and a prioritized fix list. The usual first step for rescues.",
    type: "rescue" as ServiceType,
    highlight: true,
  },
  {
    title: "Monthly",
    body: "A reserved block of my time each month for features, fixes, and releases. Best for live apps that need an ongoing owner.",
    type: "maintain" as ServiceType,
  },
];
