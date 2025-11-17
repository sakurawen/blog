'use client';

import { useState } from 'react';
import { uploadFileToR2 } from '~/lib/upload';

/**
 * 文件上传组件示例
 */
export function FileUploadExample() {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file)
      return;

    setUploading(true);
    setError('');

    try {
      const url = await uploadFileToR2(file);
      setUploadedUrl(url);
    }
    catch (err) {
      setError(err instanceof Error ? err.message : '上传失败');
    }
    finally {
      setUploading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div>
        <input
          type='file'
          onChange={handleFileChange}
          disabled={uploading}
          className='block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed'
        />
      </div>

      {uploading && (
        <div className='text-sm text-gray-600'>
          上传中...
        </div>
      )}

      {error && (
        <div className='text-sm text-red-600'>
          错误:
          {' '}
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div className='space-y-2'>
          <div className='text-sm text-green-600'>
            上传成功！
          </div>
          <div className='text-sm text-gray-600 break-all'>
            文件 URL:
            {' '}
            {uploadedUrl}
          </div>
          {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
            <img
              src={uploadedUrl}
              alt='Uploaded'
              className='mt-2 max-w-md rounded-lg border'
            />
          )}
        </div>
      )}
    </div>
  );
}
