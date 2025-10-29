import { AdminContainer } from '~/components/admin/admin-container';
import { UpsertEditor } from '../_components/upsert-editor';

export default async function PostEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminContainer>
      <UpsertEditor id={id} />
    </AdminContainer>
  );
}
