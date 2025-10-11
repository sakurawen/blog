import { UpsertEditor } from '../_components/upsert-editor';

export default async function PostEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UpsertEditor id={id} />;
}
