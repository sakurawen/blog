import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { MotionProvider } from '~/components/provider/motion-provider';
import { ScrollArea } from '~/components/theme/scroll-area';
import '~/app/initialize';
import '~/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>
          <ScrollArea className='h-screen'>
            {children}
          </ScrollArea>
        </MotionProvider>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
