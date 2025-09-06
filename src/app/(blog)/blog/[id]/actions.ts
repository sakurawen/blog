'use server';
import { env } from '~/lib/env';
import { notionClient } from '~/lib/notion';

export async function getBlog(id = env.NOTION_PAGE_ID) {
  const page = await notionClient.getPage(id);
  return page;
}
