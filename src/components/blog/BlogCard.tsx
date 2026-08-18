import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { slugify } from '@/lib/blog/data';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <div className="eyebrow">{post.category} · {post.readingTime}</div>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <div className="tag-row" aria-label="Article tags">
        {post.tags.map((tag) => (
          <Link className="filter" key={tag} href={`/blog/tags/${slugify(tag)}`}>
            {tag}
          </Link>
        ))}
      </div>
      <Link className="read-more" href={`/blog/${post.slug}`}>Read article →</Link>
    </article>
  );
}
