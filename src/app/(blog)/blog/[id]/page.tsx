import type { Metadata } from 'next';
import { Comments } from '~/components/features/comments';
import { HydrationBoundary } from '~/components/features/hydration-boundary';
import { PageContainer } from '~/components/ui/page-container';
import { PostHeader } from './_components/post-header';
import { getPost } from './actions';
import { PostContent } from './content';
import '~/components/features/editor/simple-editor.scss';

export const contentType = 'image/png';
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPost(id);

  return {
    title: data?.title,
    description: data?.description,
  } as Metadata;
}

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PageContainer className='pt-12  px-4 max-w-2xl mx-auto'>
      <HydrationBoundary prefetch={[
        {
          queryKey: ['post-detail', id],
          queryFn() {
            return getPost(id);
          },
        },
      ]}
      >
        <PostHeader />
        <PostContent id={id} />
        <Comments id={id} />
      </HydrationBoundary>
    </PageContainer>
  );
}
