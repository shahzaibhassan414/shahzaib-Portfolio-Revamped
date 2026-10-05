import { PhonePlus, Refresh, Wrench } from "@/components/icons";
import type { Service, ServiceType } from "@/content/services";

export const serviceIcons: Record<ServiceType, typeof PhonePlus> = {
  build: PhonePlus,
  rescue: Wrench,
  maintain: Refresh,
};

export function ServiceSteps({ service }: { service: Service }) {
  if (service.runTiles) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-3">
        {service.runTiles.map((t) => (
          <div key={t.title} className="flex flex-col gap-1 rounded-2xl bg-surface-2 p-[18px]">
            <span className="text-base font-bold">{t.title}</span>
            <span className="text-sm text-muted">{t.detail}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ol className="flex flex-col border-t border-line">
      {service.steps.map((step, i) => (
        <li key={step} className="grid grid-cols-[36px_1fr] gap-2.5 border-b border-line py-3.5 text-base text-body">
          <span className="font-bold text-accent">{i + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
