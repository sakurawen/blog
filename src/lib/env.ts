import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4-mini';

export const env = createEnv({

  server: {
    DATABASE_URL: z.string(),
    NOTION_KEY: z.string(),
    NOTION_PAGE_ID: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
    R2_ENDPOINT: z.string(),
    R2_BUCKET_NAME: z.string(),
    CLOUDFLARE_CDN_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_AVATAR_URL: z.string(),
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_AVATAR_URL: process.env.NEXT_PUBLIC_AVATAR_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NOTION_KEY: process.env.NOTION_KEY,
    NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    CLOUDFLARE_CDN_URL: process.env.CLOUDFLARE_CDN_URL,
  },
});
