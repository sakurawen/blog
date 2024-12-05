'use client';
import { Icon } from '@iconify/react';
import { produce } from 'immer';
import { type ChangeEvent, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';

interface CommentsInputProps {
  id: string
}
export function CommentsInput(_: CommentsInputProps) {
  const [commentForm, setCommentForm] = useState({
    userComment: '',
    url: '',
    email: '',
  });

  function handleUserCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setCommentForm(produce((draft) => {
      draft.userComment = e.target.value;
    }));
  }
  return (
    <div className='comment-input rounded-xl'>
      <div className='pt-4 relative'>
        <Textarea className='block w-full py-2.5 resize-none' rows={8} placeholder='评论文章是免费的...' value={commentForm.userComment} onChange={handleUserCommentChange} />
        <div className='comment-actions absolute right-1.5 bottom-1.5'>
          <Button variant='text' className=''>
            <Icon icon='lucide:send' className='mr-1' />
            提 交
          </Button>
        </div>
      </div>
    </div>
  );
}
