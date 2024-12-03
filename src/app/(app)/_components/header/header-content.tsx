'use client';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { m } from 'motion/react';
import { usePathname } from 'next/navigation';
import { LinearBackground } from '~/components/ui/linear-background';
import { HeaderLink } from './header-link';

const menu: Menu[] = [
  {
    title: '首页',
    path: '/',
    icon: <Icon icon='lucide:tree-palm' />,

  },
  {
    title: '博客',
    path: '/blog',
    icon: <Icon icon='lucide:signpost-big' />,
  },
];

export function HeaderContent() {
  const pathname = usePathname();

  return (
    <nav className='header-content shadow-xs  rounded-full'>
      <LinearBackground className='bg-white/80 py-1 rounded-full overflow-hidden border border-zinc-200'>
        <div className='flex px-4'>
          {
            menu.map((i) => {
              let isActive = false;
              if (i.path === '/') {
                isActive = i.path === pathname;
              }
              else {
                isActive = pathname.includes(i.path);
              }
              return (
                <HeaderMenuItem menu={i} isActive={isActive} key={i.path} />
              );
            })
          }
        </div>
      </LinearBackground>
    </nav>
  );
}

function HeaderMenuItem({ menu, isActive }: { menu: Menu, isActive: boolean }) {
  return (
    <HeaderLink
      className='py-2 px-2.5 hover:text-zinc-950'
      href={menu.path}
      isActive={isActive}
    >
      <span
        className={clsx('transition-[padding] flex relative justify-center items-center', {
          'pl-5': isActive,
        })}
      >
        {isActive
          ? (
              <m.span
                layoutId='icon'
                className=' mr-2 absolute   h-4 w-4 flex items-center  left-0 '
              >
                {menu.icon}
              </m.span>
            )
          : null}
        <span className='leading-none text-base'>
          {menu.title}
        </span>
      </span>
    </HeaderLink>
  );
}
