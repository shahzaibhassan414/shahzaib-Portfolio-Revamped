import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Shared Open Graph image: the page title on the dark theme, set in Schibsted Grotesk.
// next/og can't read woff2 or variable fonts, so src/fonts/og holds static TTF instances
// (500 and 800) cut from the same self-hosted file.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Literal, folder-scoped paths so the server bundle only traces these three files.
let assets: Promise<[Buffer, Buffer, string]> | undefined;
function loadAssets() {
  assets ??= Promise.all([
    readFile(join(process.cwd(), "src/fonts/og", "schibsted-grotesk-500.ttf")),
    readFile(join(process.cwd(), "src/fonts/og", "schibsted-grotesk-800.ttf")),
    readFile(join(process.cwd(), "public/brand", "logo-mark.svg")).then(
      (svg) => `data:image/svg+xml;base64,${svg.toString("base64")}`,
    ),
  ]);
  return assets;
}

type OgImage = {
  title: string;
  /** Small label above the title, e.g. "Case study". */
  eyebrow?: string;
  /** Glow colour in the corner; a project's colour on case studies. */
  color?: string;
};

export async function ogImage({ title, eyebrow, color = "#7B98FF" }: OgImage) {
  const [medium, bold, logo] = await loadAssets();
  const titleSize = title.length <= 36 ? 84 : title.length <= 64 ? 68 : 58;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(circle at 100% 0%, ${color}55 0%, ${color}00 55%), #151A23`,
          color: "#ECEFF4",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={logo} width={64} height={64} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.01em" }}>{site.name}</span>
            <span style={{ fontSize: 22, fontWeight: 500, color: "#A3ABB8" }}>{site.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1020 }}>
          {eyebrow && (
            <span style={{ fontSize: 28, fontWeight: 500, color: "#7B98FF" }}>{eyebrow}</span>
          )}
          <span
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24 }}>
          <span style={{ fontWeight: 500, color: "#A3ABB8" }}>shahzaib-dev.site</span>
          <span style={{ display: "flex", height: 6, width: 120, borderRadius: 999, background: color }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Schibsted Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Schibsted Grotesk", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
