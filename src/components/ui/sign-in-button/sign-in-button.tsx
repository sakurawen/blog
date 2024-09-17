'use client';
import { SignInButton as ClerkSignInButton, SignedOut } from '@clerk/nextjs';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import { url } from '~/lib/url';

/**
 * 登录按钮
 * @returns
 */
export function SignInButton() {
  const pathname = usePathname();
  return (
    <SignedOut>
      <ClerkSignInButton
        mode='modal'
        fallbackRedirectUrl={url(pathname).href}
      >
        <div className='cursor-pointer rounded-full p-0.5'>
          <ChatBubbleOvalLeftEllipsisIcon className='size-6' />
        </div>
      </ClerkSignInButton>
    </SignedOut>
  );
}
