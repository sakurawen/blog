import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { MotionProvider } from '~/components/providers/motion-provider';
import { ThemeProvider } from '~/components/providers/theme-provider';
import { ScrollArea } from '~/components/ui/scroll-area';
import { harmonySans } from '~/lib/font';
import 'react-notion-x/src/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'wen\'s blog',
  description: 'wen\'s blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={clsx(harmonySans.className)}>
          <MotionProvider>
            <ThemeProvider>
              <ScrollArea className='h-screen'>
                {children}
              </ScrollArea>
              <div className='pointer-events-none absolute inset-0 bg-[url(/noise.png)] bg-[182px,182px] bg-repeat opacity-[0.025]' />
            </ThemeProvider>
          </MotionProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
