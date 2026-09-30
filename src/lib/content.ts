import { cache } from 'react';
import { siteContent } from '@/content/site';
import { withDefaults, withImagePositions } from './merge';
import { client } from './sanity/client';
import { isSanityConfigured } from './sanity/env';
import { SITE_QUERY } from './sanity/queries';
import type { SiteContent } from './types';

/** Cache tag cleared by the Sanity webhook (src/app/api/revalidate/route.ts). */
export const SANITY_TAG = 'sanity';

/**
 * The only place the site reads content from.
 *
 * With Sanity configured, content comes from the CMS; any field that is empty
 * there falls back to the local default in `src/content/site.ts`, so the site
 * never renders a hole or crashes on a half-filled document. Without Sanity
 * (no project ID), the local content is used as-is.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) return siteContent;
  try {
    const data = await client.fetch<unknown>(SITE_QUERY, {}, { next: { revalidate: 60, tags: [SANITY_TAG] } });
    return withDefaults(siteContent, withImagePositions(data));
  } catch (err) {
    console.error('[sanity] fetch failed — using local content', err);
    return siteContent;
  }
});
