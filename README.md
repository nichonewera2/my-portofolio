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
| `src/data/projects.ts` | Project cards + cover images |
| `src/data/skills.ts` | Skills grid |
| `src/data/stats.ts` | Language breakdown bars + fun facts |
| `src/data/socials.ts` | Contact links (WhatsApp, Telegram, Instagram, GitHub) — **update these with your real links** |

To swap your photos, replace the two files in `src/assets/` (`nicholas-profile.jpg` and `nicholas-profile-alt.jpg`) — keep the same filenames, or update the import paths in `src/components/IdentityFrame.tsx`.

To swap the project cover images (currently placeholders), replace the files in `src/assets/covers/` and update the import paths in `src/data/projects.ts`. Aspect ratio used: **3:2 (landscape)**.

## Ambient music player

The bottom-left button plays a looping ambient track streamed directly from `https://files.catbox.moe/ej02ic.mp3` — no audio file is bundled, so it costs nothing in the build. To change the track, edit `AUDIO_SRC` in `src/components/AudioPlayer.tsx`.

## Project structure

```
src/
  assets/          → profile photos, hero background, galaxy texture
  assets/covers/   → project cover images (placeholders, 3:2)
  components/      → reusable UI pieces (Navbar, cards, space objects, audio player)
  sections/        → page sections (Hero, About, Projects, Skills, Stats, Contact)
  data/            → editable content
  hooks/           → small reusable hooks (parallax, active section, reduced motion)
  lib/             → utilities
```

## Notes

- Fully responsive from mobile to desktop.
- Respects `prefers-reduced-motion` — animations scale back automatically for users who need that.
- Scroll-linked parallax on decorative space objects throughout every section.
- No backend, no server — pure static site, deploys anywhere that serves static files (Vercel, Netlify, GitHub Pages).
