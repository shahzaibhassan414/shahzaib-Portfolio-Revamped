import { projectTypes, validateContact } from "@/lib/contact";

// POST /api/contact
// Accepts JSON (from the form's fetch) or form-encoded data (no-JS fallback).
// Sends the enquiry with Resend's HTTP API when RESEND_API_KEY and CONTACT_TO_EMAIL are set.

const HONEYPOT = "website";

function wantsRedirect(request: Request) {
  return !request.headers.get("content-type")?.includes("application/json");
}

function respond(request: Request, status: number, body: Record<string, unknown>) {
  if (wantsRedirect(request)) {
    // No-JS submit: send the visitor back to the contact page with the result in the URL.
    const url = new URL("/contact", request.url);
    url.searchParams.set("status", status === 200 ? "sent" : "error");
    if (status === 200 && typeof body.email === "string") url.searchParams.set("email", body.email);
    return Response.redirect(url, 303);
  }
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = wantsRedirect(request)
      ? Object.fromEntries(await request.formData())
      : await request.json();
  } catch {
    return respond(request, 400, { error: "invalid_body" });
  }

  // Bots fill every field; people never see this one. Pretend it worked.
  if (typeof raw[HONEYPOT] === "string" && raw[HONEYPOT]) {
    return respond(request, 200, { ok: true });
  }

  const result = validateContact(raw);
  if (!result.ok) {
    return respond(request, 400, { error: "invalid", fields: result.errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return respond(request, 503, { error: "not_configured" });
  }

  const { type, name, email, stage, timing, message } = result.data;
  const typeLabel = projectTypes.find((t) => t.id === type)?.label ?? type;
  const text = [
    `What they need: ${typeLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Where the app is now: ${stage}`,
    `When they want to start: ${timing}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact form <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New enquiry: ${typeLabel}, from ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return respond(request, 502, { error: "send_failed" });
    }
  } catch (error) {
    console.error("Resend request failed", error);
    return respond(request, 502, { error: "send_failed" });
  }

  return respond(request, 200, { ok: true, email });
}
