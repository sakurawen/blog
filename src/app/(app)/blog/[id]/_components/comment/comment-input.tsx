'use client';
import type { comments } from '~/db/schemas';
import { Icon } from '@iconify/react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { authClient } from '~/lib/auth-client';

interface CommentsInputProps {
  id: string
  createComment: (create: typeof comments.$inferInsert) => Promise<typeof comments.$inferSelect[]>
}
export function CommentsInput({ id, createComment }: CommentsInputProps) {
  const { data } = authClient.useSession();
  const [state, action, isPending] = useActionState(async (_: any, form: FormData) => {
    const comment = form.get('comment') as string || '';
    if (!data?.user) {
      toast.info('请登陆后评论');
      return {
        comment: '',
      };
    }
    const create: typeof comments.$inferInsert = {
      postId: id,
      userId: data.user.id,
      content: comment,
      createAt: new Date(),
    };
    try {
      await createComment(create);
      toast.success('评论成功');
      return {
        comment: '',
      };
    }
    catch (e) {
      console.error(e);
      toast.error('评论失败');
      return {
        comment,
      };
    }
  }, { comment: '' });

  return (
    <div className='comment-input rounded-xl'>
      <div className='pt-4 relative'>
        <form action={action}>
          <Textarea name='comment' defaultValue={state.comment} disabled={isPending} className='block w-full py-2.5 resize-none' rows={8} placeholder='评论文章是免费的...' />
          <div className='comment-actions absolute right-1.5 bottom-1.5'>
            <Button variant='text' type='submit' loading={isPending}>
              <Icon icon='lucide:send' className='mr-1' />
              提 交
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
