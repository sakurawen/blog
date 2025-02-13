import { notion } from '~/lib/notion';

export async function getPosts() {
  return notion.getPage('13694a15d705804f9a2df0f1e1168011');
}
