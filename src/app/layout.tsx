import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { MotionProvider } from '~/components/providers/motion-provider';
import { ThemeProvider } from '~/components/providers/theme-provider';
import { ScrollArea } from '~/components/ui/scroll-area';
import { harmonySans } from '~/lib/font';
import { initDayjs } from './init';
import './globals.css';

initDayjs();

export const metadata: Metadata = {
  title: 'akumanoko',
  description: 'akumanoko',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
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
        <Toaster position='top-center' />
        <Analytics />
      </body>
    </html>
  );
}
