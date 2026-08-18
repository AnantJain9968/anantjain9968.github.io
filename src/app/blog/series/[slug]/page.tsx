import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';
export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const posts = getPublishedPosts().filter((post) => post.series?.toLowerCase().replaceAll(' ', '-') === slug).sort((a,b)=>(a.seriesOrder||0)-(b.seriesOrder||0)); if (!posts.length) notFound(); return <section className="section container"><div className="section-title"><span>Series</span><h1>{posts[0].series}</h1><p>A structured sequence of articles that builds the topic step by step.</p></div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>; }
