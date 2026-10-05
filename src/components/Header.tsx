"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { GooeyNav } from "@/components/GooeyNav";
import { Logo } from "@/components/Logo";
import { nav, primaryCta, site } from "@/content/site";

const COMPACT_AFTER = 40;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const compact = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > COMPACT_AFTER,
    () => false,
  );
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => menuRef.current?.close();

  // Close the sheet if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia("(width >= 64rem)");
    const onChange = () => {
      if (desktop.matches) menuRef.current?.close();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // The Work page runs wider than the rest of the site.
  const container = pathname === "/work" ? "wrap-wide" : "wrap";

  return (
    <header className="pointer-events-none sticky top-0 z-50 h-(--header-h)">
      {/* Background fades in and the bar tightens once the page scrolls. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-line bg-bg/80 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-spring motion-reduce:transition-none ${
          compact ? "-translate-y-3 opacity-100 md:-translate-y-4" : "opacity-0"
        }`}
      />
      <div
        className={`${container} relative flex h-full items-center justify-between gap-4 transition-transform duration-300 ease-spring motion-reduce:transition-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto ${
          compact ? "-translate-y-1.5 md:-translate-y-2" : ""
        }`}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          <GooeyNav items={nav} isCurrent={(href) => isCurrent(pathname, href)} />
          <Link
            href={primaryCta.href}
            aria-current={isCurrent(pathname, primaryCta.href) ? "page" : undefined}
            data-magnetic
            className="ml-2 rounded-xl bg-btn px-[18px] py-3 text-[15px] font-semibold text-on-btn no-underline transition-opacity hover:opacity-90"
          >
            {primaryCta.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-haspopup="dialog"
          aria-controls="menu-sheet"
          onClick={() => menuRef.current?.showModal()}
          className="-mr-2.5 flex size-11 items-center justify-center rounded-xl text-text lg:hidden"
        >
          <span className="sr-only">Open menu</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <dialog
        id="menu-sheet"
        ref={menuRef}
        aria-label="Menu"
        className="menu-sheet pointer-events-auto fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-text lg:hidden"
      >
        <div className="wrap flex min-h-full flex-col">
          <div className="flex h-(--header-h) shrink-0 items-center justify-between gap-4">
            <Logo onNavigate={closeMenu} />
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2.5 flex size-11 items-center justify-center rounded-xl"
            >
              <span className="sr-only">Close menu</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Main" className="mt-6 flex flex-col">
            {nav.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={current ? "page" : undefined}
                  className={`border-b border-line py-4 text-[32px] leading-tight font-extrabold tracking-[-0.03em] no-underline ${
                    current ? "text-accent" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-10 pb-8">
            <Link
              href={primaryCta.href}
              onClick={closeMenu}
              aria-current={isCurrent(pathname, primaryCta.href) ? "page" : undefined}
              className="rounded-[14px] bg-accent px-6 py-4 text-center text-[17px] font-semibold text-on-accent no-underline"
            >
              {primaryCta.label}
            </Link>
            <a href={`mailto:${site.email}`} className="text-center text-[15px] text-muted">
              {site.email}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
