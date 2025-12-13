'use client';
import { useQuery } from '@tanstack/react-query';
import { parseResponse } from 'hono/client';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { PostCard } from '~/components/features/post-card';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '~/components/ui/context-menu';
import { hono } from '~/lib/hono';
import { cn } from '~/lib/utils';

export function Posts() {
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const [configDialogOpen, setConfirmDialogOpen] = useState(false);
  const { data: posts, isLoading, isFetching, refetch } = useQuery({
    queryFn() {
      return parseResponse(hono.api.posts.$get());
    },
    queryKey: ['posts'],
  });

  async function handleDelete(postId: string) {
    try {
      const res = await parseResponse(hono.api.posts[':id'].$delete({
        param: {
          id: postId,
        },
      }));
      if (res.data.id) {
        toast.success('Post deleted');
        setConfirmDialogOpen(false);
        refetch();
      }
    }
    catch (error) {
      console.error('Failed to delete post', error);
      toast.error('Failed to delete post');
    }
    finally {
      setDeletePostId(null);
    }
  }

  function handleSelectDeletePost(id: string) {
    setDeletePostId(id);
    setConfirmDialogOpen(true);
  }

  if (isLoading) {
    return 'loading...';
  }

  return (
    <>
      <div className='posts pb-4'>
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:flex 2xl:flex-wrap gap-4', isFetching && 'opacity-80')}>
          {posts?.data.map((post) => {
            return (
              <ContextMenu key={post.id}>
                <ContextMenuTrigger
                  render={(
                    <Link href={`/studio/posts/upsert/${post.id}`} className='block 2xl:max-w-xs'>
                      <PostCard className='h-full' post={post} />
                    </Link>
                  )}
                />
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleSelectDeletePost(post.id)}>
                    <Trash2Icon />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </div>
      </div>

      <AlertDialog open={configDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => deletePostId && handleDelete(deletePostId)}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
