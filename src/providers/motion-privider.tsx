'use client';
import type { PropsWithChildren } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
