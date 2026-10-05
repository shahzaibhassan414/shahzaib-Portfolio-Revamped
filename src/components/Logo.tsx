import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type LogoProps = {
  /** "header": 36px mark and name. "footer": 48px mark, name, and role. */
  variant?: "header" | "footer";
  onNavigate?: () => void;
};

export function Logo({ variant = "header", onNavigate }: LogoProps) {
  const isFooter = variant === "footer";
  const size = isFooter ? 48 : 36;

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onClick={onNavigate}
      className={`flex items-center no-underline ${isFooter ? "gap-3.5" : "gap-3"}`}
    >
      <Image src="/brand/logo-mark.svg" alt="" width={size} height={size} priority={!isFooter} />
      {isFooter ? (
        <span className="flex flex-col gap-0.5">
          <span className="text-xl font-extrabold tracking-[-0.01em]">{site.name}</span>
          <span className="text-sm text-muted">Senior Flutter developer</span>
        </span>
      ) : (
        <span className="text-lg font-bold tracking-[-0.01em]">{site.name}</span>
      )}
    </Link>
  );
}
