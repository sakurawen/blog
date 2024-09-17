import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import { Background } from '~/components/background';

import { zhCN } from '~/lib/clerk-localizations';
import { harmonySans } from '~/lib/font';
import { MotionProvider } from '~/providers/motion-privider';
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
    <ClerkProvider localization={zhCN}>
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={clsx('relative min-h-screen', harmonySans.className)}>
          <MotionProvider>
            <Background />
            {children}
            <div className='pointer-events-none absolute inset-0 bg-[url(/noise.png)] bg-[182px,182px] bg-repeat opacity-[0.025]' />
          </MotionProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
