import { getComments } from './actions';
import { CommentsInput } from './comments-input';
import { CommentsList } from './comments-list';
import { CommentsMask } from './comments-mask';

interface CommentsProps {
  id: string
}

export async function Comments(props: CommentsProps) {
  const { id } = props;
  const data = await getComments(id);

  return (
    <div className='comment w-full pb-24'>
      <CommentsList list={data || []} />
      <CommentsMask>
        <CommentsInput id={id} />
      </CommentsMask>
    </div>
  );
}
