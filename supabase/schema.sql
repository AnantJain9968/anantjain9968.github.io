create table if not exists public.categories (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, description text default '');
create table if not exists public.series (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, description text default '');
create table if not exists public.posts (id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, excerpt text not null, content text not null, category_id uuid references public.categories(id) on delete set null, series_id uuid references public.series(id) on delete set null, series_order integer, cover_image text, status text not null default 'draft' check (status in ('draft','published')), published_at timestamptz, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.tags (id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique);
create table if not exists public.post_tags (post_id uuid references public.posts(id) on delete cascade, tag_id uuid references public.tags(id) on delete cascade, primary key (post_id, tag_id));
create table if not exists public.admin_users (id uuid primary key references auth.users(id) on delete cascade, email text not null unique, created_at timestamptz not null default now());

create index if not exists posts_status_published_idx on public.posts(status, published_at desc);
create index if not exists posts_category_idx on public.posts(category_id);
create index if not exists posts_series_idx on public.posts(series_id, series_order);

alter table public.categories enable row level security;
alter table public.series enable row level security;
alter table public.posts enable row level security;
alter table public.tags enable row level security;
alter table public.post_tags enable row level security;
alter table public.admin_users enable row level security;

create policy "published posts are public" on public.posts for select to anon, authenticated using (status = 'published');
create policy "public categories" on public.categories for select to anon, authenticated using (true);
create policy "public series" on public.series for select to anon, authenticated using (true);
create policy "public tags" on public.tags for select to anon, authenticated using (true);
create policy "public post tags" on public.post_tags for select to anon, authenticated using (true);

create policy "admin can read all posts" on public.posts for select to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can insert posts" on public.posts for insert to authenticated with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can update posts" on public.posts for update to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can delete posts" on public.posts for delete to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid())));

create policy "admin can manage categories" on public.categories for all to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can manage series" on public.series for all to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can manage tags" on public.tags for all to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "admin can manage post tags" on public.post_tags for all to authenticated using (exists (select 1 from public.admin_users where id = (select auth.uid()))) with check (exists (select 1 from public.admin_users where id = (select auth.uid())));

-- admin_users is intentionally not exposed to the public Data API.
-- Never expose a service-role or secret key in the browser.
