import Image from "next/image";
import type { CSSProperties } from "react";
import { ScreenImage } from "@/components/ScreenImage";
import type { Project, Screen } from "@/content/projects";

type Tint = Pick<Project["tint"], "screen" | "screenText">;

/** Tinted stand-in shown wherever a real screenshot is missing. */
export function ScreenPlaceholder({ label, tint }: { label: string; tint: Tint }) {
  return (
    <span
      className="flex h-full w-full items-center justify-center p-3.5 text-center text-[13px] leading-[1.4]"
      style={{ background: tint.screen, color: tint.screenText }}
    >
      [{label}]
    </span>
  );
}

type PhoneFrameProps = {
  screen: Screen;
  tint: Tint;
  /** Width in px; height follows the 210:440 phone ratio. */
  width?: number;
  sizes?: string;
  /** Load straight away (frames visible on arrival). Others wait until they're near the viewport. */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** A dark phone bezel holding a screenshot, or a placeholder when there isn't one yet. */
export function PhoneFrame({ screen, tint, width = 210, sizes, eager, className = "", style }: PhoneFrameProps) {
  const pad = Math.round(width * 0.038);
  const outer = Math.round(width * 0.162);
  return (
    <span
      className={`flex flex-none bg-[#0B0E13] ${className}`}
      style={{
        width,
        aspectRatio: "210 / 440",
        padding: pad,
        borderRadius: Math.max(34, outer),
        ...style,
      }}
    >
      <span
        className="relative flex flex-1 overflow-hidden"
        style={{ borderRadius: Math.max(34, outer) - pad, background: tint.screen }}
      >
        {screen.src && eager ? (
          <Image src={screen.src} alt={screen.alt} fill sizes={sizes ?? `${width}px`} className="object-cover" />
        ) : screen.src ? (
          <ScreenImage src={screen.src} alt={screen.alt} sizes={sizes ?? `${width}px`} />
        ) : (
          <ScreenPlaceholder label={screen.label} tint={tint} />
        )}
      </span>
    </span>
  );
}
