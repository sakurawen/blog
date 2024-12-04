'use client';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { authClient } from '~/lib/auth-client';

export function SignInButton() {
  const { data } = authClient.useSession();
  function handleGithubSignIn() {
    return authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  }
  if (data) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='text'>登录</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>登录</DialogTitle>
          <DialogDescription>
            登录博客以进行评论
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <Button variant='text' onClick={handleGithubSignIn}>Github</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
