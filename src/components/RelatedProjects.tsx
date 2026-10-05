import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { getProject } from "@/content/projects";

/** Compact cards linking to case studies, used on service pages. */
export function RelatedProjects({ slugs }: { slugs: string[] }) {
  const projects = slugs.map(getProject).filter((p) => p !== undefined);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className="group flex flex-col gap-3 rounded-3xl border border-line bg-surface p-5 no-underline transition-colors hover:border-line-strong"
        >
          <span className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 flex-none items-center justify-center rounded-xl text-[15px] font-extrabold text-white"
              style={{ background: p.color }}
            >
              {p.initials}
            </span>
            <span className="flex-1 text-xl font-bold text-text">{p.name}</span>
            <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-accent" />
          </span>
          <span className="text-base leading-normal text-body">{p.cardLine}</span>
        </Link>
      ))}
    </div>
  );
}
