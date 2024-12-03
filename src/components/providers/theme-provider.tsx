'use client';
import type { PropsWithChildren } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: PropsWithChildren) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}
