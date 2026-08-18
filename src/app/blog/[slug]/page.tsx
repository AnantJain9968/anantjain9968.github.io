import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog/data';
import Link from 'next/link';

export async function generateStaticParams() { return getPublishedPosts().map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = getPostBySlug(slug); if (!post) return {};
  return { title: post.title, description: post.excerpt, keywords: [post.category, ...post.tags], alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.publishedAt, tags: post.tags } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = getPostBySlug(slug); if (!post) notFound();
  return <article className="article container"><header className="article-header"><Link href={`/blog/category/${post.category.toLowerCase().replaceAll(' ', '-')}`} className="eyebrow">{post.category}</Link><h1>{post.title}</h1><p>{post.excerpt}</p><div className="article-meta">{post.publishedAt} · {post.readingTime} · {post.tags.join(' · ')}</div></header><div className="article-layout"><aside><span>On this page</span><div>Introduction</div><div>Key ideas</div><div>Trade-offs</div></aside><div className="prose">{post.content.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}<div className="series-nav">{post.series && <><span>{post.series} · Part {post.seriesOrder}</span><Link href={`/blog/series/${post.series.toLowerCase().replaceAll(' ', '-')}`}>Explore the series →</Link></>}</div></div></div></article>;
}
