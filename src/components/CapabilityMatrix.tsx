import { capabilityRows, publishedProjects } from "@/content/projects";

/**
 * Capabilities by project, generated from each project's `capabilities`, so the table
 * can never claim something a project doesn't have.
 */
export function CapabilityMatrix() {
  const columns = publishedProjects.filter((p) => p.capabilities.length > 0);

  return (
    <div
      className="relative overflow-x-auto rounded-3xl border border-line bg-surface"
      role="region"
      aria-label="Capabilities by project"
      tabIndex={0}
    >
      <table className="w-full min-w-[860px] border-collapse text-base">
        <caption className="sr-only">Capabilities by project</caption>
        <thead>
          <tr>
            <th scope="col" className="border-b border-line px-7 py-[22px] text-left text-[15px] font-semibold text-muted">
              Capability
            </th>
            {columns.map((p) => (
              <th key={p.slug} scope="col" className="border-b border-line px-3 py-[22px] text-center text-[15px] font-bold">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {capabilityRows.map((row, r) => {
            const border = r < capabilityRows.length - 1 ? "border-b border-line" : "";
            return (
              <tr key={row.id}>
                <th scope="row" className={`px-7 py-5 text-left font-semibold ${border}`}>
                  {row.label}
                  <span className="mt-1 block text-sm font-normal text-muted">{row.detail}</span>
                </th>
                {columns.map((p) => {
                  const has = p.capabilities.includes(row.id);
                  return (
                    <td key={p.slug} className={`text-center ${border}`}>
                      <span
                        className={`inline-block rounded-full align-middle ${has ? "size-3.5 bg-accent" : "size-1.5 bg-dot-off"}`}
                        aria-hidden="true"
                      />
                      <span className="sr-only">{has ? "Yes" : "No"}</span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
