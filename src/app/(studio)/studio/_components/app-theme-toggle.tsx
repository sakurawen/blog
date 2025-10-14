'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Button } from '~/components/ui/button';

export function AppThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleDarkMode() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-7'
      onClick={toggleDarkMode}
      data-style='ghost'
    >
      <Moon className='size-4 dark:inline hidden' />
      <Sun className='size-4 inline dark:hidden' />
    </Button>
  );
}
