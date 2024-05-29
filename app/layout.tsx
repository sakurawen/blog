import { ClerkProvider } from '@clerk/nextjs';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Background } from '~/components/background';
import { harmonySans } from '~/lib/font';
import { Analytics } from "@vercel/analytics/react"
import './globals.css';
import { zhCN } from '~/lib/clerk-localizations';

export const metadata: Metadata = {
  title: "wen's blog",
  description: "wen's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html
        lang='en'
        suppressHydrationWarning>
        <body className={clsx('relative min-h-screen', harmonySans.className)}>
          <Background />
          {children}
          <div className='bg-[url(/noise.png)] opacity-[0.025] pointer-events-none absolute inset-0 bg-repeat bg-[182px,182px]' />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
