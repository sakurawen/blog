import { Icon } from '@iconify/react';
import Link from 'next/link';
import { cn } from '~/lib/cn';

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/wenhouman',
    icon: <Icon className='size-6 ' icon='ri:twitter-x-fill' />,
  },
  {
    name: 'github',
    url: 'https://github.com/sakurawen',
    icon: <Icon className='size-6 ' icon='ri:github-line' />,

  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/2940875',
    icon: <Icon className='size-6 ' icon='ri:bilibili-line' />,

  },
  {
    name: 'email',
    url: 'mailto://wisakura@outlook.com',
    icon: <Icon className='size-6 ' icon='ri:mail-line' />,
  },
];

export function Social({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-4', className)}>
      {socials.map((i) => {
        return (
          <Link
            key={i.url}
            href={i.url}
            target='_blank'
            className='inline-block p-1 rounded transition-colors opacity-65 hover:opacity-100 hover:bg-black/10'
          >
            {i.icon}
          </Link>
        );
      })}
    </div>
  );
}
