'use client';
import { UserButton as ClerkUserButton, SignedIn } from '@clerk/nextjs';
import { url } from '~/lib/url';
import { usePathname } from 'next/navigation';

/**
 * 用户按钮
 * @returns
 */
export function UserButton() {
  const pathname = usePathname();
  return (
    <SignedIn>
      <ClerkUserButton afterSignOutUrl={url(pathname).href}></ClerkUserButton>
    </SignedIn>
  );
}
