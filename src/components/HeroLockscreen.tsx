import { ArrowUp } from "@/components/icons";
import { LockscreenClock } from "@/components/LockscreenClock";
import { CLOCK_DATE_ID, CLOCK_TIME_ID, clockInlineScript } from "@/lib/clock";
import { onWhiteText } from "@/lib/color";

type Notification = {
  app: string;
  time: string;
  title: string;
  body: string;
  icon: { bg: string; initials?: string };
};

// From design/home.html. Each one comes from an app Shahzaib built and shipped.
const notifications: Notification[] = [
  {
    app: "App Store Connect",
    time: "now",
    title: "Version 2.4.0 is ready for sale",
    body: "Your update is live on the App Store.",
    icon: { bg: "#1D1F24" },
  },
  {
    app: "Paw Play Love",
    time: "2m ago",
    title: "Premium renewed",
    body: "Your yearly plan is active for another 12 months.",
    icon: { bg: "#E46A2E", initials: "PL" },
  },
  {
    app: "LawnOlu",
    time: "6m ago",
    title: "Your provider is 4 min away",
    body: "Track the job live on the map.",
    icon: { bg: "#2E9A55", initials: "LO" },
  },
  {
    app: "BePay",
    time: "18m ago",
    title: "Identity verified",
    body: "Your wallet is ready. You can start paying.",
    icon: { bg: "#5B49D6", initials: "BP" },
  },
  {
    app: "On Scene",
    time: "1h ago",
    title: "3 people checked in nearby",
    body: "The venue on Main Street is busy tonight.",
    icon: { bg: "#D93A63", initials: "OS" },
  },
];

/**
 * The hero phone. The clock shows the visitor's own date and time and fades up; then the
 * notifications rise in one by one, 0.6s apart, from the bottom (oldest) to the top
 * (newest). Pure CSS animation; with reduced motion, the final state shows immediately.
 */
export function HeroLockscreen({ caption }: { caption: string }) {
  return (
    <figure className="flex flex-[1_1_340px] flex-col items-center gap-5">
      <div
        className="aspect-[340/690] w-full max-w-[340px] rounded-[54px] bg-[#0B0E13] p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7),0_0_0_1px_var(--phone-rim)]"
        role="img"
        aria-label="Phone lock screen with notifications from On Scene, BePay, LawnOlu, Paw Play Love, and App Store Connect"
      >
        <div className="flex h-full flex-col gap-2.5 overflow-hidden rounded-[43px] bg-[radial-gradient(120%_70%_at_20%_0%,#3A5BD9_0%,#1B2547_45%,#0E1220_100%)] px-3.5 pt-16 pb-5 max-[400px]:pt-12">
          <div className="lockscreen-clock mb-[22px] flex flex-col items-center gap-0.5 text-white">
            {/* The design's 9:41 is only a no-JS fallback: the script below swaps in the real time
                before the first paint, so React is told the text will differ on hydration. */}
            <span id={CLOCK_DATE_ID} className="text-[15px] font-medium opacity-85" suppressHydrationWarning>
              Monday, October 5
            </span>
            <span
              id={CLOCK_TIME_ID}
              className="text-[76px] leading-none font-semibold tracking-[-0.03em] tabular-nums max-[400px]:text-[64px]"
              suppressHydrationWarning
            >
              9:41
            </span>
            <script dangerouslySetInnerHTML={{ __html: clockInlineScript }} />
            <LockscreenClock />
          </div>
          {notifications.map((n, i) => (
            <div
              key={n.app}
              className="lockscreen-notif flex gap-2.5 rounded-[20px] bg-[rgba(245,247,250,0.86)] p-3"
              // Bottom card first, then upward: oldest to newest.
              style={{ animationDelay: `${0.5 + (notifications.length - 1 - i) * 0.6}s` }}
            >
              <span
                className="flex size-[34px] flex-none items-center justify-center rounded-[9px] text-[13px] font-extrabold text-white"
                style={{ background: onWhiteText(n.icon.bg) }}
              >
                {n.icon.initials ?? <ArrowUp size={18} />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-[13px] leading-[1.3] text-[#12151B]">
                <span className="flex justify-between gap-2 font-semibold">
                  <span className="truncate">{n.app}</span>
                  <span className="flex-none font-normal text-[#5A616C]">{n.time}</span>
                </span>
                <span className="font-semibold">{n.title}</span>
                <span className="text-[#3E4450]">{n.body}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="max-w-[300px] text-center text-sm leading-[1.45] text-muted">{caption}</figcaption>
    </figure>
  );
}
