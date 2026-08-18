create table if not exists categories (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, description text default '');
create table if not exists series (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, description text default '');
create table if not exists posts (id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, excerpt text not null, content text not null, category_id uuid references categories(id) on delete set null, series_id uuid references series(id) on delete set null, series_order integer, cover_image text, status text not null default 'draft' check (status in ('draft','published')), published_at timestamptz, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists tags (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique);
create table if not exists post_tags (post_id uuid references posts(id) on delete cascade, tag_id uuid references tags(id) on delete cascade, primary key (post_id, tag_id));
create index if not exists posts_status_published_idx on posts(status, published_at desc);
create index if not exists posts_category_idx on posts(category_id);
create index if not exists posts_series_idx on posts(series_id, series_order);

alter table categories enable row level security;
alter table series enable row level security;
alter table posts enable row level security;
alter table tags enable row level security;
alter table post_tags enable row level security;

create policy "published posts are public" on posts for select using (status = 'published');
create policy "public categories" on categories for select using (true);
create policy "public series" on series for select using (true);
create policy "public tags" on tags for select using (true);
create policy "public post tags" on post_tags for select using (true);

-- Admin writes should be added only after Supabase Auth is connected.
-- Never expose a service-role key in the browser.
