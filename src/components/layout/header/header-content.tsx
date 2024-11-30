'use client';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { m } from 'motion/react';
import { usePathname } from 'next/navigation';
import { AnimatedLink } from './animated-link';
import { HeaderBackground } from './header-background';

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
    <nav className='rounded-full overflow-hidden  shadow-sm'>
      <HeaderBackground>
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
      </HeaderBackground>
    </nav>
  );
}

function HeaderMenuItem({ menu, isActive }: { menu: Menu, isActive: boolean }) {
  return (
    <AnimatedLink
      className='py-2 px-2.5 hover:text-zinc-900 '
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
    </AnimatedLink>
  );
}
