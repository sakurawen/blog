import type { ExtendedRecordMap } from 'notion-types';
import { use } from 'react';
import { Comments } from '~/components/features/comments';
import { NotionRenderer } from '~/components/features/notion/notion-renderer';

export function PostContent({ id, fetcher }: { id: string, fetcher: Promise<ExtendedRecordMap> }) {
  const data = use(fetcher);
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
