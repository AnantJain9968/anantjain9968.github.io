import { notFound } from 'next/navigation';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const posts = getPublishedPosts().filter((post) => post.category.toLowerCase().replaceAll(' ', '-') === slug); if (!posts.length) notFound(); return <section className="section container"><div className="section-title"><span>Category</span><h1>{posts[0].category}</h1><p>Articles in this engineering topic.</p></div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>; }
