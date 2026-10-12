import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(
    {
      issuer: "https://www.shahzaib-dev.site",
      authorization_endpoint: "https://www.shahzaib-dev.site/contact",
      token_endpoint: "https://www.shahzaib-dev.site/api/contact",
      jwks_uri: "https://www.shahzaib-dev.site/.well-known/jwks.json",
      response_types_supported: ["token"],
      grant_types_supported: ["client_credentials", "anonymous"],
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
