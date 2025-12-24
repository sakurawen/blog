import type { MetadataRoute } from 'next';
import { posts } from '~/db/schema';
import { db } from '~/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await db().select().from(posts);

  const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://localhost:3000';

  const postUrls = allPosts.map(post => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ];
}
