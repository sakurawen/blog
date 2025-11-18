import Link from 'next/link';
import { AdminContainer } from '~/components/admin/admin-container';
import { Button } from '~/components/ui/button';

export default function PostsPage() {
  return (
    <AdminContainer>
      <Link href='/studio/posts/upsert'>
        <Button>New Post</Button>
      </Link>
    </AdminContainer>
  );
}
