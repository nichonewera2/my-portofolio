# Nicholas' Digital Universe

A cinematic, space-themed developer portfolio for **Nicholas Orlando Hutajulu**, built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production files are output to `dist/`.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repository.
3. Framework preset: **Vite** (auto-detected). No environment variables needed.
4. Click **Deploy**.

Or, from the CLI, inside this folder:

```bash
npm install -g vercel
vercel
```

## Editing your content

Everything you'll want to change lives in `src/data/`:

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, role, tagline, bio paragraphs |
| `src/data/projects.ts` | Project cards |
| `src/data/skills.ts` | Skills grid |
| `src/data/socials.ts` | Contact links (WhatsApp, Telegram, Instagram, GitHub) — **update these with your real links** |

To swap your photos, replace the two files in `src/assets/` (`nicholas-profile.jpg` and `nicholas-profile-alt.jpg`) — keep the same filenames, or update the import paths in `src/components/IdentityFrame.tsx`.

## Project structure

```
src/
  assets/       → profile photos
  components/   → reusable UI pieces (Navbar, cards, cosmic effects)
  sections/     → page sections (Hero, About, Projects, Skills, Contact)
  data/         → editable content
  hooks/        → small reusable hooks
  lib/          → utilities
```

## Notes

- Fully responsive from mobile to desktop.
- Respects `prefers-reduced-motion` — animations scale back automatically for users who need that.
- No backend, no server — pure static site, deploys anywhere that serves static files (Vercel, Netlify, GitHub Pages).
