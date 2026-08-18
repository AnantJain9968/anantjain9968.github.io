import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = { title: 'Engineering Blog', description: 'Articles by Anant Jain on Java, Spring Boot, Kafka, system design, databases and backend engineering.' };

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return <section className="section container blog-index"><div className="section-title"><span>Engineering blog</span><h1>Ideas, systems and lessons from building backend software.</h1><p>Long-form technical writing designed to explain the why, not just the what.</p></div><div className="filter-row"><Link className="filter active" href="/blog">All</Link>{categories.map((category) => <Link className="filter" key={category} href={`/blog/category/${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</Link>)}</div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div>{!posts.length && <div className="empty-state"><p>No published articles yet. New writing will appear here automatically.</p></div>}</section>;
}
