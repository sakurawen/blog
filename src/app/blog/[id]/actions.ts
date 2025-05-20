'use server';
import { notionClient } from '~/lib/notion';

export async function getBlog(id = process.env.NOTION_PAGE_ID as string) {
  const page = await notionClient.getPage(id, { fetchMissingBlocks: false });
  return page;
}
