import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schema';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  basePath: '/studio',
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION  })],
});
