'use client';
import type { ComponentProps } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { cn } from '~/lib/cn';

export function NavLink({ className, children, isActive, ...restProps }: ComponentProps<typeof Link> & { isActive?: boolean }) {
  return (
    <Link {...restProps} className={cn(className, 'relative block transition', { 'text-primary': isActive })}>
      {children}
      {
        isActive ? <m.span layoutId='underline ' className=' absolute  inset-x-1 h-px -bottom-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0' /> : null
      }
    </Link>
  );
}
