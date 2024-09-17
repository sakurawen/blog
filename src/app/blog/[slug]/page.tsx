import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { redis } from '~/lib/redis';
import * as sanityService from '~/service/sanity-service';

import { Post } from './post';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await sanityService.getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return {
    title: `${post.title} -${post.description} - wen 's blog`,
    description: `${post.title} -${post.description} - wen 's blog`,
  } satisfies Metadata;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await sanityService.getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  let view = 0;
  if (process.env.NODE_ENV === 'production') {
    view = await redis.incr(slug);
  }
  else {
    view = (await redis.get(slug)) || 0;
  }
  return (
    <Post
      post={post}
      view={view}
    />
  );
}
