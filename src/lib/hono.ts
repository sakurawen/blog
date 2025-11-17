import type { app } from '~/server';
import { hc } from 'hono/client';

const _client = hc<typeof app>('/');
export type Client = typeof _client;

export function hcWithType(...args: Parameters<typeof hc>): Client {
  return hc<typeof app>(...args);
}

export const hono = hcWithType('/', {
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: 'include',
    });
  }) satisfies typeof fetch,
});
