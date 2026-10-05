/**
 * Canonical site address, used for canonical tags, the sitemap, robots.txt and
 * structured data. Set NEXT_PUBLIC_SITE_URL in Vercel; the fallback is the live domain
 * so search engines never see a localhost address.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.advmajabbar.com').replace(/\/$/, '');
