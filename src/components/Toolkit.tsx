import type { ComponentType, ReactNode } from "react";
import { Package, PhonePlus, Refresh, Send } from "@/components/icons";
import { ToolMarquee } from "@/components/ToolMarquee";

type Group = { group: string; items: string[] };
type IconProps = { size?: number; strokeWidth?: number; className?: string };

// Per-group icon and colour (project palette; green stays reserved for "available").
const look: Record<string, { icon: ComponentType<IconProps>; color: string }> = {
  Core: { icon: PhonePlus, color: "#7B98FF" },
  "Data and real-time": { icon: Refresh, color: "#2FB3A6" },
  Integrations: { icon: Package, color: "#9A8BFF" },
  Shipping: { icon: Send, color: "#F0894E" },
};

/** About page toolkit: a scroll-reactive marquee of every tool, then a card per group. */
export function Toolkit({ groups, heading }: { groups: Group[]; heading: ReactNode }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="wrap">{heading}</div>
      <ToolMarquee items={groups.flatMap((g) => g.items)} />
      <div className="wrap grid gap-5 md:grid-cols-2">
        {groups.map((g) => {
          const { icon: Icon, color } = look[g.group] ?? { icon: Package, color: "#7B98FF" };
          return (
            <div
              key={g.group}
              data-tile
              data-glow
              className="tile glow-card group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-6 md:p-8"
            >
              {/* A soft wash of the group colour in the corner. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(closest-side, color-mix(in srgb, ${color} 22%, transparent), transparent)`,
                }}
              />
              <div className="relative z-[2] flex items-center gap-4">
                <span
                  className="flex size-12 flex-none items-center justify-center rounded-2xl"
                  style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
                >
                  <Icon size={22} />
                </span>
                <h3 className="flex-1 text-xl font-bold">{g.group}</h3>
                <span className="rounded-full border border-line px-3 py-1 text-[13px] font-semibold text-muted">
                  {g.items.length} tools
                </span>
              </div>
              <div data-about="chips" className="relative z-[2] flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface-2 px-3.5 py-2 text-[15px] transition-[border-color,color,translate] duration-300 ease-spring hover:-translate-y-0.5 hover:border-accent hover:text-accent motion-reduce:transition-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
