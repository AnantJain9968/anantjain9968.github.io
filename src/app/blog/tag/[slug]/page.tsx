import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const posts = await getPublishedPosts(); const tag = posts.flatMap((p) => p.tags).find((x) => slugify(x) === slug); return tag ? { title: `#${tag}`, description: `Articles by Anant Jain tagged ${tag}.` } : {}; }
export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const posts = (await getPublishedPosts()).filter((post) => post.tags.some((tag) => slugify(tag) === slug)); if (!posts.length) notFound(); const tag = posts.flatMap((p) => p.tags).find((x) => slugify(x) === slug) ?? slug; return <section className="section container"><div className="section-title"><span>Tag</span><h1>#{tag}</h1><p>Articles connected by this topic.</p></div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>; }
