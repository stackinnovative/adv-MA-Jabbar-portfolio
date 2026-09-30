import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

// Reads published content only (public dataset, no token), served from Sanity's CDN.
export const client = createClient({
  projectId: projectId || 'not-configured',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
