import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Comments } from '~/components/features/comments';
import { PostLoader } from '~/components/features/post-loader';
import { PageContainer } from '~/components/ui/page-container';
import { PostHeader } from './_components/post-header';
import { getPost } from './actions';
import { PostContent } from './content';
import '~/components/features/editor/simple-editor.scss';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPost(id);
  const baseUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'https://localhost:3000';
  const ogImageUrl = `${baseUrl}/blog/${id}/opengraph-image.png`;

  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      title: data?.title,
      description: data?.description,
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: data?.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.title,
      description: data?.description,
      images: [ogImageUrl],
    },
  } as Metadata;
}

export default async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PageContainer className='pt-12  px-4 max-w-2xl mx-auto'>
      <PostHeader />
      <Suspense fallback={<PostLoader />}>
        <PostContent id={id} />
        <Comments id={id} />
      </Suspense>
    </PageContainer>
  );
}
