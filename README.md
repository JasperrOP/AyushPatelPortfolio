# Ayush Patel — Portfolio

A high-motion Next.js portfolio built with GSAP, Lenis smooth scroll, and a custom cursor.

## What's new in this pass

- **Header** now shows the full "Ayush Patel" wordmark at a readable size instead of a tiny mono tag.
- **Hero** now features "Ayush Patel" as the giant centerpiece headline (interactive glow/grid background still tracks the cursor).
- **Projects ("Selected work")** were rebuilt from a static card grid into a cursor-reactive list: hover any project row on desktop and a live preview panel glides to follow your cursor, tech-stack chips fade in, and a ghost index number sweeps in behind the title. This is used both on the homepage and the `/work` page.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Deploy

This is a standard Next.js 15 App Router project — deploys as-is to Vercel (recommended), or any Node host.

## Editing content

- Projects, skills: `src/lib/projects.ts`
- Contact info / socials: `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx`, `src/app/page.tsx` (contact section), `src/app/layout.tsx` (metadata)
- Experience / education copy: `src/app/page.tsx`

this is phase 2