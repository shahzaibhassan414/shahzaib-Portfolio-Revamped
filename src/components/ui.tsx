import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "cta" | "cta-secondary";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:opacity-90",
  secondary: "border border-btn2-line bg-surface hover:text-accent",
  cta: "bg-cta-btn text-cta-on-btn hover:opacity-90",
  "cta-secondary": "border border-cta-btn2-line text-cta-text hover:opacity-75",
};

// Outlined variants lose 1px of padding to the border so both kinds are the same size.
const sizeStyles = {
  md: { solid: "rounded-[14px] px-6 py-4 text-[17px]", outline: "rounded-[14px] px-[23px] py-[15px] text-[17px]" },
  sm: { solid: "rounded-[14px] px-5 py-3.5 text-base", outline: "rounded-[14px] px-[19px] py-[13px] text-base" },
};

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
};

/** Large rounded button link. Internal paths use next/link. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const outline = variant === "secondary" || variant === "cta-secondary";
  const classes = `inline-flex items-center justify-center font-semibold no-underline transition-[opacity,color] ${
    sizeStyles[size][outline ? "outline" : "solid"]
  } ${buttonStyles[variant]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

/** Small accent text link, as used under sections and cards. */
export function TextLink({ href, className = "", children }: { href: string; className?: string; children: ReactNode }) {
  const classes = `self-start font-semibold text-accent underline underline-offset-2 hover:no-underline ${className}`;
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function Chip({ children, size = "md" }: { children: ReactNode; size?: "sm" | "md" }) {
  return (
    <span
      className={`rounded-full border border-line bg-surface-2 ${
        size === "sm" ? "px-3 py-[7px] text-sm" : "px-3.5 py-2 text-[15px]"
      }`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`text-[clamp(34px,4.4vw,48px)] leading-[1.05] font-extrabold tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}
