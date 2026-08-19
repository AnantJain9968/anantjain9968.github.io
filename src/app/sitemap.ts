import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPublishedPosts } from '@/lib/blog/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/about', '/experience', '/projects', '/blog'];
  const posts = await getPublishedPosts();

  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
