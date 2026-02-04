import type { FetchInfiniteQueryOptions, FetchQueryOptions } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { dehydrate, QueryClient, HydrationBoundary as TanstackHydrationBoundary } from '@tanstack/react-query';

interface HydrationBoundaryProps extends PropsWithChildren {
  prefetch: Array<FetchQueryOptions | FetchInfiniteQueryOptions>
}

function isFetchInfiniteQueryOptions(
  options: FetchQueryOptions | FetchInfiniteQueryOptions,
): options is FetchInfiniteQueryOptions {
  return 'getNextPageParam' in options;
}

export async function HydrationBoundary({ children, prefetch }: HydrationBoundaryProps) {
  const queryClient = new QueryClient();
  await Promise.all(prefetch.map((options) => {
    if (isFetchInfiniteQueryOptions(options)) {
      return queryClient.prefetchInfiniteQuery(options);
    }
    return queryClient.prefetchQuery(options);
  }));
  const state = dehydrate(queryClient);

  return <TanstackHydrationBoundary state={state}>{children}</TanstackHydrationBoundary>;
}
