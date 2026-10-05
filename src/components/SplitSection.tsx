import type { ReactNode } from "react";

/** Two-column long-form section: heading on the left, prose on the right. */
export function SplitSection({ title, id, children }: { title?: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="flex flex-wrap gap-x-16 gap-y-6">
      {title ? (
        <h2 className="flex-[0_1_280px] text-[26px] leading-[1.2] font-extrabold tracking-[-0.02em]">{title}</h2>
      ) : (
        <div className="hidden flex-[0_1_280px] md:block" />
      )}
      <div className="flex max-w-[720px] min-w-0 flex-[1_1_560px] flex-col gap-[18px] text-lg leading-[1.65] text-body md:text-[19px]">
        {children}
      </div>
    </section>
  );
}
