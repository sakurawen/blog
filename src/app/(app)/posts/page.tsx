import { PageContainer } from '~/components/layout/page-container';
import { PostRenderer } from '~/components/modules/notion/post-renderer';
import { notion } from '~/lib/notion';

export default async function PostsList() {
  async function getPosts() {
    return notion.getPage('13594a15d705807d8333de34903d6065');
  }
  const recordMap = await getPosts();
  return (
    <PageContainer>
      <div className='pt-24'>
        <PostRenderer recordMap={recordMap} />
      </div>
    </PageContainer>
  );
}
