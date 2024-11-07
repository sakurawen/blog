import { NotionAPI } from 'notion-client';

export const notion = new NotionAPI({
  authToken: process.env.NEXT_PUBLIC_NOTION_KEY as string,
});
