import Link from "next/link";
import { Logo } from "@/components/Logo";
import { footerNav, site } from "@/content/site";

const linkClass = "text-base no-underline transition-colors hover:text-accent";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={linkClass}>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-[88px] overflow-hidden border-t border-line bg-bg md:mt-[136px]">
      <div className="wrap-wide flex flex-wrap gap-x-16 gap-y-14 pt-14 md:pt-[72px]">
        <div className="flex max-w-[420px] flex-[1_1_340px] flex-col gap-5">
          <Logo variant="footer" />
          {/* The copy doc's footer line, split between the lockup above and this sentence. */}
          <p className="text-[17px] leading-[1.6] text-body">
            I build, fix, and maintain production iOS and Android apps.
          </p>
          {site.available && (
            <span className="flex items-center gap-2 self-start rounded-full border border-line px-3.5 py-2 text-sm font-semibold">
              <span className="size-2 rounded-full bg-live shadow-[0_0_0_4px_rgba(61,214,140,0.18)]" />
              {site.availabilityNote}
            </span>
          )}
          <div className="flex flex-col gap-1.5 text-[15px]">
            <a href={`mailto:${site.email}`} className="self-start underline underline-offset-2 transition-colors hover:text-accent">
              {site.email}
            </a>
            <span className="text-muted">Based in Pakistan, working remotely with teams worldwide.</span>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="grid flex-[2_1_560px] grid-cols-2 gap-8 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]"
        >
          {footerNav.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3.5">
              <p className="text-sm font-bold text-muted">{column.heading}</p>
              <ul className="flex flex-col gap-3.5 leading-[1.2]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mt-16 max-w-[1280px] bg-[linear-gradient(180deg,var(--surface-2)_0%,transparent_95%)] bg-clip-text px-5 text-[clamp(40px,11.4vw,168px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent select-none md:px-7"
      >
        {site.name}
      </div>

      <div className="border-t border-line">
        <div className="wrap-wide flex flex-wrap items-center justify-between gap-4 pt-[22px] pb-7 text-sm text-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <a
            href="#top"
            className="-my-3 flex min-h-11 items-center gap-2 font-semibold no-underline transition-colors hover:text-accent"
          >
            Back to top
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
