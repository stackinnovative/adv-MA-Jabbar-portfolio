/** Sanity connection settings. Set these in `.env.local` (see `.env.local.example`). */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2025-10-01';

/** False until a project ID is set — the site then uses `src/content/site.ts`. */
export const isSanityConfigured = projectId.length > 0;
