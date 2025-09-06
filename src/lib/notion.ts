import { NotionAPI } from 'notion-client';
import { env } from './env';
import 'server-only';

export const notionClient = new NotionAPI({
  authToken: env.NOTION_KEY,
});
