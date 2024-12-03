import type { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '~/lib/cn';

export function HeaderLink({ className, href, children, isActive, ...restProps }: Omit<ComponentProps<typeof Link>, 'href'> & { isActive?: boolean, href: string }) {
  return (
    <Link {...restProps} href={href} key={href} className={cn(className, 'relative cursor-default text-zinc-500 block whitespace-nowrap', { 'text-black': isActive })}>
      {children}
    </Link>
  );
}
