'use client';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/cn';

export function HeaderLink({
  className,
  href,
  ...restProps
}: LinkProps & React.ComponentProps<'a'>) {
  const pathname = usePathname();
  let isActive = false;
  if (pathname === href) {
    isActive = true;
  }
  else if (pathname !== '/' && href !== '/' && href.includes(pathname)) {
    isActive = true;
  }
  return (
    <Link
      {...restProps}
      href={href}
      className={cn(className, {
        'bg-zinc-100': isActive,
      })}
    />
  );
}
