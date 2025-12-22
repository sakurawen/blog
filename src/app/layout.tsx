import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { AnalyticsProvider } from '~/components/provider/analytics-provider';
import { QueryClientProvider } from '~/components/provider/query-client-provider';
import { ThemeProvider } from '~/components/provider/theme-provider';
import '~/lib/initialize/client';
import '~/lib/initialize/server';
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
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </QueryClientProvider>
          <Toaster position='top-center' />
        </ThemeProvider>
      </body>
    </html>
  );
}
