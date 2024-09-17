import type { SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/block-content';
import post from './schemas/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post],
};
