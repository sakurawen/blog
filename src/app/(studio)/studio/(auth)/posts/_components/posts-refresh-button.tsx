'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';

export function PostsRefreshButton() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  async function handleRefresh() {
    try {
      setLoading(true);
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <Button disabled={loading} onClick={handleRefresh} variant='secondary'>
      {loading && <Spinner />}
      Refresh
    </Button>
  );
}
