// Project data. Card lines come from docs/copy-and-seo.md section 7, colors from the design files
// and design/home.html. The homepage capability matrix is generated from `capabilities`,
// so only list what the project actually has.

import { storeLinks } from "@/content/site";

export type Capability = "subscriptions" | "payments" | "realtime" | "maps" | "web3" | "marketplace";

export type Screen = {
  /** Path under /public. When missing, a tinted placeholder with `label` is shown. */
  src?: string;
  alt: string;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Two-letter mark used on app icons. */
  initials: string;
  category: "Social and dating" | "Marketplace" | "Fintech and Web3" | "Real-time" | string;
  /** Short descriptor shown above the project name on rail cards. */
  kind: string;
  cardLine: string;
  color: string;
  tint: {
    /** Background of the card's screenshot panel. */
    panel: string;
    /** Placeholder screen background and text. */
    screen: string;
    screenText: string;
    /** Text color of the numbered label on dark surfaces. */
    label: string;
  };
  /** Short type shown in the Work page index. */
  type: string;
  /** Radial gradient stops for large panels (Work tiles, featured project). */
  gradient: [string, string, string];
  /** Dark overlay color behind tile text, as an rgb triple "r,g,b". */
  shade: string;
  tier: "flagship" | "supporting";
  draft?: boolean;
  role?: string;
  /** Team around the project, e.g. "4–6 people (separate backend developer and designer)". */
  team?: string;
  timeline?: string;
  /** Shown instead of store links when the app isn't (or is no longer) on the stores. */
  status?: string;
  /** One line on the hardest problem, shown on the featured card. */
  hardPart?: string;
  platforms: string;
  /** Short list of tags shown on cards. */
  tags: string[];
  /** Full stack, from the copy doc. */
  stack: string[];
  storeLinks?: { appStore?: string; googlePlay?: string };
  screens: Screen[];
  capabilities: Capability[];
};

