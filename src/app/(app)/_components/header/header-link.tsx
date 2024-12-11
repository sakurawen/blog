'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '~/lib/cn';

export function HeaderLink(props: React.ComponentProps<typeof Link>) {
  const { className, ...restProps } = props;
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        pathname === restProps.href ? 'text-zinc-950 ' : 'text-zinc-500',
        'cursor-default py-1.5 px-4 text-sm  hover:text-zinc-950  inline-flex items-center justify-center ',
        className,
      )}
      {...restProps}
    />
  );
}
