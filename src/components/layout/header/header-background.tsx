'use client';
import type { PropsWithChildren } from 'react';
import { m, useMotionTemplate, useMotionValue } from 'motion/react';

export function HeaderBackground(props: PropsWithChildren) {
  const { children } = props;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, #e5f7fd86 0%, transparent 65%)`;

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    radius.set(Math.hypot(width, height) / 9);
  }

  return (
    <div onMouseMove={handleMouseMove} className='header-background mx-auto group py-1 relative  group   bg-white/60 backdrop-blur'>
      <m.div style={{ background }} className='pointer-events-none absolute -inset-px  opacity-0 transition-opacity duration-500 group-hover:opacity-100' aria-hidden />
      {children}
    </div>
  );
}
