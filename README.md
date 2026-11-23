# Zainab Fatima — Portfolio

The public portfolio website of **Zainab Fatima, Web Developer & AI Creator**.
Built with Next.js (App Router, TypeScript) and hand-written CSS — no image
files at all: every visual (including the hero desk illustration) is pure
CSS/SVG in the brand palette (Vibrant Vine `#4C3436`, Coffee `#3C2E2E`,
Old Rose `#C38683`, Macaroon `#B38871`). Dark and light modes with a toggle
that remembers the visitor's choice.

## Features

- Hero, About, Services, Work (4 demo projects), Process, Contact sections
- Working contact form that saves messages to Supabase
- Passcode-protected admin inbox at `/admin` (read/unread, delete, reply by email)
- "Live Demo" buttons on the project cards, driven by env vars

## 1. Create the Supabase table

In your Supabase project, open **SQL Editor**, paste this and run it:

```sql
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  website_type text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
```

The site talks to Supabase from the server with the **Secret key**, which
bypasses Row Level Security, so no extra policies are needed for this setup.

## 2. Environment variables

Copy `.env.example` to `.env.local` for local development, and set the same
variables in Vercel (Project → Settings → Environment Variables) for
production:

| Variable | Where to get it |
| --- | --- |
| `SUPABASE_URL` | Supabase → your project → the project URL (`https://<ref>.supabase.co`) |
| `SUPABASE_SECRET_KEY` | Supabase → Settings → API Keys → the **Secret** key (`sb_secret_…`) |
| `ADMIN_PASSCODE` | A long private passcode you choose yourself — used to open `/admin` |
| `NEXT_PUBLIC_DEMO_BOOKING_URL` | Public URL of the deployed Booking demo (optional) |
| `NEXT_PUBLIC_DEMO_BUSINESS_URL` | Public URL of the deployed Business demo (optional) |
| `NEXT_PUBLIC_DEMO_ORDERING_URL` | Public URL of the deployed Ordering demo (optional) |
| `NEXT_PUBLIC_DEMO_LANDING_URL` | Public URL of the deployed Landing Page demo (optional) |

If a `NEXT_PUBLIC_DEMO_*_URL` is empty, that card shows a disabled
"Live Demo — coming soon" button instead.

> ⚠️ Never commit a real `.env.local` file or paste the Secret key anywhere
> public. `.gitignore` already excludes env files.

## 3. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — and http://localhost:3000/admin for the inbox
(sign in with `ADMIN_PASSCODE`).

## 4. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
   The framework preset "Next.js" is detected automatically — no build
   settings need changing.
3. Add all the environment variables from step 2 **before** the first
   deployment finishes (Vercel asks for them during import, or add them
   later under Settings → Environment Variables and redeploy).
4. Deploy. Your site is live at `https://<project>.vercel.app`.
5. Later, when each demo project is deployed, paste its URL into the
   matching `NEXT_PUBLIC_DEMO_*_URL` variable and redeploy — the Live Demo
   buttons switch on automatically.

## Project structure

```
app/
  page.tsx            Home page (all sections)
  admin/page.tsx      Admin inbox UI
  api/contact/        POST — save a contact form message
  api/admin/login     POST — passcode check, sets the session cookie
  api/admin/logout    POST — clears the session cookie
  api/admin/messages  GET / PATCH / DELETE — inbox operations
  globals.css         Design system (palette, dark/light themes)
  layout.tsx          Fonts (Fraunces + Sora), theme init
components/           Header, ThemeToggle, Reveal, HeroArt (SVG), ContactForm
lib/                  Supabase REST helper + admin session helpers (server only)
```
