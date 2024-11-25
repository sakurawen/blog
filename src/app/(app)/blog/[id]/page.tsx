import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { notion } from '~/lib/notion';

export const dynamic = 'force-dynamic';

function getPost(id: string) {
  return notion.getPage(id);
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPost(id);
  return (
    <div className='pt-24 max-w-2xl mx-auto sm:px-0 px-4'>
      <PostRenderer recordMap={data} fullPage disableHeader className='prose !max-w-full !px-0' />
    </div>
  );
}
