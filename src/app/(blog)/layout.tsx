import type { PropsWithChildren } from 'react';
import Script from 'next/script';
import { MotionProvider } from '~/components/provider/motion-provider';
import { ScrollArea } from '~/components/ui/scroll-area';

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <MotionProvider>
      <Script
        src='https://cloud.umami.is/script.js'
        data-website-id='db54fa9c-6564-4c24-a997-058b8012f7b7'
        strategy='afterInteractive'
      />
      <ScrollArea className='h-screen'>
        {children}
      </ScrollArea>
    </MotionProvider>
  );
}
