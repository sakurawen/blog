'use client';
import type { PropsWithChildren } from 'react';
import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/lib/query-client';

export function QueryClientProvider(props: PropsWithChildren) {
  return <TanstackQueryClientProvider client={queryClient}>{props.children}</TanstackQueryClientProvider>;
}
