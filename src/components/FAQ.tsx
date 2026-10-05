import type { FaqItem } from "@/content/services";

/** Native details/summary accordion. The first item starts open, as in the design. */
export function FAQ({ items, firstOpen = true }: { items: FaqItem[]; firstOpen?: boolean }) {
  return (
    <div className="flex flex-col border-t border-line">
      {items.map((item, i) => (
        <details key={item.q} open={firstOpen && i === 0} className="group border-b border-line">
          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-[22px] text-lg font-bold md:text-[19px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="flex-none text-muted">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">–</span>
            </span>
          </summary>
          <p className="-mt-2.5 pb-[22px] text-[17px] leading-[1.6] text-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
