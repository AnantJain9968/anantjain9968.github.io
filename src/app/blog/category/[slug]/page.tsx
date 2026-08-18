import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const posts = await getPublishedPosts(); const post = posts.find((x) => x.category.toLowerCase().replaceAll(' ', '-') === slug); return post ? { title: post.category, description: `Anant Jain's articles about ${post.category}.` } : {}; }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const posts = (await getPublishedPosts()).filter((post) => post.category.toLowerCase().replaceAll(' ', '-') === slug); if (!posts.length) notFound(); return <section className="section container"><div className="section-title"><span>Category</span><h1>{posts[0].category}</h1><p>Articles in this engineering topic.</p></div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>; }
