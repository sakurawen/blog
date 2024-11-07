'use client';
import { Icon } from '@iconify/react';
import { m, useMotionTemplate, useMotionValue } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/cn';
import { AnimatedLink } from './animated-link';

const menu: Menu[] = [
  {
    title: '首页',
    path: '/',
    icon: <Icon icon='lucide:tree-palm' />,

  },
  {
    title: '文稿',
    path: '/posts',
    icon: <Icon icon='lucide:signpost-big' />,
  },
  {
    title: '随想',
    path: '/thinking',
    icon: <Icon icon='lucide:lightbulb' />,
  },
  {
    title: '时间线',
    path: '/timeline',
    icon: <Icon icon='lucide:clock' />,
  },
];

export function HeaderContent() {
  const pathname = usePathname();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    radius.set(Math.hypot(width, height) / 2.5);
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--spotlight)) 0%, transparent 65%)`;

  return (
    <m.nav
      layout='size'
      className={cn(
        'relative',
        'mx-auto group relative rounded-full group duration-200 ring-1  shadow bg-white/60 backdrop-blur',
        'ring-1 ring-zinc-800/5',
      )}
      onMouseMove={handleMouseMove}
    >
      <m.div layout style={{ background }} className='pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100' aria-hidden />
      <div className='flex px-4'>
        {
          menu.map((i) => {
            const isActive = pathname === i.path;
            return (
              <HeaderMenuItem menu={i} isActive={isActive} key={i.path} />
            );
          })
        }
      </div>
    </m.nav>
  );
}

function HeaderMenuItem({ menu, isActive }: { menu: Menu, isActive: boolean }) {
  return (
    <AnimatedLink
      className='py-2 px-4 transition-[padding] hover:text-primary '
      href={menu.path}
      isActive={isActive}
    >
      <span className='relative flex  items-center'>
        {isActive && (
          <m.span layoutId='header-menu-icon' className='text-base mr-2 size-4 flex items-center'>
            {menu.icon}
          </m.span>
        )}
        <m.span layout>
          {menu.title}
        </m.span>
      </span>
    </AnimatedLink>
  );
}
