import { createAuthClient } from 'better-auth/react';
import { env } from './env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = authClient;
