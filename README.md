# Nicholas' Digital Universe

Portofolio developer bertema luar angkasa yang sinematik untuk **Nicholas Orlando Hutajulu**, dibangun dengan React, TypeScript, Vite, Tailwind CSS, dan Framer Motion.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

## Build untuk produksi

```bash
npm run build
npm run preview   # opsional: preview hasil build produksi secara lokal
```

File hasil produksi akan ada di folder `dist/`.

## Deploy ke Vercel

1. Push project ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repository-nya.
3. Framework preset: **Vite** (terdeteksi otomatis). Tidak perlu environment variable.
4. Klik **Deploy**.

Atau, lewat CLI, di dalam folder ini:

```bash
npm install -g vercel
vercel
```

## Mengedit konten

Semua yang mau kamu ubah ada di `src/data/`:

| File | Yang dikontrol |
|---|---|
| `src/data/profile.ts` | Nama, role, tagline, paragraf bio |
| `src/data/projects.ts` | Kartu proyek + gambar cover |
| `src/data/skills.ts` | Grid skill |
| `src/data/socials.ts` | Link kontak (WhatsApp, Telegram, Instagram, GitHub) — **ganti dengan link asli kamu** |

Untuk ganti foto profil, replace dua file di `src/assets/` (`nicholas-profile.jpg` dan `nicholas-profile-alt.jpg`) — pakai nama file yang sama, atau update path import di `src/components/IdentityFrame.tsx`.

Untuk ganti gambar cover proyek (saat ini masih dummy), tinggal replace file di `src/assets/covers/` dan update path import di `src/data/projects.ts`. Rasio gambar yang dipakai: **3:2 (landscape)**.

## Struktur project

```
src/
  assets/          → foto profil
  assets/covers/   → gambar cover proyek (dummy, 3:2)
  components/      → komponen UI reusable (Navbar, kartu, efek luar angkasa)
  sections/        → section halaman (Hero, About, Projects, Skills, Contact)
  data/            → konten yang bisa diedit
  hooks/           → hooks kecil reusable
  lib/             → utilities
```

## Catatan

- Fully responsive dari mobile sampai desktop.
- Menghormati `prefers-reduced-motion` — animasi otomatis dikurangi untuk pengguna yang butuh itu.
- Tanpa backend, tanpa server — pure static site, bisa deploy di mana saja yang bisa serve static files (Vercel, Netlify, GitHub Pages).
