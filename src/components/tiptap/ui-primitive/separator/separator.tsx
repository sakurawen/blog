'use client';

import * as React from 'react';
import { cn } from '~/lib/tiptap-utils';
import '~/components/tiptap/ui-primitive/separator/separator.scss';

export type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  decorative?: boolean
}

export function Separator({ ref, decorative, orientation = 'vertical', className, ...divProps }: SeparatorProps & { ref?: React.RefObject<HTMLDivElement | null> }) {
  const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
  const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, 'role': 'separator' };

  return (
    <div
      className={cn('tiptap-separator', className)}
      data-orientation={orientation}
      {...semanticProps}
      {...divProps}
      ref={ref}
    />
  );
}

Separator.displayName = 'Separator';
