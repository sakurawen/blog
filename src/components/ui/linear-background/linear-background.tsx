'use client';
import type { PropsWithChildren } from 'react';
import { m, useMotionTemplate, useMotionValue } from 'motion/react';
import { cn } from '~/lib/cn';

export function LinearBackground(props: PropsWithChildren<{
  className?: string
}>) {
  const { children, className } = props;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(229, 247, 253, 0.4) 0%, transparent 65%)`;

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    radius.set(Math.hypot(width, height) / 2.5);
  }

  return (
    <div onMouseMove={handleMouseMove} className={cn('linear-background mx-auto group  relative  group   backdrop-blur-md', className)}>
      <m.div style={{ background }} className='pointer-events-none absolute -inset-px  opacity-0 transition-opacity duration-500 group-hover:opacity-100' aria-hidden />
      {children}
    </div>
  );
}
