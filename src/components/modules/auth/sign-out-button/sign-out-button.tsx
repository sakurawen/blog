'use client';
import { isNil } from 'lodash-es';
import { Button } from '~/components/ui/button';
import { authClient } from '~/lib/auth-client';

export function SignOutButton() {
  const { data } = authClient.useSession();
  function handleSignOut() {
    return authClient.signOut();
  }
  if (isNil(data?.user)) {
    return null;
  }
  return <Button onClick={handleSignOut} variant='text'>注销</Button>;
}
