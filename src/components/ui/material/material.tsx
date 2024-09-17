import type { PropsWithChildren } from 'react';
import { cn } from '~/lib/cn';

export function Material(props: PropsWithChildren<{
  className?: string
}>) {
  const { className, children } = props;
  return <div className={cn('material bg-white shadow rounded-lg p-2', className)}>{children}</div>;
}
