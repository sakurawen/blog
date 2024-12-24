'use client';
import type { PropsWithChildren } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '~/components/ui/button';
import { authClient, githubSignIn } from '~/lib/auth-client';

export function CommentSignInMask({ children }: PropsWithChildren) {
  const { data, isPending } = authClient.useSession();
  if (data?.user || isPending) {
    return children;
  }
  return (
    <div className=' relative w-full  border border-zinc-50 rounded-md p-2'>
      <div className='absolute z-10 top-0 left-0 h-full w-full bg-white/60'>
        <div className='h-full w-full flex justify-center items-center'>
          <div>
            <div className='text-sm text-center pb-4'>
              使用社交媒体账户登录评论
            </div>
            <div className='flex p items-center justify-center gap-4'>
              <Button onClick={githubSignIn}>
                <Icon className='mr-1' icon='devicon:github' />
                Github
              </Button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
