import Link from 'next/link';
import { AdminContainer } from '~/components/admin/admin-container';
import { Button } from '~/components/ui/button';
import { Posts } from './_components/posts';

export default function PostsPage() {
  return (
    <AdminContainer className='space-y-2'>
      <div>
        <Link href='/studio/posts/upsert'>
          <Button>New Post</Button>
        </Link>
      </div>
      <Posts />
    </AdminContainer>
  );
}
