import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';

// The privacy page is noindex, so only the home page is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
