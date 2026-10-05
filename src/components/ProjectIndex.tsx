import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { filterId, type Project } from "@/content/projects";

const cols = "grid-cols-[36px_1fr_24px] md:grid-cols-[60px_1.3fr_1.3fr_1.8fr_48px]";

/** "Every project" list on the Work page. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col border-t border-line">
      <div className={`hidden gap-5 border-b border-line px-4 py-3.5 text-sm text-muted md:grid ${cols}`} aria-hidden="true">
        <span>No.</span>
        <span>Project</span>
        <span>Type</span>
        <span>Built with</span>
        <span />
      </div>
      <ul>
        {projects.map((p, i) => (
          <li key={p.slug} data-cat={filterId(p)}>
            <Link
              href={`/work/${p.slug}`}
              className={`group grid items-center gap-x-5 gap-y-1 rounded-xl border-b border-line px-2 py-5 no-underline transition-colors hover:bg-surface md:px-4 md:py-[22px] ${cols}`}
            >
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex items-center gap-3 text-xl font-bold md:text-[22px]">
                <span aria-hidden="true" className="size-3 flex-none rounded" style={{ background: p.color }} />
                {p.name}
                <span className="sr-only">, {p.type}</span>
              </span>
              <span aria-hidden="true" className="hidden text-base text-body md:block">
                {p.type}
              </span>
              <span className="hidden text-[15px] text-muted md:block">
                {p.tags.filter((t) => t !== "Flutter").join(", ")}
              </span>
              <ArrowUpRight size={20} className="justify-self-end text-muted transition-colors group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
