import { Suspense } from 'react';
import { PageContainer } from '~/components/layout/page-container';
import { PostListLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { notion } from '~/lib/notion';

export const dynamic = 'force-dynamic';

export default async function PostsList() {
  return (
    <PageContainer className='pt-24 max-w-3xl mx-auto'>
      <Suspense fallback={<PostListLoader />}>
        <PostList />
      </Suspense>
    </PageContainer>
  );
}

async function getPosts() {
  return notion.getPage('13594a15d705807d8333de34903d6065');
}

async function PostList() {
  const recordMap = await getPosts();
  return <PostRenderer recordMap={recordMap} />;
}