export const projects: Project[] = [
  {
    slug: "on-scene",
    name: "On Scene",
    initials: "OS",
    category: "Social and dating",
    kind: "Location-based social app",
    cardLine:
      "Location-based dating built around real venues, with live check-ins, nearby presence, and real-time chat.",
    color: "#D93A63",
    tint: { panel: "#8E2442", screen: "#FBE7EC", screenText: "#6B2238", label: "#F2879F" },
    type: "Location-based dating",
    gradient: ["#E0557C", "#A52A4E", "#5E1229"],
    shade: "20,4,10",
    tier: "flagship",
    role: "Main Flutter developer",
    team: "4–6 people (separate backend developer and designer)",
    timeline: "3–6 months",
    hardPart: "A live map that stays smooth under constant updates",
    platforms: "iOS and Android",
    tags: ["Flutter", "Google Maps", "Socket.IO", "Firebase", "RevenueCat"],
    stack: [
      "Flutter",
      "Dart",
      "Google Maps SDK",
      "Socket.IO",
      "Firebase (Cloud Messaging and related services)",
      "RevenueCat",
      "REST APIs",
    ],
    screens: [
      {
        src: "/work/on-scene/screen-1.webp",
        label: "Explore nearby",
        alt: "On Scene screen inviting people to explore nearby scenes, with the Scenes Near You list on a phone",
      },
      {
        src: "/work/on-scene/screen-2.webp",
        label: "Venue page",
        alt: "On Scene venue page for a wine bar, with members checked in and what's happening on scene",
      },
      {
        src: "/work/on-scene/screen-3.webp",
        label: "Chats",
        alt: "On Scene chat list showing people currently on scene and recent conversations",
      },
    ],
    capabilities: ["subscriptions", "realtime", "maps"],
  },
  {
    slug: "zera",
    name: "Zera",
    initials: "ZR",
    category: "Marketplace",
    kind: "Multi-vertical marketplace",
    cardLine: "Goods, services, jobs, event tickets, and community posts in one app, with heat maps and QR ticketing.",
    color: "#0F8A7E",
    tint: { panel: "#0B5E56", screen: "#DDF3F0", screenText: "#0B4F48", label: "#5FD3C6" },
    type: "Multi-vertical marketplace",
    gradient: ["#26B3A3", "#0E7468", "#073D38"],
    shade: "5,12,14",
    tier: "flagship",
    role: "Main Flutter Developer",
    team: "2–3 people (separate backend developer)",
    status: "Launching soon on the App Store and Google Play",
    platforms: "iOS and Android",
    tags: ["Flutter", "TanStack Query", "Google Maps", "QR scanning"],
    stack: [
      "Flutter",
      "Dart",
      "REST APIs",
      "TanStack Query",
      "Google Maps with heat map layers",
      "Stripe",
      "RevenueCat",
      "QR scanning",
      "in-app web views",
    ],
    screens: [
      {
        src: "/work/zera/screen-1.webp",
        label: "Seller dashboard",
        alt: "Zera seller dashboard with a post overview and a monthly revenue chart",
      },
      {
        src: "/work/zera/screen-2.webp",
        label: "Marketplace",
        alt: "Zera marketplace browsing jobs, goods, services, and events, with a featured job post",
      },
      {
        src: "/work/zera/screen-3.webp",
        label: "Splash",
        alt: "Zera splash screen with the tagline Empowering Our Community",
      },
    ],
    capabilities: ["payments", "maps", "marketplace"],
  },
  {
    slug: "bepay",
    name: "BePay",
    initials: "BP",
    category: "Fintech and Web3",
    kind: "Web3 commerce platform",
    cardLine:
      "Consumer and merchant apps: wallets from a Google or Apple login, KYC and KYB checks, and mobile order tools.",
    color: "#5B49D6",
    tint: { panel: "#3B2E9C", screen: "#E9E6FB", screenText: "#34287F", label: "#A99CFF" },
    type: "Web3 commerce",
    gradient: ["#7F6FF0", "#4A3BB8", "#241B66"],
    shade: "10,8,30",
    tier: "flagship",
    role: "Senior Flutter Developer at Code Encoders",
    team: "7+ people",
    timeline: "3–6 months",
    status:
      "BePay Client and BePay Business are no longer on the App Store or Google Play. The screens below are from the production build.",
    platforms: "iOS and Android",
    tags: ["Flutter", "Web3Auth", "DIDIT KYC and KYB", "REST APIs"],
    stack: ["Flutter", "Dart", "Web3Auth", "DIDIT KYC and KYB SDKs", "REST APIs", "Provider", "secure storage"],
    screens: [
      {
        src: "/work/bepay/screen-1.webp",
        label: "Business sign-up",
        alt: "BePay Client onboarding for setting up a personal shop with Web3",
      },
      {
        src: "/work/bepay/screen-2.webp",
        label: "Wallet home",
        alt: "BePay Business home with balance, total orders, live crypto price, and send and receive",
      },
      {
        src: "/work/bepay/screen-3.webp",
        label: "Earnings",
        alt: "BePay Client dashboard tracking total revenue, weekly orders, and items sold",
      },
    ],
    capabilities: ["payments", "web3", "marketplace"],
  },
  {
    slug: "paw-play-love",
    name: "Paw Play Love",
    initials: "PL",
    category: "Social and dating",
    kind: "Social app for pet owners",
    cardLine:
      "Swipe matching for pet playdates, real-time chat, and a premium tier. Live on the App Store and Google Play.",
    color: "#E46A2E",
    tint: { panel: "#9C431A", screen: "#FCE9DF", screenText: "#7A3412", label: "#F5A27A" },
    type: "Social app for pet owners",
    gradient: ["#F58A4E", "#C2521F", "#5E230A"],
    shade: "30,12,4",
    tier: "supporting",
    platforms: "iOS and Android",
    tags: ["Flutter", "Socket.IO", "Firebase", "RevenueCat"],
    stack: [
      "Flutter",
      "Socket.IO",
      "Firebase Auth",
      "Firebase Cloud Messaging",
      "RevenueCat",
      "Provider",
      "cached network images",
    ],
    storeLinks: storeLinks.pawPlayLove,
    screens: [
      {
        src: "/work/paw-play-love/screen-1.webp",
        label: "Find a match",
        alt: "Paw Play Love screen: Find your pet's best match, with swipeable dog profiles",
      },
      {
        src: "/work/paw-play-love/screen-2.webp",
        label: "Swipe discovery",
        alt: "Paw Play Love swipe screen for liking or passing on a pet profile",
      },
      { label: "Premium paywall", alt: "Paw Play Love premium paywall" },
    ],
    capabilities: ["subscriptions", "realtime"],
  },
  {
    slug: "stylebite",
    name: "StyleBite",
    initials: "SB",
    category: "Social and dating",
    kind: "Fashion social app",
    cardLine:
      "A fashion social app where users share posts and reels, follow each other's style, and chat in real time.",
    color: "#9446B0",
    tint: { panel: "#5E2A73", screen: "#F3E6F8", screenText: "#4A1F5C", label: "#D3A6E6" },
    type: "Fashion social",
    gradient: ["#C083DA", "#9446B0", "#3A1748"],
    shade: "22,8,30",
    tier: "supporting",
    role: "Main Flutter Developer",
    team: "4–6 people",
    status: "Live on Google Play · Coming soon to the App Store",
    platforms: "iOS and Android",
    tags: ["Flutter", "Laravel", "Real-time chat"],
    stack: ["Flutter", "Laravel"],
    screens: [
      { label: "Feed", alt: "StyleBite home feed with posts and reels" },
      { label: "Reels", alt: "StyleBite reels" },
      { label: "Chat", alt: "StyleBite real-time chat" },
    ],
    capabilities: ["realtime"],
  },
  {
    slug: "lawnolu",
    name: "LawnOlu",
    initials: "LO",
    category: "Marketplace",
    kind: "On-demand services marketplace",
    cardLine:
      "On-demand lawn care: customers book and track providers live, providers run jobs and get paid, in one codebase.",
    color: "#2E9A55",
    tint: { panel: "#1D6B3A", screen: "#E0F3E7", screenText: "#17502B", label: "#6FD495" },
    type: "On-demand services",
    gradient: ["#45BE70", "#237C45", "#0E3A1F"],
    shade: "4,20,10",
    tier: "supporting",
    platforms: "iOS and Android",
    tags: ["Flutter", "Google Maps", "Stripe", "Firebase"],
    stack: ["Flutter", "Google Maps", "Stripe", "Firebase", "REST APIs"],
    screens: [
      {
        src: "/work/lawnolu/screen-1.webp",
        label: "Welcome",
        alt: "LawnOlu welcome screen for home care, cleaning, and gardening services",
      },
      {
        src: "/work/lawnolu/screen-2.webp",
        label: "Service list",
        alt: "LawnOlu home with service categories and trending lawn services",
      },
      {
        src: "/work/lawnolu/screen-3.webp",
        label: "Order listing",
        alt: "LawnOlu provider order listing with ongoing and completed jobs",
      },
    ],
    capabilities: ["payments", "maps", "marketplace"],
  },
  {
    slug: "simman",
    name: "Simman",
    initials: "SM",
    category: "Real-time",
    kind: "Medical simulation platform",
    cardLine: "Medical simulation with real-time audio and instant instructor-to-student sync during live sessions.",
    color: "#3D5A80",
    tint: { panel: "#283D59", screen: "#E2E9F3", screenText: "#22344D", label: "#9DB7DA" },
    type: "Real-time medical simulation",
    gradient: ["#6A8DB8", "#3D5A80", "#1A2A40"],
    shade: "6,12,22",
    tier: "supporting",
    platforms: "iOS and Android",
    tags: ["Flutter", "Firebase Realtime Database", "Audio streaming", "GetX"],
    stack: ["Flutter", "Firebase Realtime Database", "real-time audio streaming", "GetX"],
    screens: [
      { src: "/work/simman/screen-1.webp", label: "Login", alt: "Simman login screen" },
      {
        src: "/work/simman/screen-2.webp",
        label: "Instructor controls",
        alt: "Simman instructor controls with live vital-sign sliders and ECG trace, shown in landscape",
      },
      {
        src: "/work/simman/screen-3.webp",
        label: "Select user",
        alt: "Simman role selection for instructor or student",
      },
    ],
    capabilities: ["realtime"],
  },
  {
    slug: "jatt-app",
    name: "Jatt App",
    initials: "JA",
    category: "Social and dating",
    kind: "Social networking app",
    cardLine: "A social app's foundation: social login onboarding, authenticated APIs, and Firebase-backed engagement.",
    color: "#B7791F",
    tint: { panel: "#7A5014", screen: "#F7EBD6", screenText: "#5C3A0A", label: "#E5B567" },
    type: "Social networking",
    gradient: ["#E0A84E", "#9A6418", "#4A2F08"],
    shade: "26,16,4",
    tier: "supporting",
    platforms: "iOS and Android",
    tags: ["Flutter", "Dio", "Firebase", "Social login"],
    stack: ["Flutter", "Dio", "Firebase", "social login", "REST APIs"],
    screens: [
      {
        src: "/work/jatt-app/screen-1.webp",
        label: "Welcome",
        alt: "Jatt App welcome screen: Your Global Jaat Community",
      },
      {
        src: "/work/jatt-app/screen-2.webp",
        label: "Chat",
        alt: "Jatt App one-to-one chat with photo, camera, location, and contact sharing",
      },
      {
        src: "/work/jatt-app/screen-3.webp",
        label: "Contact info",
        alt: "Jatt App contact info with media, pinned messages, report, and block",
      },
    ],
    capabilities: [],
  },
  {
    slug: "examconnect",
    name: "ExamConnect",
    initials: "EC",
    category: "Social and dating",
    kind: "Study network for medical students",
    cardLine:
      "A study network where medical students find each other, chat one-on-one and prepare for exams together in group chats.",
    color: "#2F7FC1",
    tint: { panel: "#1F5784", screen: "#E1EEF8", screenText: "#17405F", label: "#7DB8E6" },
    type: "Study network",
    gradient: ["#5BA3DD", "#2F7FC1", "#123A5C"],
    shade: "6,16,28",
    tier: "supporting",
    role: "Solo developer: design to deployment",
    status: "No longer on the stores",
    platforms: "iOS and Android",
    tags: ["Flutter", "Firebase"],
    stack: ["Flutter", "Firebase"],
    screens: [
      { label: "Study partners", alt: "ExamConnect screen for finding other medical students" },
      { label: "One-on-one chat", alt: "ExamConnect one-on-one chat" },
      { label: "Group chat", alt: "ExamConnect exam-prep group chat" },
    ],
    capabilities: ["realtime"],
  },
  {
    slug: "material-world",
    name: "Material World",
    initials: "MW",
    category: "Marketplace",
    kind: "Wholesale ordering app",
    cardLine:
      "A wholesale ordering app built for a client, so their buyers can browse the product catalogue and order online.",
    color: "#8A5A44",
    tint: { panel: "#5E3B2C", screen: "#F3E7E1", screenText: "#4E2F21", label: "#D7A68E" },
    type: "Wholesale ordering",
    gradient: ["#B5826A", "#8A5A44", "#3E2519"],
    shade: "24,14,10",
    tier: "supporting",
    role: "Main Flutter developer",
    platforms: "[Platforms]",
    tags: ["Flutter", "REST API", "Laravel"],
    stack: ["Flutter", "REST API (Laravel/PHP)"],
    screens: [
      { label: "Product catalogue", alt: "Material World product catalogue" },
      { label: "Product details", alt: "Material World product details" },
      { label: "Order", alt: "Material World order screen" },
    ],
    capabilities: [],
  },
];

