export type ProcessStep = { title: string; body: string };

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-8">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col gap-3 border-t-2 border-text pt-5">
          <span className="text-[15px] font-bold text-accent">{i + 1}</span>
          <h3 className="text-xl font-bold">{step.title}</h3>
          <p className="text-base leading-[1.55] text-body">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
