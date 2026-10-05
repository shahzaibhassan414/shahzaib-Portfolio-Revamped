import { ViewTransition, type ReactNode } from "react";

/**
 * Marks a project's visual panel so it morphs into the case-study header on navigation.
 * Browsers without the View Transitions API simply navigate without the morph.
 */
export function ProjectMorph({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`project-panel-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
