# shahzaib-dev.site

Portfolio for Shahzaib Hassan, Senior Flutter Developer. Built with Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP and Lenis, statically generated and deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Contact form

The form posts to `/api/contact` and sends email through Resend. Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (optional, defaults to Resend's onboarding address)

Without them the form shows a fallback message with a mailto link.

## Project structure

- `src/app/` routes: home, work and case studies, services, about, contact, plus sitemap, robots, Open Graph images
- `src/components/` UI and motion components
- `src/content/` site facts, projects, case studies, services, experience
- `design/` approved page designs
- `docs/copy-and-seo.md` final copy, SEO plan and content roadmap
- `public/work/<slug>/` project screens

## Content still to add

Screenshots for ExamConnect and Material World. Until they exist, those projects show a styled app screen in place of each screenshot.
