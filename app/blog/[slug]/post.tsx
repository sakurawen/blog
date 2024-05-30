import { CalendarDaysIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { PortableText } from '~/components/portable-text';
import { getPostBySlug } from '~/service/sanity-service';
import { Header } from './header';

export function Post({ post, view }: { post: Awaited<ReturnType<typeof getPostBySlug>>; view: number }) {
  return (
    <div className='mx-auto relative max-w-2xl px-4 pt-16  pb-24 md:px-0'>
      <Header />
      <h1 className='text-4xl font-bold mb-6'>{post.title}</h1>
      <p className='mb-4 space-x-4'>
        <span className='inline-flex items-center space-x-2'>
          <CalendarDaysIcon className='inline w-5 h-5' />
          <span>{dayjs(post.publishedAt).format('YYYY/MM/DD')}</span>
        </span>
        <span className='inline-flex items-center space-x-2'>
          <CursorArrowRaysIcon className='inline w-5 h-5' />
          <span>{view}次点击</span>
        </span>
      </p>
      <PortableText value={post.content} />
    </div>
  );
}
