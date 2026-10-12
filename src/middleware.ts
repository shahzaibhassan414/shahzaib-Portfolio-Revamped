import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    url.pathname = "/index.md";
    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Type", "text/markdown; charset=utf-8");
    response.headers.set("Vary", "Accept");
    response.headers.set("x-markdown-tokens", "650");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/"],
};
