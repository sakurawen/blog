import { db } from '~/db/client';

async function getCommentsBySlug(slug: string) {
  return db.query.comments.findMany({
    where(fields, { eq }) {
      return eq(fields.slug, slug);
    },
  });
}

interface CommentProps {
  id: string
}
export async function CommentList(props: CommentProps) {
  const { id } = props;
  return (
    <div className='comment-list w-full'>

    </div>
  );
}
