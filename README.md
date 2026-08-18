# Anant Jain — Personal Engineering Site

Next.js + TypeScript personal portfolio and technical publishing platform.

## Stack

- Next.js / React / TypeScript
- Supabase Auth, PostgreSQL and Storage
- Markdown + GFM for articles
- Component-based styling and routes

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set these environment variables:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Never put a Supabase service-role key in the browser or repository.

## CMS

Open `/admin/login` and sign in with the Supabase Auth user that is present in `public.admin_users`.

The CMS supports drafts, publishing, categories, tags, series ordering, Markdown/GFM content, cover image uploads, SEO metadata and reading time.

## Routes

- `/` — portfolio homepage
- `/about` — profile
- `/experience` — experience
- `/projects` — projects
- `/blog` — published articles
- `/blog/category/[slug]` — category archive
- `/blog/tag/[slug]` — tag archive
- `/blog/series/[slug]` — series archive
- `/blog/[slug]` — article
- `/admin/login` — private CMS login
- `/admin` — CMS dashboard
