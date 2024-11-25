'use client';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { AnimatePresence, m, useMotionTemplate, useMotionValue } from 'motion/react';
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
    title: '博客',
    path: '/blog',
    icon: <Icon icon='lucide:signpost-big' />,
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

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, #e5f7fd 0%, transparent 65%)`;

  return (
    <AnimatePresence>

      <m.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        className={cn(
          'relative',
          'mx-auto group py-1 relative rounded-full group  ring-1  shadow bg-white/60 backdrop-blur',
          'ring-1 ring-zinc-800/5',
        )}
        onMouseMove={handleMouseMove}
      >
        <m.div style={{ background }} className='pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100' aria-hidden />
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
      </m.nav>
    </AnimatePresence>
  );
}

function HeaderMenuItem({ menu, isActive }: { menu: Menu, isActive: boolean }) {
  return (
    <AnimatedLink
      className='py-2 px-4 hover:text-zinc-900 '
      href={menu.path}
      isActive={isActive}
    >
      <m.span
        className={clsx('transition-[padding] flex relative justify-center items-center', {
          'pl-5': isActive,
        })}
      >
        {isActive
          ? (
              <m.span
              // animate={isActive ? 'active' : 'unActive'}
              // variants={{
              //   active: { scale: 1, height: 16, width: 16 },
              //   unActive: { scale: 0, height: 0, width: 0 },
              // }}
                layoutId='nav-icon'
                className=' mr-2 absolute   h-4 w-4 flex items-center  left-0 '
              >
                {menu.icon}
              </m.span>
            )
          : null}
        <span className='leading-none text-base'>
          {menu.title}
        </span>
      </m.span>
    </AnimatedLink>
  );
}
