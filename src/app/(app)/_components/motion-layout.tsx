'use client';

import type { PropsWithChildren } from 'react';
import { AnimatePresence } from 'motion/react';
import React from 'react';

export function MotionLayout({ children }: PropsWithChildren) {
  return (
    <AnimatePresence mode='wait'>
      {children}
    </AnimatePresence>
  );
}
