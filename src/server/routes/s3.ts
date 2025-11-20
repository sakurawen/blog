import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { env } from '~/lib/env';
import { s3 } from '~/lib/s3';
import { factory } from '~/server/factory';

const presignedUrlSchema = z.object({
  fileName: z.string().min(1, '文件名不能为空'),
  fileType: z.string().min(1, '文件类型不能为空'),
});

export const s3Router = factory.createApp().post(
  '/presigned-url',
  zValidator('json', presignedUrlSchema),
  async (c) => {
    const { fileName, fileType } = c.req.valid('json');

    // 生成唯一的文件名，避免冲突
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const key = `assets/${fileType}/${timestamp}-${randomString}-${fileName}`;

    // 创建 PutObject 命令
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    try {
      // 生成预签名 URL，有效期 5 分钟
      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

      return c.json({
        success: true,
        uploadUrl,
        key,
        // 假设你配置了公共访问，这是文件上传后的访问 URL
        fileUrl: `${env.CLOUDFLARE_CDN_URL}/${key}`,
      });
    }
    catch (error) {
      console.error('生成预签名 URL 失败:', error);
      return c.json(
        {
          success: false,
          error: '生成上传链接失败',
        },
        500,
      );
    }
  },
);
