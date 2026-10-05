// Experience, from docs/copy-and-seo.md section 5. Used on the homepage and About page.

export type Role = {
  title: string;
  company: string;
  initials: string;
  dates: string;
  /** Year marker shown on the timeline before this role, if any. */
  year?: string;
  current?: boolean;
  minor?: boolean;
  summary?: string;
  highlights: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    title: "Flutter Intern",
    company: "Rex Technologies",
    initials: "RT",
    year: "2022",
    // TODO(shahzaib): confirm the internship months (Feb to May 2022 is assumed).
    dates: "Feb 2022 to May 2022",
    minor: true,
    summary:
      "Learned production Flutter on real client apps, alongside the team, before moving into a full developer role.",
    highlights: [],
    tags: [],
  },
  {
    title: "Flutter Developer",
    company: "Rex Technologies",
    initials: "RT",
    dates: "Jun 2022 to Jan 2024",
    highlights: [
      "Built and maintained production Flutter apps alongside the design team",
      "Fixed crash and rendering bottlenecks to keep the UI smooth at 60fps",
      "Built responsive, pixel-perfect components across iOS and Android",
      "Helped launch an app that passed 10,000 downloads",
    ],
    tags: ["Flutter", "Firebase", "Performance", "Pixel-perfect UI"],
  },
  {
    title: "Senior Flutter Developer",
    company: "Code Encoders",
    initials: "CE",
    year: "2024",
    dates: "Jan 2024 to now",
    current: true,
    highlights: [
      "Lead Flutter development on consumer and business apps, from design to App Store and Google Play release",
      "Built in-app subscriptions and paywalls with RevenueCat and native store billing",
      "Built live tracking, venue discovery, and location features with Google Maps and Places",
      "Implemented Apple, Google, and Web3Auth sign-in, plus DIDIT KYC and KYB verification flows",
      "Reduced app startup times and kept releases passing App Store review",
    ],
    tags: ["RevenueCat", "Google Maps", "Web3Auth", "DIDIT KYC"],
  },
];
