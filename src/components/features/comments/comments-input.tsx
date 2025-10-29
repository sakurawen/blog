'use client';
import { ArrowUpIcon } from 'lucide-react';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from '~/components/ui/input-group';
import { Separator } from '~/components/ui/separator';
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
          <InputGroup className='[--radius:16px]'>
            <InputGroupTextarea name='comment' defaultValue={state.comment} disabled={isPending} placeholder='评论文章是免费的...' />
            <InputGroupAddon align='block-end'>
              <Separator className='flex-1' orientation='vertical' />
              <InputGroupButton
                type='submit'
                disabled={isPending}
                variant='default'
                className='rounded-full'
                size='icon-sm'
              >
                <ArrowUpIcon className='size-5' />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </div>
  );
}
