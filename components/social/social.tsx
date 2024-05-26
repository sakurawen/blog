import { GitHubIcon, TwitterIcon, MailIcon ,BilibiliIcon} from '~/components/icons';
import Link from 'next/link';

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
    <div className='space-x-4 flex'>
      {socials.map((i) => {
        return (
          <Link
            key={i.url}
            href={i.url}
            target='_blank'>
            <i.icon className='w-6 h-6 opacity-65 hover:opacity-100' />
          </Link>
        );
      })}
    </div>
  );
}
