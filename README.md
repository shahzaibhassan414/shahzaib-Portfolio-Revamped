# shahzaib-dev.site

The new portfolio for Shahzaib Hassan, Senior Flutter Developer. Next.js 16, TypeScript, Tailwind v4, Motion, Lenis.

The design and copy are approved. Everything Claude Code needs to build it is in this repo:

- `CLAUDE.md`: the build brief (stack, tokens, routes, components, motion, SEO, build order, quality bar)
- `design/`: the approved page designs as HTML files. Open them in a browser to see each page.
- `docs/copy-and-seo.md`: final copy, SEO metadata, URLs, internal linking, and the blog roadmap
- `src/content/site.ts`: name, contact details, links
- `public/images/`, `public/brand/`, `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`: photo, logo, and favicons

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Pull the old site's project images (temporary, until real screenshots are added):

```bash
node scripts/fetch-legacy-assets.mjs
```

## Handing it to Claude Code

Open this folder in Claude Code and paste:

> Read CLAUDE.md, then the files in design/ and docs/copy-and-seo.md. Build the site following the build order in CLAUDE.md, one step at a time. After each step, run `npm run build`, fix any errors, and commit. Match the design files closely and use the copy doc word for word. Don't invent any content: leave the placeholders listed under "Content still missing". Start with step 1 and tell me when it's done before moving on.

Working one step at a time keeps each change reviewable, and lets you check each page against its design before moving on.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values to enable the contact form.

## Deploying

Push to GitHub and import the repo in Vercel. Add the environment variables in the Vercel project settings, then point the `shahzaib-dev.site` domain at it.
