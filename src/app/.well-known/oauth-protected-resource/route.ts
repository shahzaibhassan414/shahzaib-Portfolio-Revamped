import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      resource: "https://www.shahzaib-dev.site",
      authorization_servers: ["https://www.shahzaib-dev.site"],
      scopes_supported: ["public", "contact:send", "portfolio:read"],
      bearer_methods_supported: ["header"],
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
