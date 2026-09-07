# Jahanzaib Islam — Portfolio

Personal portfolio site built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Motion** (Framer Motion).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/lib/data.ts` | **All site content** — name, contact info, skills, experience, projects, education. Edit this first. |
| `src/app/layout.tsx` | Fonts (Inter + Space Grotesk) and SEO metadata. Update `siteUrl` when you buy a domain. |
| `src/app/globals.css` | Theme tokens (`--color-accent`, etc.), keyframes and custom utilities (`glass`, `grid-bg`, `text-gradient`, `noise`). |
| `src/app/page.tsx` | Section order for the single-page layout. |
| `src/components/` | One file per section plus the animation primitives. |
| `public/Jahanzaib_Islam_Resume.pdf` | The downloadable resume linked from the nav and hero. |

## Sections

`Hero` → `Marquee` → `About` → `Skills` → `Experience` → `Projects` → `Contact` → `Footer`

## Animation primitives

- **`Reveal` / `RevealGroup`** — scroll-triggered fade + slide + blur-in, with stagger support.
- **`MagneticButton`** — buttons that lean toward the cursor, with a gradient wipe on hover.
- **`Cursor`** — trailing glow cursor; auto-disabled on touch devices and under `prefers-reduced-motion`.
- **`ScrollProgress`** — spring-smoothed gradient bar at the top of the viewport.
- **`Background`** — parallax grid, floating colour orbs, vignette and film grain.
- **`.spotlight-card`** — CSS class that follows the pointer via `--mx` / `--my` (see `src/lib/useSpotlight.ts`).

Every animation respects `prefers-reduced-motion`.

## Things to update

1. **Social links** — `socials` in `src/lib/data.ts` currently point at `github.com` / `linkedin.com` roots. Swap in your real profile URLs.
2. **`siteUrl`** in `src/app/layout.tsx` once the domain is live.
3. **Contact form** — submitting opens the visitor's mail client via `mailto:`. To collect submissions server-side instead, swap `handleSubmit` in `src/components/Contact.tsx` for a POST to a route handler or a service like Resend/Formspree.
4. **Project screenshots** — the cards are text-only today; drop images in `public/` and render them with `next/image` if you want thumbnails.

## Deploying

Push to GitHub and import the repo on [Vercel](https://vercel.com) — zero config needed.

> Note: this machine runs Node 18. Tailwind v4.3 prefers Node 20+, so `@tailwindcss/oxide-win32-x64-msvc` is pinned as an optional dependency to work around an npm optional-deps bug. Upgrading to Node 20+ makes that pin unnecessary.
