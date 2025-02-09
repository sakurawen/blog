'use client';
import { Icon } from '@iconify/react';
import { useIsClient } from 'foxact/use-is-client';
import { useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/cn';

export function PostHeader() {
  const ref = useRef<React.ComponentRef<'div'>>(null);
  const inView = useInView(ref);
  const isClient = useIsClient();
  return (
    <>
      <div className='fixed top-0 z-2 left-0  w-full '>
        <div className={cn('mx-auto max-w-2xl py-2 px-4  bg-white/90 backdrop-blur-md transition-all origin-top opacity-0 -translate-y-full', inView || !isClient ? 'opacity-0 invisible -translate-y-full' : 'visible opacity-100 translate-y-0')}>
          <Link href='/blog' className='py-2 pr-2'>
            <Icon className='inline' icon='ri:arrow-left-line' />
          </Link>
          <span className='text-xs text-gray-700'>
            {isClient ? document?.title : ''}
          </span>
        </div>
      </div>
      <div className='mb-12' ref={ref}>
        <Link href='/blog'>
          <Button className='px-6 py-2 rounded-full text-xl '>
            <Icon icon='ri:arrow-left-line' />
          </Button>
        </Link>
      </div>
    </>
  );
}
