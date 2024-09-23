'use client';
import type { PropsWithChildren } from 'react';
import { domMax, LazyMotion } from 'framer-motion';

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domMax} strict key='framer'>
      {children}
    </LazyMotion>
  );
}
