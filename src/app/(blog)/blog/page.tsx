import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostListLoader } from '~/components/features/notion/notion-loader';
import { NotionRenderer } from '~/components/features/notion/notion-renderer';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { getBlog } from './[id]/actions';

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
  const data = await getBlog();
  return <NotionRenderer className='w-auto!' recordMap={data} />;
}
