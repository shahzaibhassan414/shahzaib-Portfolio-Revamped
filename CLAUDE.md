@AGENTS.md

# shahzaib-dev.site: build brief

This repo is the new portfolio for **Shahzaib Hassan, Senior Flutter Developer**. It replaces the old Flutter Web site at https://www.shahzaib-dev.site. The design and copy are already approved. Your job is to build them faithfully in Next.js, fast and accessible, without inventing content.

Positioning to protect on every page: *Shahzaib builds, fixes, and takes ownership of production Flutter apps.*

## Sources of truth (read these first)

| What | Where | Rule |
| --- | --- | --- |
| Approved visual design | `design/*.html` | Open each in a browser. Match layout, spacing, type, color, and components closely. |
| Final copy, SEO, URLs, links | `docs/copy-and-seo.md` | Use the words verbatim. If a design file and the copy doc disagree on wording, **the copy doc wins**. On layout, **the design wins**. |
| Global facts | `src/content/site.ts` | Name, email, WhatsApp, social links, nav, playbooks, store links. Never hard-code these in components. |
| Next.js 16 docs | `node_modules/next/dist/docs/` | This Next version differs from older ones. Check the docs before using an API (see AGENTS.md). |

Notes on the design files: they were exported from a design canvas, so ignore the tool-specific tags (`<x-dc>`, `<helmet>`, `<sc-for>`, `<sc-if>`, `{{themeClass}}`, `<script type="text/x-dc">`). `<dc-import name="Footer">` means "the shared footer from `design/footer.html` goes here". Bracketed text like `[Screen: venue check-in]` or `[CONTENT NEEDED FROM SHAHZAIB]` is a placeholder (see "Content still missing").

## Stack

- Next.js 16 App Router, TypeScript, React 19, static generation for every page
- Tailwind CSS v4 (CSS-first config, tokens as CSS variables in `globals.css`)
- `motion` (v14, the successor to Framer Motion) for component animation, `lenis` for smooth scrolling
- Fonts are self-hosted in `src/fonts/` and loaded with `next/font/local`: Schibsted Grotesk (variable, 400 to 800) for everything, JetBrains Mono for small technical labels only. Do not load Google Fonts at runtime.
- Deploy target: Vercel. No database. The contact form posts to a route handler.

## Design tokens

Dark theme is the launch theme. Keep every color in a CSS variable so a light theme can be added later (light values are in the design files under `.t-light`), but do not ship a theme toggle now.

```css
--bg: #151A23;        /* page */
--surface: #1B212B;   /* cards, panels */
--surface-2: #222936; /* chips, inner tiles */
--line: #2B3340;      /* borders, dividers */
--line-strong: #3A4352;
--text: #ECEFF4;
--body: #C7CDD7;      /* paragraph text */
--muted: #A3ABB8;     /* meta, captions (passes 4.5:1 on --bg) */
--accent: #7B98FF;    /* links, primary buttons, highlights */
--on-accent: #0E1530;
--live: #3DD68C;      /* "available" and "now" indicators only */
--cta-bg: #ECEFF4;    /* inverted call-to-action bands */
--cta-text: #151A23;
```

- Project colors (cards, panels, icons): On Scene `#D93A63`, Zera `#0F8A7E`, BePay `#5B49D6`, Paw Play Love `#E46A2E`, LawnOlu `#2E9A55`, Simman `#3D5A80`, Jatt App `#B7791F`, ExamConnect `#2F7FC1`, Material World `#8A5A44`. Panel gradients for each are in `design/work.html`.
- Type: H1 hero `clamp(44px, 6vw, 84px)`, weight 800, tracking -0.04em, line-height 1. Section H2 48px/800/-0.03em. Body 17 to 19px, line-height 1.55 to 1.65. Keep line length under about 75 characters.
- Radii: buttons 12 to 14px, cards 24 to 32px, phone frames 34 to 54px, pills 999px.
- Layout: content max-width 1200px (Work page 1280px), side padding 40px desktop and 20px mobile, section spacing 136 to 152px desktop and about 88px mobile.
- Focus: visible 2px `--accent` outline with 3px offset on every interactive element.

## Routes

