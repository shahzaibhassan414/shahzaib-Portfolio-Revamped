// Case-study and project-page copy, verbatim from docs/copy-and-seo.md sections 7 to 10.
// Strings wrapped in [square brackets] are content Shahzaib still needs to send; the page
// renders them as visible placeholders.

export type RichItem = {
  /** Bold lead-in, rendered before `text`. */
  title?: string;
  text: string;
};

export type DiagramRow = {
  app: string;
  flow: string;
  service: string;
  /** Highlighted connection (accent color). */
  accent?: boolean;
  /** Extra service card under this row's service, joined by a vertical arrow. */
  below?: string;
};

export type Diagram = {
  appLabel: string;
  serviceLabel: string;
  rows: DiagramRow[];
  caption: string;
};

export type CaseStudyCta = {
  heading: string;
  body: string;
  button: string;
  /** Optional related link shown under the body. */
  link?: { href: string; label: string };
};

export type FullCaseStudy = {
  kind: "full";
  h1: string;
  /** SEO title and description from docs/copy-and-seo.md section 12. Falls back to h1 and the card line. */
  seo?: { title: string; description: string };
  overview: string;
  placeholders?: { overview?: string };
  product: string[];
  problem: string[];
  role: string[];
  built: { group?: string; items: RichItem[] }[];
  diagram?: Diagram;
  challenges: RichItem[];
  decisions: RichItem[];
  stack: string;
  outcome: string[];
  /** Result cards that still need real numbers. */
  results?: { value: string; label: string }[];
  learned: string[];
  learnedLink?: { before: string; label: string; href: string; after: string };
  cta: CaseStudyCta;
};

export type ShortCaseStudy = {
  kind: "short";
  h1: string;
  /** SEO title and description from docs/copy-and-seo.md section 12. Falls back to h1 and the card line. */
  seo?: { title: string; description: string };
  paragraphs: string[];
  stack: string;
  cta: CaseStudyCta;
};

export type CaseStudy = FullCaseStudy | ShortCaseStudy;

const realtimeCta: CaseStudyCta = {
  heading: "Building something with live location or chat?",
  body: "I've solved the presence, map, and subscription problems that come with it. Tell me about your app.",
  button: "Discuss a similar project",
  link: { href: "/services#realtime", label: "Real-time features service" },
};

const marketplaceCta: CaseStudyCta = {
  heading: "Building a marketplace?",
  body: "Multi-sided apps get complicated fast. I can help you structure yours so it stays fast and maintainable as you add verticals.",
  button: "Discuss a similar project",
};

const fintechCta: CaseStudyCta = {
  heading: "Building a fintech or Web3 product?",
  body: "Wallet onboarding, identity verification, and payments are where these apps win or lose users. Let's talk about yours.",
  button: "Discuss a similar project",
  link: { href: "/services#payments", label: "Payments and subscriptions" },
};

