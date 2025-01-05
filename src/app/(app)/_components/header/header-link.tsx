'use client';
import Link from 'next/link';
import { cn } from '~/lib/cn';

export function HeaderLink(props: React.ComponentProps<typeof Link>) {
  const { className, ...restProps } = props;
  return (
    <Link
      className={cn(
        'cursor-default text-[15px] hover:bg-zinc-100 transition-colors rounded-lg text-zinc-950 py-1.5 px-3 sm:px-4    hover:text-zinc-950  inline-flex items-center justify-center ',
        className,
      )}
      {...restProps}
    />
  );
}