| Route | Design | Notes |
| --- | --- | --- |
| `/` | `home.html` | Hero lockscreen, proof line, three entry points, project rail, capability matrix, process, experience timeline, blog, open source, CTA |
| `/work` | `work.html` | Featured On Scene, mixed-size tiles, "Every project" index |
| `/work/[slug]` | `case-study-on-scene.html` | One template for all projects. Full case studies: `on-scene`, `zera`, `bepay`. Shorter pages: `paw-play-love`, `lawnolu`, `simman`, `jatt-app`. `examconnect` and `material-world` stay unpublished (draft flag) until content exists. |
| `/services` | `services.html` | Hub: Build, Rescue, Maintain, specialist areas, pricing cards, FAQ |
| `/services/flutter-app-development` | from `services.html` | Dedicated page using the "Build a new app" copy from the doc, plus related case studies |
| `/services/flutter-app-rescue` | from `services.html` | Same pattern, rescue copy |
| `/services/flutter-app-maintenance` | from `services.html` | Same pattern, maintenance copy |
| `/about` | `about.html` | Portrait, story, principles, codebase approach, who I work with, timeline incl. internship, toolkit |
| `/blog` | `blog.html` | The two Notion playbooks link out for now. "Coming next" list. |
| `/blog/[slug]` | none yet | Set up MDX for future articles: a readable article layout using the same tokens, with a CTA at the end matching the article topic (see CTA library in the copy doc). |
| `/contact` | `contact.html` | Form, direct options, "what happens next" |
| 404 | none | Simple page in the site style with links to Work and Contact |

Add permanent redirects from the old URLs: `/project/paw-play-love`, `/project/lawnolu`, `/project/simman` to their `/work/` pages; `/project/bepay-client` and `/project/bepay-business` to `/work/bepay`; `/project/olu-pro` to `/work/lawnolu`; `/project/the-blue-lagoon` to `/work`; `/project/dating-app` to `/work/on-scene`.

## Content model

Put project data in `src/content/projects.ts` (typed), and long case-study bodies in MDX under `src/content/work/<slug>.mdx` if you prefer. Suggested type:

```ts
type Project = {
  slug: string;
  name: string;
  category: "Social and dating" | "Marketplace" | "Fintech and Web3" | "Real-time" | string;
  cardLine: string;          // from the copy doc table "Card lines"
  color: string;             // project color above
  tier: "flagship" | "supporting";
  draft?: boolean;           // hide from lists and sitemap
  role?: string;
  platforms: string;         // "iOS and Android"
  stack: string[];
  storeLinks?: { appStore?: string; googlePlay?: string };
  screens: { src?: string; alt: string; label: string }[]; // label used by the placeholder when src is missing
  capabilities: Array<"subscriptions" | "payments" | "realtime" | "maps" | "web3" | "marketplace">;
};
```

The capability matrix on the homepage must be generated from `capabilities`, so it can never claim something a project doesn't have.

## Components to build

- **Logo**: use `public/brand/logo-mark.svg` (already converted to vector paths) at 36px in the header and 48px in the footer, next to "Shahzaib Hassan". Favicons are done: `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`.
- **Header**: logo, nav (Work, Services, About, Blog), "Discuss your app" button. Sticky; becomes slightly more compact with a blurred background after 40px of scroll. Mobile: menu button opening a full-screen sheet. Mark the current page with `aria-current`.
- **Footer**: from `design/footer.html`, including the large faded wordmark and "Back to top".
- **HeroLockscreen**: the phone with the five notifications. This is the signature moment (see Motion).
- **PhoneFrame** and **ScreenPlaceholder**: real screenshots go inside the frame. When a screenshot is missing, render the tinted placeholder with its label, exactly like the design, never a broken image.
- **ProjectRail** (homepage): horizontal scroll-snap row of the large project cards, previous and next buttons, progress bar. Must work with touch, trackpad, and keyboard.
- **ProjectTile**, **FeaturedProject**, **ProjectIndex** (Work page).
- **CapabilityMatrix**: a real `<table>` with row and column headers. Filled dots have accessible text ("Yes" or "No").
- **Timeline**: vertical, with the scroll-linked progress line.
- **ArchitectureDiagram**: rows of app-side cards, flow labels, and service cards, with lines that draw in. Data-driven per project.
- **CTABand**, **ProcessSteps**, **FAQ** (native `details` and `summary`), **ContactForm**.

## Motion

Smooth, not busy. Content is never hidden waiting for an animation, and the old site's "section stays blank for two seconds" problem must not come back.

