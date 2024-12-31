import { Suspense } from 'react';
import { PostListLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { PageContainer } from '~/components/ui/page-container';
import { notion } from '~/lib/notion';

export const dynamic = 'force-dynamic';

export default async function PostsList() {
  return (
    <PageContainer className='pt-13 sm:pt-24 pb-8 max-w-3xl mx-auto'>
      <Suspense fallback={<PostListLoader />}>
        <PostList />
      </Suspense>
    </PageContainer>
  );
}

async function getPosts() {
  return notion.getPage('13694a15d705804f9a2df0f1e1168011');
}

async function PostList() {
  const recordMap = await getPosts();
  return <PostRenderer className='!w-auto' recordMap={recordMap} />;
}
