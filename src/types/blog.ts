export type BlogStatus = 'draft' | 'published';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  publishedAt: string;
  readingTime: string;
  status: BlogStatus;
};
