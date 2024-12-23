import { Suspense } from 'react';
import { PostLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { PageContainer } from '~/components/ui/page-container';

import { notion } from '~/lib/notion';
import { Comment } from './_components/comment/comment';

export const dynamic = 'force-dynamic';

function getPost(id: string) {
  return notion.getPage(id);
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PageContainer className='pt-20 max-w-3xl mx-auto  px-4'>
      <Suspense fallback={<PostLoader />}>
        <PostContent id={id} />
      </Suspense>
    </PageContainer>
  );
}

async function PostContent({ id }: { id: string }) {
  const data = await getPost(id);
  return (
    <PostRenderer
      pageFooter={
        <Comment id={id} />
      }
      recordMap={data}
      fullPage
      disableHeader
      className='!w-full  px-0!'
    />
  );
}
