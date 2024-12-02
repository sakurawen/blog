import { db } from '~/db/client';

async function _getCommentsBySlug(slug: string) {
  return db.query.comments.findMany({
    where(fields, { eq }) {
      return eq(fields.slug, slug);
    },
  });
}

interface CommentProps {
  id: string
}
export async function CommentList(_: CommentProps) {
  return (
    <div className='comment-list w-full'>

    </div>
  );
}
