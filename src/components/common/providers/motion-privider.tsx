'use client';
import type { PropsWithChildren } from 'react';
import { AnimatePresence, domMax, LazyMotion } from 'motion/react';

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
