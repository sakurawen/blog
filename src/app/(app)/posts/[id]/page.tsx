import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { notion } from '~/lib/notion';

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = await params;
  function getPost(id: string) {
    return notion.getPage(id);
  }
  const data = await getPost(id);
  return (
    <div className='pt-24 max-w-2xl mx-auto'>
      <PostRenderer recordMap={data} fullPage disableHeader />
    </div>
  );
}
