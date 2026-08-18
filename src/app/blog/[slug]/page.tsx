import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '@/lib/blog/data';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = await getPostBySlug(slug); if (!post) return {};
  return { title: post.title, description: post.excerpt, keywords: [post.category, ...post.tags], alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: 'article', url: `${siteConfig.url}/blog/${post.slug}`, title: post.title, description: post.excerpt, publishedTime: post.publishedAt, tags: post.tags } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPostBySlug(slug); if (!post) notFound();
  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, datePublished: post.publishedAt, author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url }, mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`, keywords: post.tags.join(', ') };
  return <article className="article container"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} /><header className="article-header"><Link href={`/blog/category/${post.category.toLowerCase().replaceAll(' ', '-')}`} className="eyebrow">{post.category}</Link><h1>{post.title}</h1><p>{post.excerpt}</p><div className="article-meta">{new Date(post.publishedAt).toLocaleDateString('en-IN', { dateStyle: 'long' })} · {post.readingTime} · {post.tags.join(' · ')}</div></header><div className="article-layout"><aside><span>Article</span>{post.tags.map((tag) => <div key={tag}>{tag}</div>)}</aside><div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>{post.series && <div className="series-nav"><span>{post.series} · Part {post.seriesOrder}</span><Link href={`/blog/series/${post.series.toLowerCase().replaceAll(' ', '-')}`}>Explore the series →</Link></div>}</div></div></article>;
}
