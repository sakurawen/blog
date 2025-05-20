import { NotionAPI } from 'notion-client';
import 'server-only';

export const notionClient = new NotionAPI({
  authToken: process.env.NOTION_KEY,
});
