'use client';

/**
 * Sanity Studio, embedded in the Next.js app at /studio
 * (src/app/(studio)/studio/[[...tool]]/page.tsx).
 */
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { singletonTypes, structure } from './sanity/structure';
import { apiVersion, dataset, projectId } from './src/lib/sanity/env';

// Singletons can only be edited and published — not created, duplicated or deleted.
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'Adv. Abdul Jabbarudeen M.',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) =>
      singletonTypes.has(schemaType) ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action)) : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
