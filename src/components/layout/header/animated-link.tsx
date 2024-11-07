'use client';
import type { ComponentProps } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { cn } from '~/lib/cn';

export function AnimatedLink({ className, href, children, isActive, ...restProps }: Omit<ComponentProps<typeof Link>, 'href'> & { isActive?: boolean, href: string }) {
  return (
    <Link {...restProps} href={href} key={href} className={cn(className, 'relative block transition whitespace-nowrap', { 'text-primary': isActive })}>
      {children}
      {
        isActive
          ? (
              <m.span
                layoutId='animate-link-underline'
                key='underline'
                className=' absolute transition-colors  inset-x-1 h-px -bottom-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0'
              />
            )
          : null
      }
    </Link>
  );
}
