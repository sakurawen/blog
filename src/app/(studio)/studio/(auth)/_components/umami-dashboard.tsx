'use client';

import { useIsClient } from 'foxact/use-is-client';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { env } from '~/lib/env';

const umamiShareUrl = env.NEXT_PUBLIC_UMAMI_SHARE_URL;

export function UmamiDashboard() {
  const { theme, resolvedTheme } = useTheme();

  const { src, isDark } = useMemo(() => {
    const activeTheme = theme === 'system' ? resolvedTheme : theme;
    return {
      src: umamiShareUrl,
      isDark: activeTheme === 'dark',
    };
  }, [theme, resolvedTheme]);
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }
  return (
    <iframe
      title='Umami Dashboard'
      src={src}
      className='h-[calc(100vh-4rem)] w-full rounded-md'
      style={
        isDark
          ? { filter: 'invert(1) hue-rotate(180deg)' }
          : undefined
      }
    />
  );
}
