import { Icon } from '@iconify/react';
import Link from 'next/link';
import { HydrationBoundary } from '~/components/features/hydration-boundary';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { getPosts } from './[id]/actions';
import { PostList } from './_components/post-list';

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
      <HydrationBoundary prefetch={[
        {
          queryKey: ['post-list'],
          queryFn() {
            return getPosts();
          },
        },
      ]}
      >
        <PostList />
      </HydrationBoundary>
    </PageContainer>
  );
}
