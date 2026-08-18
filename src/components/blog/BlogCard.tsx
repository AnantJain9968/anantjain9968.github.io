import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="blog-card"><div className="eyebrow">{post.category} · {post.readingTime}</div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="tag-row">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="read-more" href={`/blog/${post.slug}`}>Read article →</Link></article>;
}
