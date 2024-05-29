'use client';
import { SignInButton as ClerkSignInButton, SignedOut } from '@clerk/nextjs';
import { url } from '~/lib/url';
import { usePathname } from 'next/navigation';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

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
        fallbackRedirectUrl={url(pathname).href}>
        <div className='p-0.5 rounded-full cursor-pointer'>
          <ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6' />
        </div>
      </ClerkSignInButton>
    </SignedOut>
  );
}
