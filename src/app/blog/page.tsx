import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllTags, getPublishedPosts, slugify } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = { title: 'Engineering Blog', description: 'Articles by Anant Jain on Java, Spring Boot, Kafka, system design, databases and backend engineering.' };

export default function BlogPage() {
  const posts = getPublishedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <section className="section container blog-index">
      <div className="section-title">
        <span>Engineering blog</span>
        <h1>Ideas, systems and lessons from building backend software.</h1>
        <p>Long-form technical writing designed to explain the why, not just the what.</p>
      </div>
      <div className="filter-row" aria-label="Browse by category">
        <Link className="filter active" href="/blog">All</Link>
        {categories.map((category) => <Link className="filter" key={category} href={`/blog/category/${slugify(category)}`}>{category}</Link>)}
      </div>
      <div className="tag-row" aria-label="Browse by tag">
        {tags.map((tag) => <Link className="filter" key={tag} href={`/blog/tags/${slugify(tag)}`}>#{tag}</Link>)}
      </div>
      <div className="blog-grid">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
