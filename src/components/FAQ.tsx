import type { FaqItem } from "@/content/services";

/**
 * Native details/summary accordion. The first item starts open, as in the design.
 * Opening and closing ease smoothly (CSS: .faq in globals.css, where supported), the
 * plus turns into a minus, and the items rise in on scroll (data-tile, see TileMotion).
 */
export function FAQ({ items, firstOpen = true }: { items: FaqItem[]; firstOpen?: boolean }) {
  return (
    <div className="faq flex flex-col border-t border-line">
      {items.map((item, i) => (
        <details key={item.q} open={firstOpen && i === 0} data-tile className="group border-b border-line">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-[22px] text-lg font-bold transition-colors duration-200 hover:text-accent md:text-[19px] [&::-webkit-details-marker]:hidden">
            {item.q}
            {/* A plus whose vertical bar turns flat when open, making a minus. */}
            <span aria-hidden="true" className="faq-icon relative mt-1.5 size-4 flex-none text-muted">
              <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
              <span className="faq-icon-v absolute top-0 left-1/2 h-4 w-0.5 -translate-x-1/2 rounded-full bg-current" />
            </span>
          </summary>
          {/* Wrapped so the answer's negative top margin stays inside the animated box (on the
              box itself it made the item dip 10px shorter while closing). */}
          <div className="faq-answer flow-root">
            <p className="-mt-2.5 pb-[22px] text-[17px] leading-[1.6] text-body">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
