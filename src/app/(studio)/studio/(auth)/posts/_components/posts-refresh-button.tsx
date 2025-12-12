'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~/components/ui/button';

export function PostsRefreshButton() {
  const queryClient = useQueryClient();
  async function handleRefresh() {
    return queryClient.invalidateQueries({ queryKey: ['posts'] });
  }
  return (
    <Button onClick={handleRefresh} variant='secondary'>
      Refresh
    </Button>
  );
}
