import type { posts } from '~/db/schema';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostCard } from '~/components/features/post-card';
import { PostListLoader } from '~/components/features/post-loader';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { getPosts } from './[id]/actions';

export default function Blogs() {
  return (
    <PageContainer className='pt-12  pb-8 max-w-2xl mx-auto'>
      <div className='px-4 mb-8'>
        <Link href='/'>
          <Button size='icon' variant='secondary' className='rounded-full text-xl '>
            <Icon icon='ri:arrow-left-line' />
          </Button>
        </Link>
      </div>
      <Suspense fallback={<PostListLoader />}>
        <PostList />
      </Suspense>
    </PageContainer>
  );
}

async function PostList() {
  const data = await getPosts();
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 px-4'>
      {data.map(post => (
        <Link key={post.id} href={`/blog/${post.id}`} className='block cursor-default'>
          <PostCard
            key={post.id}
            post={post as unknown as RPCResponse<typeof posts.$inferSelect>}
          />
        </Link>
      ))}
    </div>
  );
}
