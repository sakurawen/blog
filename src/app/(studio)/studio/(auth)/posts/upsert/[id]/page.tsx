import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { AdminContainer } from '~/components/admin/admin-container';
import { db } from '~/lib/db';
import { success } from '~/lib/result';
import { UpsertEditor } from '../_components/upsert-editor';

export default async function PostEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  async function getInitialData(id: string) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['post-detail', id],
      async queryFn() {
        const data = await db().query.posts.findFirst({
          where: {
            id,
            published: true,
          },
        });
        return success(data);
      },
    });
    return dehydrate(queryClient);
  }
  const state = await getInitialData(id);
  return (
    <HydrationBoundary state={state}>
      <AdminContainer className='h-full'>
        <UpsertEditor id={id} />
      </AdminContainer>
    </HydrationBoundary>
  );
}
