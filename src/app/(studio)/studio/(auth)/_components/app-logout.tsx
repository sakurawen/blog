'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { authClient } from '~/lib/auth-client';

export function AppLogout() {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-7'
      onClick={() => {
        authClient.signOut();
        router.push('/studio/login');
      }}
      data-style='ghost'
    >
      <LogOut className='size-4' />
    </Button>
  );
}
