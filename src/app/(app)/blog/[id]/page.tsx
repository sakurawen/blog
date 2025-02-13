import type { Metadata } from 'next';
import * as notionUtils from 'notion-utils';
import { Suspense } from 'react';
import { PostLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { PageContainer } from '~/components/ui/page-container';
import { notion } from '~/lib/notion';
import { getPosts } from '../../_lib/notion';
import { Comment } from './_components/comment/comment';
import { PostHeader } from './_components/header';

export const dynamicParams = true;
export const revalidate = 60 * 5;

export async function generateStaticParams() {
  const page = await getPosts();
  const { block } = page;
  const params = [];
  for (const blockId in block) {
    const blockData = block[blockId];
    if (blockData.value.type === 'page') {
      params.push({ id: blockId });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);
  const title = notionUtils.getPageTitle(post);
  const block = post.block[id].value;
  const description = notionUtils.getPageProperty('description', block, post);
  return {
    title: `${title} - akumanoko`,
    openGraph: {
      title,
      description,
      images: `https://www.notion.so/image/${encodeURIComponent(block.format.page_cover)}?table=block&id=${id}&cache=v2`,
    },
  } as Metadata;
}

function getPost(id: string) {
  return notion.getPage(id);
}

export default async function Post({ params }: PageProps) {
  const { id } = await params;
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
