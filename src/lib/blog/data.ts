import type { BlogPost } from '@/types/blog';
import { createClient } from '@/lib/supabase/server';

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('posts').select('id,title,slug,excerpt,content,status,published_at,created_at,reading_time_minutes,category:categories(name),series:series(name),series_order,post_tags(tags(name))').eq('status', 'published').order('published_at', { ascending: false });
  return (data ?? []).map((post: any) => ({ id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category?.name ?? 'Uncategorized', tags: (post.post_tags ?? []).map((x: any) => x.tags?.name).filter(Boolean), series: post.series?.name, seriesOrder: post.series_order ?? undefined, publishedAt: post.published_at ?? post.created_at, readingTime: `${post.reading_time_minutes} min read`, status: post.status }));
}

export async function getPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}
