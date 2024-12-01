'use client';
import type { PropsWithChildren } from 'react';
import { m } from 'motion/react';
import { cn } from '~/lib/cn';

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <m.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className={cn('page-container', className)}>
      {children}
    </m.div>
  );
}
