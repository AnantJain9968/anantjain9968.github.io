import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPublishedPosts } from '@/lib/blog/data';
export default function sitemap(): MetadataRoute.Sitemap { const pages = ['', '/about', '/experience', '/projects', '/blog']; return [...pages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() })), ...getPublishedPosts().map((post) => ({ url: `${siteConfig.url}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) }))]; }
