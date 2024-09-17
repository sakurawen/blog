'use client';
import { UserButton as ClerkUserButton, SignedIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { url } from '~/lib/url';

/**
 * 用户按钮
 * @returns
 */
export function UserButton() {
  const pathname = usePathname();
  return (
    <SignedIn>
      <ClerkUserButton afterSignOutUrl={url(pathname).href} />
    </SignedIn>
  );
}
