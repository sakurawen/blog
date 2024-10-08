import { CalendarDaysIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

import { Comments } from '~/components/legacy/comments';
import { PortableText } from '~/components/legacy/portable-text';
import type { getPostBySlug } from '~/service/sanity-service';

import { Header } from './header';

export function Post({ post, view }: { post: Awaited<ReturnType<typeof getPostBySlug>>, view: number }) {
  return (
    <div className='relative mx-auto container px-4 pb-24  pt-16 md:px-0'>
      <Header />
      <h1 className='mb-6 text-4xl font-bold'>{post.title}</h1>
      <p className='mb-4 space-x-4'>
        <span className='inline-flex items-center space-x-2'>
          <CalendarDaysIcon className='inline size-5' />
          <span>{dayjs(post.publishedAt).format('YYYY/MM/DD')}</span>
        </span>
        <span className='inline-flex items-center space-x-2'>
          <CursorArrowRaysIcon className='inline size-5' />
          <span>
            {view}
            次点击
          </span>
        </span>
      </p>
      <PortableText value={post.content} />
      <Comments className='mt-16' />
    </div>
  );
}
