import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostListLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { getPosts } from '../_lib/notion';

export const dynamic = 'force-dynamic';

export default async function PostsList() {
  return (
    <PageContainer className='pt-12  pb-8 max-w-2xl mx-auto'>
      <div className='px-4 mb-8'>
        <Link href='/'>
          <Button className='px-6 py-2 rounded-full text-xl '>
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
  const recordMap = await getPosts();
  return <PostRenderer className='!w-auto' recordMap={recordMap} />;
}
