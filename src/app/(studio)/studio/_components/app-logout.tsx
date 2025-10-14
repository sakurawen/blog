'use client';

import { LogOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { authClient } from '~/lib/auth-client';

export function AppLogout() {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-7'
      onClick={() => {
        authClient.signOut();
      }}
      data-style='ghost'
    >
      <LogOut className='size-4' />
    </Button>
  );
}
