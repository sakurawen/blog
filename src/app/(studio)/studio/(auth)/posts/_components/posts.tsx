'use client';
import { useQuery } from '@tanstack/react-query';
import { parseResponse } from 'hono/client';
import Link from 'next/link';
import { PostCard } from '~/components/features/post-card';
import { hono } from '~/lib/hono';
import { cn } from '~/lib/utils';

export function Posts() {
  const { data: posts, isLoading, isFetching } = useQuery({
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
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:flex 2xl:flex-wrap gap-4', isFetching && 'opacity-80')}>
        {posts?.data.map((post) => {
          return (
            <Link key={post.id} href={`/studio/posts/upsert/${post.id}`} className='block 2xl:max-w-xs'>
              <PostCard className='h-full' post={post} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
