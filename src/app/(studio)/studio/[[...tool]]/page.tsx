import { NextStudio } from 'next-sanity/studio';
import { isSanityConfigured } from '@/lib/sanity/env';
import config from '../../../../../sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '80px auto', padding: '0 16px', lineHeight: 1.6 }}>
        <h1>Sanity is not connected yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> (see <code>.env.local.example</code>),
          then restart the dev server.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
