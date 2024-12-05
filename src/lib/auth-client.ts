import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

export function githubSignIn() {
  return authClient.signIn.social({
    provider: 'github',
    callbackURL: location.href,
  });
}

export function googleSignIn() {
  return authClient.signIn.social({
    provider: 'google',
    callbackURL: '/',
  });
}