import type { Metadata } from 'next';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import * as notionUtils from 'notion-utils';
import { Suspense } from 'react';
import { PostLoader } from '~/components/modules/notion/post-loader';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { Button } from '~/components/ui/button';
import { PageContainer } from '~/components/ui/page-container';
import { notion } from '~/lib/notion';
import { Comment } from './_components/comment/comment';

export const dynamic = 'force-dynamic';

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
      <div className='mb-12'>
        <Link href='/blog'>
          <Button className='px-6 py-2 rounded-full text-xl '>
            <Icon icon='ri:arrow-left-line' />
          </Button>
        </Link>
      </div>
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
