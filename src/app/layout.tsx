import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AmbientBackground } from "@/components/AmbientBackground";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MagneticButtons } from "@/components/MagneticButtons";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TextReveal } from "@/components/TextReveal";
import { site } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = localFont({
  src: "../fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "400 800",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  weight: "400 500",
  display: "swap",
  // Small labels only: don't let it compete with the main font for early bandwidth.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.role} for iOS and Android | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: `${site.url}/about` }],
  creator: site.name,
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#151A23",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) add attributes to <body>. */}
      <body id="top" className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[60] rounded-xl bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
        <MagneticButtons />
        <CursorSpotlight />
        <TextReveal />
      </body>
    </html>
  );
}
