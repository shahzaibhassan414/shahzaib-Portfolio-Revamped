"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Spinner } from "@/components/icons";
import { site } from "@/content/site";
import { isProjectType, projectTypes, stages, timings, type ContactErrors, type ProjectType } from "@/lib/contact";

type Status = { state: "idle" | "sending" } | { state: "sent"; email: string } | { state: "error" };

const field =
  "w-full rounded-xl border border-btn2-line bg-field px-4 text-base text-text placeholder:text-[#7D8594] aria-[invalid=true]:border-[#F2879F] focus-visible:outline-offset-2";

/** Reads ?type= (and the no-JS ?status=) from the URL, then renders the form. */
export function ContactFormWithParams() {
  const params = useSearchParams();
  const type = params.get("type");
  const status = params.get("status");
  return (
    <ContactForm
      initialType={isProjectType(type) ? type : "build"}
      initialStatus={
        status === "sent"
          ? { state: "sent", email: params.get("email") ?? "" }
          : status === "error"
            ? { state: "error" }
            : { state: "idle" }
      }
    />
  );
}

export function ContactForm({
  initialType = "build",
  initialStatus = { state: "idle" },
}: {
  initialType?: ProjectType;
  initialStatus?: Status;
}) {
  const [type, setType] = useState<ProjectType>(initialType);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [errors, setErrors] = useState<ContactErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ state: "sent", email: String(data.email ?? "") });
        return;
      }
      if (res.status === 400 && body.fields) {
        setErrors(body.fields);
        setStatus({ state: "idle" });
        return;
      }
      setStatus({ state: "error" });
    } catch {
      setStatus({ state: "error" });
    }
  }

  const clearError = (name: keyof ContactErrors) => {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status.state === "error") setStatus({ state: "idle" });
  };

  const describe = (name: keyof ContactErrors) => (errors[name] ? `${name}-error` : undefined);
  const errorText = (name: keyof ContactErrors) =>
    errors[name] ? (
      <span id={`${name}-error`} className="text-sm text-[#F2879F]">
        {errors[name]}
      </span>
    ) : null;

  const box = "flex min-w-0 flex-[1_1_480px] flex-col gap-[26px] rounded-[28px] border border-line bg-surface p-6 md:rounded-[32px] md:p-10";

  if (status.state === "sent") {
    return (
      <div className={box} role="status">
        <h2 className="text-[28px] leading-[1.15] font-extrabold tracking-[-0.02em]">Message sent.</h2>
        <p className="text-lg leading-[1.6] text-body">
          I&apos;ll reply to {status.email ? <strong className="text-text">{status.email}</strong> : "you"} within a day. If
          it&apos;s urgent,{" "}
          <a href={`https://wa.me/${site.whatsapp}`} className="font-semibold text-accent underline underline-offset-2">
            WhatsApp
          </a>{" "}
          is the fastest way to reach me.
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={onSubmit}
      noValidate
      className={box}
      aria-label="Contact form"
      aria-busy={status.state === "sending"}
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-[15px] font-bold">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t) => {
            const pressed = type === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setType(t.id)}
                className={`min-h-11 rounded-full border px-[18px] py-3 text-[15px] transition-colors ${
                  pressed
                    ? "border-accent bg-accent font-bold text-on-accent"
                    : "border-btn2-line font-medium hover:border-text"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="type" value={type} />
      </fieldset>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className="text-[15px] font-semibold">
            Your name
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Alex Johnson"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describe("name")}
            onInput={() => clearError("name")}
            className={`${field} h-[52px]`}
          />
          {errorText("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className="text-[15px] font-semibold">
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="alex@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describe("email")}
            onInput={() => clearError("email")}
            className={`${field} h-[52px]`}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
        <Select id="c-stage" name="stage" label="Where is the app now?" options={stages} />
        <Select id="c-time" name="timing" label="When do you want to start?" options={timings} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-msg" className="text-[15px] font-semibold">
          Tell me about the project
        </label>
        <textarea
          id="c-msg"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="What the app does, what's working, and what's in the way."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe("message")}
          onInput={() => clearError("message")}
          className={`${field} resize-y py-3.5 leading-normal`}
        />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F2879F]/40 bg-[#F2879F]/10 px-4 py-3 text-base leading-normal"
        >
          <p className="flex-1">
            Your message didn&apos;t send. Email me directly at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-accent underline underline-offset-2">
              {site.email}
            </a>{" "}
            or try submitting again.
          </p>
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className="rounded-lg border border-[#F2879F]/50 px-3 py-1 text-sm font-semibold text-text transition-colors hover:bg-[#F2879F]/20"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-muted">Your details are only used to reply to you.</span>
        <button
          type="submit"
          data-magnetic
          disabled={status.state === "sending"}
          className="flex min-h-11 items-center gap-2.5 rounded-[14px] bg-accent px-[26px] py-4 text-[17px] font-bold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {status.state === "sending" ? (
            <>
              <Spinner size={18} className="text-on-accent" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <ArrowRight size={18} strokeWidth={2.2} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Select({
  id,
  name,
  label,
  options,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </label>
      <span className="relative block">
        <select id={id} name={name} className={`${field} h-[52px] cursor-pointer appearance-none pr-12`}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
        />
      </span>
    </div>
  );
}
