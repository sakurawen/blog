import Link from 'next/link';

import { BilibiliIcon, GitHubIcon, MailIcon, TwitterIcon } from '~/components/legacy/icons';

const socials = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/wenhouman',
    icon: TwitterIcon,
  },
  {
    name: 'github',
    url: 'https://github.com/sakurawen',
    icon: GitHubIcon,
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/2940875',
    icon: BilibiliIcon,
  },
  {
    name: 'email',
    url: 'mailto://wisakura@outlook.com',
    icon: MailIcon,
  },
];

export function Social() {
  return (
    <div className='flex space-x-4'>
      {socials.map((i) => {
        return (
          <Link
            key={i.url}
            href={i.url}
            target='_blank'
          >
            <i.icon className='size-6 opacity-65 hover:opacity-100' />
          </Link>
        );
      })}
    </div>
  );
}
