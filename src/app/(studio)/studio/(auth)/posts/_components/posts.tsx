'use client';
import { useQuery } from '@tanstack/react-query';
import { parseResponse } from 'hono/client';
import Link from 'next/link';
import { PostCard } from '~/components/features/post-card';
import { hono } from '~/lib/hono';

export function Posts() {
  const { data: posts, isLoading } = useQuery({
    queryFn() {
      return parseResponse(hono.api.posts.$get());
    },
    queryKey: ['posts'],
  });

  if (isLoading) {
    return 'loading...';
  }

  return (
    <div className='posts pb-4'>
      <div className=' flex flex-wrap gap-4'>
        {posts?.data.map((post) => {
          return (
            <Link key={post.id} href={`/studio/posts/upsert/${post.id}`}>
              <PostCard post={post} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
