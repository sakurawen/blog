"use client"
import useSWR from 'swr';
import { getComments } from './actions';
import { CommentsInput } from './comments-input';
import { CommentsList } from './comments-list';
import { CommentsMask } from './comments-mask';

interface CommentsProps {
  id: string
}

function getCommentsList(id: string) {
  return getComments(id);
}

export function Comments(props: CommentsProps) {
  const { id } = props;
  const { data, isLoading } = useSWR(id, getCommentsList);
  if (isLoading) {
    return null;
  }
  return (
    <div className='comment w-full pb-24'>
      <CommentsList list={data || []} />
      <CommentsMask>
        <CommentsInput id={id} />
      </CommentsMask>
    </div>
  );
}
