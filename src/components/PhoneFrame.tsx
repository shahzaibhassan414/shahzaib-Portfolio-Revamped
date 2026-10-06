import Image from "next/image";
import type { CSSProperties } from "react";
import { ScreenImage } from "@/components/ScreenImage";
import type { Project, Screen } from "@/content/projects";

type Tint = Pick<Project["tint"], "screen" | "screenText">;

/**
 * Shown wherever a real screenshot is missing: an abstract app screen in the project's
 * colours, titled with the screen's name. Sized in % and cqw so it scales with the frame.
 */
export function ScreenPlaceholder({ label, tint }: { label: string; tint: Tint }) {
  const ink = tint.screenText;
  const row = (w: string, o: number) => (
    <span className="block rounded-full" style={{ width: w, height: "3.2cqw", background: ink, opacity: o }} />
  );
  return (
    <span className="block h-full w-full [container-type:inline-size]" style={{ background: tint.screen, color: ink }}>
      <span className="flex h-full w-full flex-col gap-[5cqw] px-[8cqw] pt-[24cqw]">
        <span className="text-[8.5cqw] font-extrabold leading-[1.1] tracking-[-0.02em]">{label}</span>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="flex items-center gap-[5cqw] rounded-[6cqw] p-[5cqw]"
            style={{ background: "rgba(255,255,255,0.6)", opacity: 1 - i * 0.18 }}
          >
            <span className="size-[14cqw] flex-none rounded-full" style={{ background: ink, opacity: 0.22 }} />
            <span className="flex flex-1 flex-col gap-[3cqw]">
              {row("70%", 0.35)}
              {row("45%", 0.18)}
            </span>
          </span>
        ))}
      </span>
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

/**
 * A phone: thin metallic rim, black bezel, side buttons and a glass sheen around the
 * screenshot (or a placeholder when there isn't one yet). Everything scales with `width`,
 * so small frames keep phone proportions instead of turning into pills.
 */
export function PhoneFrame({ screen, tint, width = 210, sizes, eager, className = "", style }: PhoneFrameProps) {
  const rim = Math.max(1.5, width * 0.009);
  const bezel = Math.max(3, Math.round(width * 0.034));
  const radius = Math.round(width * 0.17);
  const button = Math.max(2, Math.round(width * 0.013));
  // Side buttons, as [side, top %, height %]: action and volume on the left, power on the right.
  const buttons: ["left" | "right", number, number][] = [
    ["left", 17, 4.5],
    ["left", 25, 8.5],
    ["left", 35.5, 8.5],
    ["right", 27, 13],
  ];
  return (
    <span
      className={`relative flex flex-none ${className}`}
      style={{ width, aspectRatio: "210 / 440", padding: rim, borderRadius: radius, background: "linear-gradient(150deg, #4a515d 0%, #1c2028 22%, #12151b 50%, #1c2028 78%, #4a515d 100%)", ...style }}
    >
      {buttons.map(([side, top, height], i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-sm bg-[linear-gradient(90deg,#3a4150,#1a1e26)]"
          style={{
            [side]: -button + 0.5,
            top: `${top}%`,
            height: `${height}%`,
            width: button,
          }}
        />
      ))}
      <span className="flex flex-1 bg-[#07090c]" style={{ padding: bezel, borderRadius: radius - rim }}>
        <span
          className="relative flex flex-1 overflow-hidden"
          style={{ borderRadius: radius - rim - bezel, background: tint.screen }}
        >
          {screen.src && eager ? (
            <Image src={screen.src} alt={screen.alt} fill sizes={sizes ?? `${width}px`} className="object-cover" />
          ) : screen.src ? (
            <ScreenImage src={screen.src} alt={screen.alt} sizes={sizes ?? `${width}px`} />
          ) : (
            <>
              <ScreenPlaceholder label={screen.label} tint={tint} />
              {/* Placeholders get a Dynamic Island; real screenshots already include their own. */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#07090c]"
                style={{ top: width * 0.04, width: width * 0.3, height: width * 0.085 }}
              />
            </>
          )}
          {/* Glass sheen */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_28%,transparent_45%)]"
          />
        </span>
      </span>
    </span>
  );
}
