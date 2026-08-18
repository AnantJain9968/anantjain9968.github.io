import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog/BlogCard';
import { getAllTags, getPostsByTag } from '@/lib/blog/data';

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  if (!posts.length) return {};
  const tag = posts[0].tags.find((value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug) ?? slug;
  return { title: `#${tag}`, description: `Articles tagged ${tag}.` };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  if (!posts.length) notFound();

  const tag = posts[0].tags.find((value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug) ?? slug;

  return (
    <section className="section container">
      <div className="section-title">
        <span>Tag</span>
        <h1>#{tag}</h1>
        <p>{posts.length} {posts.length === 1 ? 'article' : 'articles'} covering this topic.</p>
      </div>
      <div className="blog-grid">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
