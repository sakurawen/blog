import { type SchemaTypeDefinition } from 'sanity'
import post from './schemas/post';
import blockContent from './schemas/block-content';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent,post],
}
