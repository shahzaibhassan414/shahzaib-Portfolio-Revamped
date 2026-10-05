// Illustrations for the two Notion playbooks, shared by the homepage and /blog.

export function HeatMapVisual() {
  return (
    <span className="block h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,98,64,0.9)_0,rgba(255,170,64,0.55)_14%,transparent_30%),radial-gradient(circle_at_68%_62%,rgba(255,120,64,0.8)_0,rgba(255,200,80,0.4)_12%,transparent_26%),radial-gradient(circle_at_80%_22%,rgba(255,200,80,0.55)_0,transparent_16%),repeating-linear-gradient(0deg,transparent_0_23px,rgba(255,255,255,0.05)_23px_24px),repeating-linear-gradient(90deg,transparent_0_23px,rgba(255,255,255,0.05)_23px_24px)] bg-[#1A2433]" />
  );
}

export function SvgToWidgetVisual() {
  return (
    <span className="flex h-full items-center justify-center gap-3.5 bg-[#1A2433] font-mono text-[15px]">
      <span className="rounded-[10px] border border-dashed border-[#4A5568] px-3 py-2.5 text-[#F5A27A]">&lt;svg/&gt;</span>
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="#7B98FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 8h22" />
        <path d="m18 2 6 6-6 6" />
      </svg>
      <span className="rounded-[10px] bg-[rgba(123,152,255,0.16)] px-3 py-2.5 text-[#A9BBFF]">Widget()</span>
    </span>
  );
}
