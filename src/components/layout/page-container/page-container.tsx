'use client';
import type { PropsWithChildren } from 'react';
import { m } from 'framer-motion';

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <m.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className={className}>
      {children}
    </m.div>
  );
}
