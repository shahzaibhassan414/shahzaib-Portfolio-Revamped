"use client";

import { useEffect } from "react";

export function WebMcpProvider() {
  useEffect(() => {
    try {
      const mc =
        (typeof document !== "undefined" && (document as unknown as { modelContext?: { registerTool?: (tool: unknown) => Promise<unknown> } }).modelContext) ||
        (typeof navigator !== "undefined" && (navigator as unknown as { modelContext?: { registerTool?: (tool: unknown) => Promise<unknown> } }).modelContext);

      if (mc && typeof mc.registerTool === "function") {
        mc.registerTool({
          name: "submit_project_inquiry",
          description:
            "Submit a project inquiry or contact message to Senior Flutter Developer Shahzaib Hassan",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Sender name" },
              email: { type: "string", description: "Sender email" },
              message: { type: "string", description: "Project description or inquiry" },
              service: {
                type: "string",
                description: "Desired service: new-app, app-rescue, maintenance, or advisory",
              },
            },
            required: ["name", "email", "message"],
          },
          execute: async (args: unknown) => {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(args),
            });
            return await res.json();
          },
        }).catch(() => {});

        mc.registerTool({
          name: "get_portfolio_summary",
          description:
            "Get an overview of Shahzaib Hassan's Flutter experience, skills, and projects",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            const res = await fetch("/index.md");
            return await res.text();
          },
        }).catch(() => {});
      }
    } catch {
      // WebMCP is an optional browser API
    }
  }, []);

  return null;
}
