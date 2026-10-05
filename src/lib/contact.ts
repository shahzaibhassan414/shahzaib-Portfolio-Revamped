// Contact form fields and validation, shared by the form and POST /api/contact.
// Option wording is from docs/copy-and-seo.md section 11.

export const projectTypes = [
  { id: "build", label: "Build a new app" },
  { id: "rescue", label: "Rescue an existing app" },
  { id: "maintain", label: "Ongoing maintenance" },
  { id: "other", label: "Something else" },
] as const;

export const stages = ["Just an idea", "Designs ready", "In development", "Live on the stores"] as const;
export const timings = ["As soon as possible", "Within a month", "In 1 to 3 months", "Just exploring"] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];

export type ContactInput = {
  type: ProjectType;
  name: string;
  email: string;
  stage: (typeof stages)[number];
  timing: (typeof timings)[number];
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function isProjectType(value: unknown): value is ProjectType {
  return projectTypes.some((t) => t.id === value);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates raw input. Returns the cleaned values or a map of field errors. */
export function validateContact(raw: Record<string, unknown>):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors } {
  const str = (key: string) => (typeof raw[key] === "string" ? (raw[key] as string).trim() : "");
  const errors: ContactErrors = {};

  const type = str("type");
  const name = str("name");
  const email = str("email");
  const stage = str("stage");
  const timing = str("timing");
  const message = str("message");

  if (!isProjectType(type)) errors.type = "Choose what you need.";
  if (!name) errors.name = "Enter your name.";
  else if (name.length > 120) errors.name = "Keep your name under 120 characters.";
  if (!EMAIL.test(email) || email.length > 200) errors.email = "Enter a valid email address.";
  if (!stages.includes(stage as ContactInput["stage"])) errors.stage = "Choose where the app is now.";
  if (!timings.includes(timing as ContactInput["timing"])) errors.timing = "Choose when you want to start.";
  if (!message) errors.message = "Tell me a little about the project.";
  else if (message.length > 5000) errors.message = "Keep the message under 5,000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      type: type as ProjectType,
      name,
      email,
      stage: stage as ContactInput["stage"],
      timing: timing as ContactInput["timing"],
      message,
    },
  };
}