export const publishedProjects = projects.filter((p) => !p.draft);

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
/** How many apps the site shows, as a word ("Ten"), so copy never claims more or fewer than are listed. */
export const appCountWord = numberWords[publishedProjects.length] ?? String(publishedProjects.length);

export const projectFilters = [
  { id: "social", label: "Social and dating", category: "Social and dating" },
  { id: "marketplace", label: "Marketplaces", category: "Marketplace" },
  { id: "fintech", label: "Fintech and Web3", category: "Fintech and Web3" },
  { id: "realtime", label: "Real-time", category: "Real-time" },
] as const;

/** Filter id for a project's category, used by the Work page filter. */
export function filterId(project: Project) {
  return projectFilters.find((f) => f.category === project.category)?.id ?? "other";
}

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

export const capabilityRows: { id: Capability; label: string; detail: string }[] = [
  {
    id: "subscriptions",
    label: "Subscriptions and paywalls",
    detail: "RevenueCat, App Store and Play billing",
  },
  { id: "payments", label: "Payments", detail: "Stripe, wallet payments, payouts" },
  {
    id: "realtime",
    label: "Real-time chat and presence",
    detail: "Socket.IO, Firebase Realtime Database",
  },
  { id: "maps", label: "Maps and live location", detail: "Google Maps, live tracking, heat maps" },
  { id: "web3", label: "Web3 wallets and identity checks", detail: "Web3Auth, DIDIT KYC and KYB" },
  {
    id: "marketplace",
    label: "Multi-sided marketplaces",
    detail: "Buyer, seller, and provider flows in one app",
  },
];
