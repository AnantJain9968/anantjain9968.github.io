import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = { title: 'Engineering Blog', description: 'Articles by Anant Jain on Java, Spring Boot, Kafka, system design, databases and backend engineering.' };

export default function BlogPage() {
  const posts = getPublishedPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  return <section className="section container blog-index"><div className="section-title"><span>Engineering blog</span><h1>Ideas, systems and lessons from building backend software.</h1><p>Long-form technical writing designed to explain the why, not just the what.</p></div><div className="filter-row"><button className="filter active">All</button>{categories.map((category) => <button className="filter" key={category}>{category}</button>)}</div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>;
}
