'use client';
import { parseResponse } from 'hono/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { hono } from '~/lib/hono';

export function PostsCreateButton() {
  const router = useRouter();
  async function handleCreate() {
    try {
      const res = await parseResponse(hono.api.posts.$post({
        json: {},
      }));
      if (res.data.id) {
        router.push(`/studio/posts/upsert/${res.data.id}`);
      }
    }
    catch (err) {
      console.error('Failed to create post', err);
      toast.error('Failed to create post');
    }
  }
  return (
    <Button onClick={handleCreate}>
      New Post
    </Button>
  );
}
