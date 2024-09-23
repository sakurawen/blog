'use client';
import { m, useMotionTemplate, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/cn';
import { NavLink } from './navbar-link';

const menu: Menu[] = [
  {
    title: '首页',
    path: '/',
  },
  {
    title: '文稿',
    path: '/posts',
  },
  {
    title: '思考',
    path: '/thinking',
  },
  {
    title: '时间线',
    path: '/timeline',
  },
];

export function NavbarMenu() {
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
        'flex mx-auto group relative rounded-full shadow bg-white/70 backdrop-blur px-4',
        'ring-1 ring-zinc-900/5',
      )}
      onMouseMove={handleMouseMove}
    >
      <m.div layout style={{ background }} className='pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100' aria-hidden />
      {
        menu.map((i) => {
          return (
            <NavLink
              className='py-2 px-4 transition-colors hover:text-primary'
              href={i.path}
              key={i.path}
              isActive={
                pathname === i.path
              }
            >
              {i.title}
            </NavLink>
          );
        })
      }
    </m.nav>
  );
}
