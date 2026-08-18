import type { BlogPost } from '@/types/blog';

export const demoPosts: BlogPost[] = [
  {
    id: '1', title: 'How I Think About Backend System Design', slug: 'how-i-think-about-backend-system-design',
    excerpt: 'A practical framework for breaking an open-ended system design problem into requirements, APIs, data, scaling, reliability and trade-offs.',
    content: 'System design starts with clarity. Before choosing Kafka, Redis or a database, define the problem, constraints and failure modes.\n\nThis article is a placeholder for the first long-form article in the new publishing system.',
    category: 'System Design', tags: ['Architecture', 'Scalability'], series: 'System Design Fundamentals', seriesOrder: 1,
    publishedAt: '2026-08-18', readingTime: '7 min read', status: 'published'
  },
  {
    id: '2', title: 'Java Concurrency: The Mental Model I Use', slug: 'java-concurrency-mental-model',
    excerpt: 'A clear way to reason about threads, executors, locks, atomics and asynchronous work in Java.',
    content: 'Concurrency becomes easier when you separate shared state, execution policy and coordination. This article will become a full technical deep dive.',
    category: 'Java', tags: ['Java', 'Concurrency'],
    publishedAt: '2026-08-16', readingTime: '8 min read', status: 'published'
  },
];

export function getPublishedPosts() {
  return demoPosts.filter((post) => post.status === 'published').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}
