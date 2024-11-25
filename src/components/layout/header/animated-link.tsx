'use client';
import type { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '~/lib/cn';

export function AnimatedLink({ className, href, children, isActive, ...restProps }: Omit<ComponentProps<typeof Link>, 'href'> & { isActive?: boolean, href: string }) {
  return (
    <Link {...restProps} href={href} key={href} className={cn(className, 'relative text-zinc-600 block whitespace-nowrap', { 'text-black': isActive })}>
      {children}
    </Link>
  );
}
