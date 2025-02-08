'use client';
import type { InferUserFromClient } from 'better-auth';
import type { getCommentList } from './actions';
import dayjs from 'dayjs';
import Image from 'next/image';
import { authClient } from '~/lib/auth-client';
import { cn } from '~/lib/cn';

interface CommentProps {
  list: Awaited<ReturnType<typeof getCommentList>>
}
export function CommentList({ list }: CommentProps) {
  const { data } = authClient.useSession();
  return (
    <div className={cn('comment-list w-full !my-12')}>
      <div>
        {
          list.map((comment, index) => {
            return (
              <CommentListItem user={data?.user} index={index} key={comment.id} comment={comment} />
            );
          })
        }
      </div>
    </div>
  );
}

type Comment = Awaited<ReturnType<typeof getCommentList>>[number];

function CommentListItem({ comment, index, user }: { comment: Comment, index: number, user?: InferUserFromClient<any> }) {
  const isSelfComment = comment.userId === user?.id;
  const createAt = dayjs(comment.createAt);
  function formatNow(date?: Date | null) {
    if (!date) {
      return '-';
    }
    return createAt.fromNow();
  }
  return (
    <div className={cn('comment-list-item gap-4 flex items-end !mb-4  ', { 'flex-row-reverse': isSelfComment })}>
      <div className='shrink-0'>
        <Image width={32} height={32} className='rounded-full' src={comment.user?.image || ''} alt='avatar' />
      </div>
      <div className={cn({
        'text-right': isSelfComment,
      })}
      >
        <div className='pl-1 space-x-2 '>
          <span className='text-sm font-bold'>{comment.user?.name}</span>
          <span className='text-gray-500 text-[10px]'>
            #
            {index + 1}
            {' '}
            {createAt?.format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span className='text-gray-500 text-[10px]'>{formatNow(comment.createAt)}</span>
        </div>
        <p className={cn('inline-block text-left text-sm bg-gray-100 p-2', [
          isSelfComment ? 'rounded-t-xl rounded-bl-xl' : 'rounded-t-xl rounded-br-xl',
        ])}
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
}
