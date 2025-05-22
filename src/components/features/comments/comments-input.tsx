'use client';
import { Icon } from '@iconify/react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/theme/button';
import { Textarea } from '~/components/theme/textarea';
import { authClient } from '~/lib/auth-client';
import { createComment } from './actions';

interface CommentsInputProps {
  id: string
}
export function CommentsInput({ id }: CommentsInputProps) {
  const { data } = authClient.useSession();
  const [state, action, isPending] = useActionState(async (_: any, form: FormData) => {
    const comment = form.get('comment') as string;
    if (comment.trim().length === 0) {
      toast.info('请输入评论');
      return {
        comment,
      };
    }
    if (!data?.user) {
      toast.info('请登陆后评论');
      return {
        comment: '',
      };
    }
    const create = {
      postId: id,
      userId: data.user.id,
      content: comment,
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
            <Button variant='ghost' type='submit' disabled={isPending}>
              <Icon icon='lucide:send' className='mr-1' />
              提 交
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
