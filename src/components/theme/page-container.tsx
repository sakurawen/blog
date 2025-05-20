"use client"
import type { PropsWithChildren } from 'react';
import { m } from 'motion/react';
import { cn } from '~/lib/utils';

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('page-container', className)}>
      {children}
    </m.div>
  );
}
