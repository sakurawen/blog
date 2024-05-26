import type { Metadata } from 'next';
import './globals.css';
import { harmonySans } from './font';
import clsx from 'clsx';
import { Background } from '~/components/background';

export const metadata: Metadata = {
  title: 'wen\'s blog',
  description: 'wen\'s blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={clsx('relative min-h-screen', harmonySans.className)}>
        <Background />
        {children}
        <div className='bg-[url(/noise.png)] opacity-[0.025] pointer-events-none absolute inset-0 bg-repeat bg-[182px,182px]' />
      </body>
    </html>
  );
}
