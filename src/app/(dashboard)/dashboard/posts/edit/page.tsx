import { Editor } from '~/components/modules/dashboard/editor/editor';

export default function PostEdit() {
  return (
    <div className='h-screen mx-auto container'>
      <div className='max-w-5xl mx-auto h-full p-2'>
        <Editor />
      </div>
    </div>
  );
}
