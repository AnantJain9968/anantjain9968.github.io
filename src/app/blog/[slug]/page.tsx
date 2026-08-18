import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPublishedPosts, slugify } from '@/lib/blog/data';

export async function generateStaticParams() { return getPublishedPosts().map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = getPostBySlug(slug); if (!post) return {};
  return { title: post.title, description: post.excerpt, keywords: [post.category, ...post.tags], alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.publishedAt, tags: post.tags } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = getPostBySlug(slug); if (!post) notFound();
  return (
    <article className="article container">
      <header className="article-header">
        <Link href={`/blog/category/${slugify(post.category)}`} className="eyebrow">{post.category}</Link>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div className="article-meta">{post.publishedAt} · {post.readingTime}</div>
        <div className="tag-row" aria-label="Article tags">
          {post.tags.map((tag) => <Link className="filter" key={tag} href={`/blog/tags/${slugify(tag)}`}>#{tag}</Link>)}
        </div>
      </header>
      <div className="article-layout">
        <aside>
          <span>On this page</span>
          <div>Introduction</div>
          <div>Key ideas</div>
          <div>Trade-offs</div>
        </aside>
        <div className="prose">
          {post.content.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="series-nav">
            {post.series && <><span>{post.series} · Part {post.seriesOrder}</span><Link href={`/blog/series/${slugify(post.series)}`}>Explore the series →</Link></>}
          </div>
        </div>
      </div>
    </article>
  );
}