export const caseStudies: Record<string, CaseStudy> = {
  "on-scene": {
    kind: "full",
    h1: "On Scene: a location-based dating app built in Flutter",
    seo: {
      title: "On Scene: Location-Based Dating App in Flutter",
      description:
        "How I built venue check-ins, live presence on Google Maps, real-time chat, and RevenueCat subscriptions for a dating app.",
    },
    overview:
      "On Scene is a dating and social discovery app built around real places. Instead of endless swiping, people check in at venues, see who's nearby on a live map, chat in real time, and unlock premium features with a subscription. I was the main Flutter developer on the iOS and Android app.",
    placeholders: {
      overview:
        'Confirm your exact title. The current site says both "Location feature lead" and "Main Flutter developer".',
    },
    product: [
      "Most dating apps are profile catalogs: you swipe through strangers who could be anywhere. On Scene starts from the opposite end. It shows you where people are right now, which venues are busy tonight, and who just checked in near you, so meeting someone is a matter of going somewhere rather than messaging for a week.",
    ],
    problem: [
      "The app had to connect online dating with real-world presence. That meant a map that always reflected what was actually happening, check-ins that registered instantly, live updates for everyone nearby, private chat, and a premium tier, all in one app that still felt fast on an average Android phone.",
    ],
    role: [
      "I built the core mobile experience on iOS and Android: venue check-ins, map-based discovery, live presence, real-time chat, and premium subscriptions.",
      "[Team size, who handled the backend and design, and how long you worked on it.]",
    ],
    built: [
      {
        items: [
          {
            title: "Venue check-ins and nearby discovery",
            text: "on Google Maps, so the app is anchored in real places",
          },
          { title: "Live presence", text: "that updates who's around a venue as people arrive and leave" },
          {
            title: "Real-time chat",
            text: "over Socket.IO, with Firebase push notifications for messages and activity",
          },
          { title: "Matching", text: "between people at or near the same venues" },
          {
            title: "Safety controls:",
            text: "[What users can do, such as block, report, or hide their location.]",
          },
          { title: "Premium subscriptions", text: "through RevenueCat across the App Store and Google Play" },
        ],
      },
    ],
    diagram: {
      appLabel: "Flutter app, iOS and Android",
      serviceLabel: "Services",
      rows: [
        { app: "Map discovery", flow: "location queries", service: "Google Maps SDK" },
        { app: "Check-ins and chat", flow: "presence events", service: "Socket.IO server" },
        { app: "Notifications", flow: "push notifications", service: "Firebase messaging" },
        {
          app: "Premium access",
          flow: "entitlements",
          service: "RevenueCat",
          accent: true,
          below: "App Store and Google Play billing",
        },
      ],
      caption: "How the Flutter app connects to the services behind each feature.",
    },
    challenges: [
      {
        title: "Keeping a busy map smooth.",
        text: "Map screens get slow quickly when markers, location updates, and socket events all arrive at once. Every presence update can trigger a rebuild, and a naive approach redraws the entire map for each one. I structured the location and real-time logic so the map stayed responsive as activity changed around the user.",
      },
      {
        text: "[The specifics. For example, did you batch marker updates, throttle location events, cluster markers, or limit which widgets rebuild? One concrete technique makes this section far more convincing.]",
      },
      {
        title: "Presence that stays accurate.",
        text: "People close the app, lose signal, or walk out of a venue. Presence has to expire properly rather than showing someone who left an hour ago.",
      },
      {
        title: "Subscriptions on two stores.",
        text: "Premium access has to unlock right after purchase, survive reinstalls and device changes, and behave identically on Apple and Google.",
      },
    ],
    decisions: [
      {
        title: "Venues first, profiles second.",
        text: "Discovery starts on the map, which is what makes On Scene different from a standard swipe app.",
      },
      {
        title: "Sockets for presence, not polling.",
        text: "Socket events tied to map presence keep nearby activity current without constant API requests.",
      },
      {
        title: "RevenueCat for both stores.",
        text: "One source of truth for subscription status and entitlement checks across Apple and Google billing, instead of two hand-built integrations.",
      },
    ],
    stack:
      "Flutter, Dart, Google Maps SDK, Socket.IO, Firebase (Cloud Messaging and related services), RevenueCat, REST APIs",
    outcome: [
      "On Scene shipped as a location-based discovery platform that combines live presence, venue check-ins, real-time chat, and premium dating features on both iOS and Android.",
    ],
    results: [
      { value: "[number]", label: "[e.g. active users or check-ins]" },
      { value: "[number]", label: "[e.g. store rating or crash-free sessions]" },
    ],
    learned: [
      "Real-time location features are mostly a data-flow problem, not a map problem. The map is easy; deciding which updates matter, how often, and to which part of the screen is the actual work.",
    ],
    cta: realtimeCta,
  },

  zera: {
    kind: "full",
    h1: "Zera: a multi-vertical marketplace app built in Flutter",
    seo: {
      title: "Zera: Building a Multi-Vertical Marketplace in Flutter",
      description:
        "Goods, services, jobs, tickets, and community in one Flutter app: how it stays fast with TanStack Query, heat maps, and QR flows.",
    },
    overview:
      "Zera puts five products into one app: a marketplace for goods, a services directory, a jobs board, event ticketing, and a community feed. I was the main Flutter developer, responsible for the core mobile experience across all of those modules.",
    placeholders: {
      overview:
        'Confirm your title. The current site lists both "Main Flutter Developer" and "Marketplace feature developer".',
    },
    product: [
      'Zera\'s pitch is "Buy, Sell, Work and Connect." Instead of separate apps for selling a bike, hiring a cleaner, finding a job, and buying a concert ticket, people do all of it in one place, alongside a community of the same users.',
    ],
    problem: [
      "Each module is effectively its own product, with its own data, forms, filters, and user flows. Goods need listings and search. Services need providers and bookings. Jobs need applications. Events need tickets that can be scanned at the door. The challenge was holding all of that in one app without it feeling complicated to users or becoming unmaintainable for developers.",
    ],
    role: [
      "Feature development, API integration, state management, QR workflows, map-based features, server-state caching, UI implementation, and production releases.",
      "[Team size and who owned the backend.]",
    ],
    built: [
      {
        items: [
          {
            title: "Marketplace modules",
            text: "for goods, services, jobs, events, and community posts, each with its own flows and filters",
          },
          {
            title: "Demand heat maps",
            text: "on Google Maps that show where marketplace activity is concentrated",
          },
          { title: "QR ticket scanning", text: "for event entry" },
          { title: "In-app web views", text: "for external flows and dynamic actions" },
          {
            title: "Cached server state",
            text: "with TanStack Query, so data-heavy screens load fast and don't refetch unnecessarily",
          },
        ],
      },
    ],
    diagram: {
      appLabel: "Flutter app, iOS and Android",
      serviceLabel: "Services",
      rows: [
        { app: "Marketplace modules", flow: "cached queries", service: "REST APIs", accent: true },
        { app: "Demand heat maps", flow: "heat map layers", service: "Google Maps" },
        { app: "Event tickets", flow: "ticket scans", service: "QR scanning" },
        { app: "External flows", flow: "dynamic actions", service: "In-app web views" },
      ],
      caption: "How the Flutter app connects to the services behind each module.",
    },
    challenges: [
      {
        title: "Five products, one consistent app.",
        text: "Every module returned different API responses and needed different forms, filters, and UI states. I kept API logic, shared components, and feature-specific flows separate, so a change to jobs couldn't break events, and new modules could be added without restructuring existing ones.",
      },
      {
        title: "Data-heavy screens.",
        text: "Marketplace feeds, search, and listings make a lot of requests. Without caching, users see spinners everywhere and the backend takes unnecessary load.",
      },
      {
        title: "Heat maps without lag.",
        text: "Rendering high-density activity on a map can easily freeze the UI. The heat map had to show patterns clearly without overloading the map.",
      },
    ],
    decisions: [
      {
        title: "TanStack Query for server state.",
        text: "Caching, background refetching, and predictable UI updates in one place, instead of hand-rolled loading logic in every screen. It cut redundant API calls and made data-heavy screens more stable.",
      },
      {
        title: "Modular QR and web view handling.",
        text: "Built once, reused across tickets, external flows, and dynamic actions.",
      },
      {
        title: "Feature-first structure.",
        text: "Each vertical owns its screens and logic, with shared building blocks underneath.",
      },
    ],
    stack:
      "Flutter, Dart, REST APIs, TanStack Query, Google Maps with heat map layers, QR scanning, in-app web views",
    outcome: [
      "Zera shipped as a feature-rich marketplace with several user journeys in one Flutter app, supporting API-driven interactions, location-based discovery, QR ticketing, and room for new verticals.",
      "[Launch status, store links, or any usage number you can share.]",
    ],
    learned: [
      "In a multi-module app, structure is the product. Users never see the folder layout, but they feel it in how fast new features arrive and how rarely old ones break.",
    ],
    learnedLink: {
      before: "I also wrote up the heat map approach as a public playbook: ",
      label: "How to add a heat map to Google Maps in Flutter",
      href: "https://midnight-grape-a6b.notion.site/Playbook-How-to-Add-a-Heatmap-in-Flutter-Google-Maps-2854fb3615b880538317ede1721ce16a",
      after: ".",
    },
    cta: { ...marketplaceCta, link: { href: "/services/flutter-app-development", label: "building a marketplace" } },
  },

  bepay: {
    kind: "full",
    h1: "BePay: Web3 commerce apps for shoppers and merchants, built in Flutter",
    seo: {
      title: "BePay: Web3 Commerce Apps Built in Flutter",
      description:
        "Wallets from a Google login, KYC and KYB verification, and merchant tools: building two Web3 commerce apps in Flutter.",
    },
    overview:
      "BePay is a Web3 commerce platform with two Flutter apps: BePay Client for shoppers and BePay Business for merchants. Shoppers pay with a crypto wallet created from a familiar Google or Apple login. Merchants verify their business and manage products and orders from their phone. I built the mobile side of both.",
    product: [
      "Crypto payments usually lose people at the first step: install a wallet, write down a seed phrase, buy tokens, connect. BePay's idea is to make paying with a wallet feel like any other checkout, for shoppers who don't think of themselves as crypto users and merchants who just want to get paid.",
    ],
    problem: [
      "Two audiences with very different needs. Shoppers need onboarding that feels like a normal sign-up, plus identity verification that doesn't feel like paperwork. Merchants need business verification (KYB), product and listing management, and order operations. Both apps mix ordinary REST APIs with blockchain-backed operations, and wallet data has to stay secure on the device.",
    ],
    role: [
      "Flutter developer for both apps: wallet onboarding, KYC and KYB flows, REST API integration, merchant tools, and secure handling of wallet-related data.",
      "[Team size, timeline, and whether these were built at Code Encoders.]",
    ],
    built: [
      {
        group: "BePay Client (shoppers)",
        items: [
          { text: "Wallet creation through Web3Auth using Google or Apple sign-in, with no seed phrase on day one" },
          { text: "KYC verification screens using DIDIT" },
          { text: "Hybrid commerce flows combining REST APIs with blockchain-backed payments" },
        ],
      },
      {
        group: "BePay Business (merchants)",
        items: [
          { text: "Multi-step KYB verification for business onboarding and compliance" },
          { text: "Product, listing, and order management with search and filters" },
          { text: "Operational screens for running Web3 commerce from a phone" },
        ],
      },
    ],
    diagram: {
      appLabel: "Flutter apps, Client and Business",
      serviceLabel: "Services",
      rows: [
        { app: "Wallet onboarding", flow: "Google or Apple login", service: "Web3Auth", accent: true },
        { app: "KYC and KYB", flow: "verification", service: "DIDIT KYC and KYB SDKs" },
        { app: "Products and orders", flow: "Web2 repository", service: "REST APIs" },
        { app: "Wallet sessions", flow: "wallet metadata", service: "Secure storage" },
      ],
      caption: "How the two Flutter apps connect to the services behind each flow.",
    },
    challenges: [
      {
        title: "Making wallets feel normal.",
        text: "Every extra step in Web3 onboarding loses users. Using Web3Auth meant a wallet could be created through an OAuth login people already trust.",
      },
      {
        title: "Keeping Web2 and Web3 apart.",
        text: "Mixing API calls and blockchain operations in the same layer makes a codebase fragile and hard to test.",
      },
      {
        title: "Verification that adapts.",
        text: "KYB requirements vary by business, so the onboarding form couldn't be hard-coded.",
      },
      {
        title: "Protecting wallet data.",
        text: "Session and wallet-related metadata had to be stored securely on the device.",
      },
    ],
    decisions: [
      {
        title: "Repository layer split by concern.",
        text: "Web2 REST logic and Web3 wallet operations live in separate repositories, so each can change without breaking the other.",
      },
      {
        title: "Dynamic, multi-step KYB forms.",
        text: "The form structure is driven by requirements rather than fixed screens, so new verification rules don't need new UI.",
      },
      { title: "Secure on-device storage", text: "for wallet-related metadata and sessions." },
      {
        title: "Provider for merchant state",
        text: "across KYB, products, listings, and orders, with pagination-ready lists for merchants with large catalogs.",
      },
    ],
    stack: "Flutter, Dart, Web3Auth, DIDIT KYC and KYB SDKs, REST APIs, Provider, secure storage",
    outcome: [
      "BePay gave shoppers a wallet in a single social login and gave merchants a mobile back office for verification, listings, and orders.",
      "[Launch status, regions, store links, or any figure such as verified merchants or completed orders.]",
    ],
    learned: [
      "In fintech, the hard part is trust, not code. Every screen in onboarding either builds confidence or creates doubt, and good architecture is what lets you change those screens quickly when compliance rules change.",
    ],
    cta: fintechCta,
  },

  "paw-play-love": {
    kind: "short",
    h1: "Paw Play Love: a social app for pet owners, built in Flutter",
    paragraphs: [
      "Paw Play Love helps pet owners find playdates and other pet people nearby. It works like a dating app for pets: swipe through profiles, match, and chat in real time. Premium members get boosts, super likes, and rewinds.",
      "I built the Flutter app for iOS and Android from Figma designs. That included the swipe-based discovery flow, real-time chat and match updates over Socket.IO, Firebase authentication and push notifications, and RevenueCat subscriptions across both stores.",
      "The hard part was subscriptions. Premium features had to unlock instantly after purchase, stay correct after a reinstall or a device switch, and behave the same on Apple and Google billing. RevenueCat handled the store side, and I built the entitlement checks so the UI always reflected what the user had actually paid for. Socket.IO replaced API polling for chat and matches, which kept conversations instant without hammering the backend.",
    ],
    stack:
      "Flutter, Socket.IO, Firebase Auth, Firebase Cloud Messaging, RevenueCat, Provider, cached network images",
    cta: realtimeCta,
  },

  lawnolu: {
    kind: "short",
    h1: "LawnOlu: an on-demand services marketplace in Flutter",
    paragraphs: [
      "LawnOlu connects customers with lawn-care providers. Customers book a service, track the provider live on a map, pay, and get updates. Providers manage their job queue, navigate to customers, and get paid.",
      "I built both the customer and provider experiences in one Flutter codebase, with role-based navigation and state so each user only sees what applies to them. Live tracking uses Google Maps with location updates, markers, and route polylines. Stripe handles payments, Firebase sends job notifications, and REST APIs manage bookings and profiles.",
      "The challenge was one job seen from two sides. A single booking moves through several stages from request to completion, and both apps have to show the right state and actions at every step. I kept payment logic separate from booking logic, so changes to one couldn't break the other.",
    ],
    stack: "Flutter, Google Maps, Stripe, Firebase, REST APIs",
    cta: marketplaceCta,
  },

  simman: {
    kind: "short",
    h1: "Simman: real-time medical simulation in Flutter",
    paragraphs: [
      "Simman supports live medical simulation sessions, where an instructor controls a scenario and students respond in real time. The app streams audio and keeps every participant's screen in sync.",
      "I built the real-time audio streaming flows and used Firebase Realtime Database for instructor-to-student updates. I picked Realtime Database over Firestore because these updates are small, frequent, and latency-sensitive. GetX handled dependency injection and reactive state across the simulation screens.",
      "The challenge was keeping the UI responsive while audio and live data changed constantly. I structured the listeners so only the widgets that needed new data rebuilt, which kept sessions smooth.",
    ],
    stack: "Flutter, Firebase Realtime Database, real-time audio streaming, GetX",
    cta: realtimeCta,
  },

  "jatt-app": {
    kind: "short",
    h1: "Jatt App: a social networking foundation in Flutter",
    paragraphs: [
      "Jatt App is a social networking app. I built its foundation: onboarding with social login, authenticated REST API communication, Firebase-backed engagement features, and the UI structure the product's social features are built on.",
      "Authentication and API layers sit apart from the UI, and Dio interceptors handle tokens and authenticated requests in one place. Firebase integration stays modular, so new engagement features don't get tangled into existing screens.",
    ],
    stack: "Flutter, Dio, Firebase, social login, REST APIs",
    cta: realtimeCta,
  },
};

/** True for strings that are placeholders for content Shahzaib still needs to send. */
export function isPlaceholder(text: string) {
  return text.startsWith("[") && text.endsWith("]");
}
