'use client';
import { Icon } from '@iconify/react';
import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import { cn } from '~/lib/cn';

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/wenhouman',
    icon: <Icon className='size-7 ' icon='ri:twitter-x-fill' />,
  },
  {
    name: 'github',
    url: 'https://github.com/sakurawen',
    icon: <Icon className='size-7 ' icon='ri:github-line' />,

  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/2940875',
    icon: <Icon className='size-7 ' icon='ri:bilibili-line' />,

  },
  {
    name: 'email',
    url: 'mailto://wisakura@outlook.com',
    icon: <Icon className='size-7 ' icon='ri:mail-line' />,
  },
];

export function Social({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-8 space-x-5', className)}>
      <AnimatePresence>
        {socials.map((s, index) => {
          return (
            <m.div
              transition={{ delay: index * 0.05 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={s.url}
            >
              <Link
                href={s.url}
                target='_blank'
                className='inline-block p-1.5 rounded-sm transition-colors opacity-65 hover:opacity-100 hover:bg-black/10'
              >
                {s.icon}
              </Link>
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
