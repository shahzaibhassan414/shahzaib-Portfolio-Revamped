import { ScrollSelect } from "@/components/ScrollSelect";

export type ProcessStep = { title: string; body: string };

/** "How a project runs": numbered boxes, selected one by one while scrolling (ScrollSelect). */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ScrollSelect as="ol" className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 md:gap-5">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-step
          className="relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 md:p-6"
        >
          <span
            data-step-badge
            className="flex size-9 items-center justify-center rounded-full bg-surface-2 text-[15px] font-bold text-accent"
          >
            {i + 1}
          </span>
          <h3 className="text-xl font-bold">{step.title}</h3>
          <p className="text-base leading-[1.55] text-body">{step.body}</p>
        </li>
      ))}
    </ScrollSelect>
  );
}
