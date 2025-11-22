import { PutObjectCommand } from '@aws-sdk/client-s3';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { env } from '~/lib/env';
import { fail, success } from '~/lib/result';
import { s3 } from '~/lib/s3';
import { factory } from '../factory';

const urlSchema = z.object({
  url: z.string().url('Invalid URL'),
});

interface OGData {
  title?: string
  description?: string
  image?: string
  url: string
  siteName?: string
  favicon?: string
}

/**
 * Download an image from a URL and upload it to R2
 * Returns the CDN URL of the uploaded image
 */
async function downloadAndUploadImage(imageUrl: string): Promise<string | undefined> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkBot/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status}`);
      return undefined;
    }

    // Get the content type
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Get the image buffer
    const imageBuffer = await response.arrayBuffer();

    // Generate a unique key for the image
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const ext = contentType.split('/')[1] || 'jpg';
    const key = `assets/bookmarks/images/${timestamp}-${randomString}.${ext}`;

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(imageBuffer),
      ContentType: contentType,
    });

    await s3.send(command);

    // Return the CDN URL
    return `${env.CLOUDFLARE_CDN_URL}/${key}`;
  }
  catch (error) {
    console.error('Error downloading and uploading image:', error);
    return undefined;
  }
}

async function fetchOGData(url: string): Promise<OGData> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }

    const html = await response.text();

    // Parse OG tags
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1];
    const ogDescription = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)?.[1];
    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1];
    const ogSiteName = html.match(/<meta\s+property="og:site_name"\s+content="([^"]*)"/i)?.[1];

    // Fallback to regular meta tags
    const title = ogTitle || html.match(/<title>([^<]*)<\/title>/i)?.[1];
    const description = ogDescription || html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
    const favicon = html.match(/<link\s+rel="(?:icon|shortcut icon)"\s+href="([^"]*)"/i)?.[1];

    // Resolve relative URLs
    const baseUrl = new URL(url);
    const resolveUrl = (relativeUrl?: string) => {
      if (!relativeUrl)
        return undefined;
      try {
        return new URL(relativeUrl, baseUrl).href;
      }
      catch {
        return relativeUrl;
      }
    };

    const resolvedImageUrl = resolveUrl(ogImage);

    // Download and upload image to our R2 storage to avoid CORS/403 issues
    let proxyImageUrl = resolvedImageUrl;
    if (resolvedImageUrl) {
      const uploadedUrl = await downloadAndUploadImage(resolvedImageUrl);
      if (uploadedUrl) {
        proxyImageUrl = uploadedUrl;
      }
    }

    const result = {
      title: title?.trim(),
      description: description?.trim(),
      image: proxyImageUrl,
      url,
      siteName: ogSiteName?.trim(),
      favicon: resolveUrl(favicon),
    };

    // Debug: log the parsed OG data
    console.error('Fetched OG data:', { ogImage, resolvedImageUrl, proxyImageUrl, result });

    return result;
  }
  catch (error) {
    console.error('Error fetching OG data:', error);
    throw error;
  }
}

export const bookmarkRouter = factory.createApp().post(
  '/fetch-og-data',
  zValidator('json', urlSchema),
  async (c) => {
    const { url } = c.req.valid('json');

    try {
      const ogData = await fetchOGData(url);
      return c.json(success(ogData));
    }
    catch (error) {
      console.error('Failed to fetch OG data:', error);
      return c.json(
        fail(error instanceof Error ? error.message : 'Failed to fetch OG data'),
        500,
      );
    }
  },
);
