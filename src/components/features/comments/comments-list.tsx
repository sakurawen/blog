'use client';
import type { InferUserFromClient } from 'better-auth';
import type { CommentWithUser } from './comments-type';
import { authClient } from '~/lib/auth-client';
import { dayjs } from '~/lib/dayjs';
import { cn } from '~/lib/utils';

interface CommentListProps {
  list: Array<CommentWithUser>
}

export function CommentsList({ list }: CommentListProps) {
  const { data } = authClient.useSession();
  return (
    <div className={cn('comment-list w-full my-12!')}>
      <div>
        {
          list.map((comment, index) => {
            return (
              <CommentsListItem user={data?.user} index={index} key={comment.id} comment={comment} />
            );
          })
        }
      </div>
    </div>
  );
}

function CommentsListItem({ comment, index, user }: { comment: CommentWithUser, index: number, user?: InferUserFromClient<any> }) {
  const isSelfComment = comment.userId === user?.id;
  const createdAt = dayjs(comment.createdAt);
  function formatNow(date?: Date | null) {
    if (!date) {
      return '-';
    }
    return createdAt.fromNow();
  }
  return (
    <div className={cn('comment-list-item gap-4 flex items-end mb-4! ', { 'flex-row-reverse': isSelfComment })}>
      <div className='shrink-0'>
        <img className='rounded-full size-8' src={comment.user?.image || ''} alt='avatar' />
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
            {createdAt?.format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span className='text-gray-500 text-[10px]'>{formatNow(comment.createdAt)}</span>
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
