'use client';
import type { posts } from '~/db/schema';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { PostCard } from '~/components/features/post-card';
import { getPosts } from '../[id]/actions';

export function PostList() {
  const { data } = useQuery({
    queryKey: ['post-list'],
    async queryFn() {
      return getPosts();
    },
  });
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 px-4'>
      {data?.map(post => (
        <Link key={post.id} href={`/blog/${post.id}`} className='block cursor-default'>
          <PostCard
            key={post.id}
            post={post as unknown as RPCResponse<typeof posts.$inferSelect>}
            showMeta={false}
          />
        </Link>
      ))}
    </div>
  );
}