1. **Hero lockscreen** (the one orchestrated moment): the clock fades up, then the five notifications arrive one by one, every 0.6s, sliding down 14px with a slight scale from 0.97, using a spring-like ease `cubic-bezier(.2,.8,.2,1)`. Runs once on load.
2. **Experience timeline**: the progress line fills top to bottom as the section scrolls through the viewport (`useScroll` + `scaleY`, or CSS `animation-timeline: view()` with a fallback).
3. **Project tiles**: on hover, the card lifts 4px and the two outer phones fan out slightly. Transform only.
4. **Work to case study**: the project image morphs into the case-study header using React `<ViewTransition>` (see `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`). Gracefully does nothing where unsupported.
5. **Architecture diagram**: connector lines draw in once when the diagram enters the viewport.
6. **Lenis** smooth scrolling on desktop, native on touch devices.
7. **Header**: compacts on scroll.

Rules: animate only `transform` and `opacity` (plus `filter` in view transitions). Respect `prefers-reduced-motion`: no lockscreen sequence (show the final state), no Lenis, no morphs, static timeline. No fade-up-on-scroll for every section.

## Contact form

- `POST /api/contact` route handler. Validate on the server. Include a hidden honeypot field.
- If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, send with Resend's HTTP API (plain `fetch`, no extra dependency). Otherwise return a clear error so the UI shows the fallback message with a mailto link.
- The project-type chips are single-select buttons with `aria-pressed`. Support `?type=rescue|build|maintain|other` so the "Contact for pricing" and service CTAs pre-select a type.
- Success and error messages come from the copy doc, section 11.
- Document the env vars in `.env.example`.

## SEO

- Per-page `title`, `description`, canonical, and Open Graph from the copy doc, section 12. Use the H1s and H2 structures listed there.
- `sitemap.ts` (published pages only), `robots.ts`, and a generated Open Graph image per page with `next/og`, using the self-hosted font.
- JSON-LD: `Person` on `/about`, `ProfessionalService` on `/services`, `BreadcrumbList` on case studies, `Article` on blog posts.
- `public/llms.txt` describing the site structure.
- Descriptive alt text on every screenshot.

## Images and assets

- `public/images/portrait.webp` and `avatar.webp`: Shahzaib's photo. Use `next/image` with proper `sizes`.
- `public/brand/`: logo mark (dark and light) and a 512px PNG.
- Project screenshots: run `node scripts/fetch-legacy-assets.mjs` on a machine with internet access to pull the old site's mockups into `public/work/<slug>/`. These are temporary marketing mockups. Real screenshots from Shahzaib replace them.

## Content still missing (never invent it)

Leave these as visible placeholders or hide the element. Never make up numbers, testimonials, logos, or claims.

- Real app screenshots and store links for each project
- One or two real results per flagship case study
- On Scene safety-control details and the technique that kept the map smooth
- Role confirmations for On Scene and Zera, team sizes, timelines
- ExamConnect and Material World content (keep them as drafts until it arrives)
- Booking link (`site.bookingUrl`), a reply time, and the exact internship months (Feb to May 2022 is assumed)
- Named testimonials. There is no testimonials section until real ones exist.

## Build order

Work in this order and run `npm run build` after each step. Commit after each step.

1. Tokens, fonts, global styles, Header, Footer, Logo, base layout, 404
2. Homepage (static first, then the hero animation)
3. Project data, Work page, case-study template with On Scene, then the other projects
4. Services hub and the three service pages
5. About, Blog (plus MDX setup), Contact (UI and route handler)
6. Motion pass: Lenis, timeline, view transitions, architecture diagram
7. SEO pass: metadata, sitemap, robots, OG images, JSON-LD, redirects, llms.txt
8. QA pass (below)

## Quality bar (check before calling it done)

- Every page matches its design file at 1440px and holds up at 375px: no horizontal scrolling, readable type, tap targets of at least 44px.
- Lighthouse on mobile: Performance at least 95, Accessibility 100, SEO 100. First-load JS stays small: animation code is client-only and kept out of static content.
- No layout shift from fonts or images.
- Keyboard: every link, button, chip, rail control, and FAQ item reachable and visibly focused.
- Reduced motion fully respected.
- `npm run build` and `npm run lint` pass with no errors.
- No copy in components that contradicts `docs/copy-and-seo.md`.
