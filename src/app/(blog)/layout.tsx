import type { PropsWithChildren } from 'react';
import { MotionProvider } from '~/components/provider/motion-provider';
import { ScrollArea } from '~/components/ui/scroll-area';

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <MotionProvider>
      <ScrollArea className='h-screen'>
        {children}
      </ScrollArea>
    </MotionProvider>
  );
}
