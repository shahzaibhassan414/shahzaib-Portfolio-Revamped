import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://www.shahzaib-dev.site/api/contact",
        "service-desc": [
          {
            href: "https://www.shahzaib-dev.site/openapi.json",
            type: "application/openapi+json",
          },
        ],
        "service-doc": [
          {
            href: "https://www.shahzaib-dev.site/index.md",
            type: "text/markdown",
          },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
