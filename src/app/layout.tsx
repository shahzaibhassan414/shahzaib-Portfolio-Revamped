import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
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
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.role} for iOS and Android | ${site.name}`,
  description: site.description,
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
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
