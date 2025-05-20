import type { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { Suspense } from 'react';
import { Comments } from '~/components/features/comments';
import { PostLoader } from '~/components/features/notion/notion-loader';
import { NotionRenderer } from '~/components/features/notion/notion-renderer';
import { PageContainer } from '~/components/theme/page-container';
import { PostHeader } from './_components/post-header';
import { getBlog } from './actions';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getBlog(id);
  return {
    title: getPageTitle(data),
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <PageContainer className='pt-12  px-4 max-w-2xl mx-auto'>
      <PostHeader />
      <Suspense fallback={<PostLoader />}>
        <PostContent id={id} />
      </Suspense>
    </PageContainer>
  );
}

async function PostContent({ id }: { id: string }) {
  const data = await getBlog(id);
  return (
    <>
      <NotionRenderer
        footer={
          <Comments id={id} />
        }
        recordMap={data as ExtendedRecordMap}
        fullPage
        disableHeader
        className='!w-full  px-0! pb-0!'
      />
    </>
  );
}
