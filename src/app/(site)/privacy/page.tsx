import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteContent } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const { settings, privacy } = await getSiteContent();
  return { title: `${privacy.title} — ${settings.name}`, robots: { index: false }, alternates: { canonical: '/privacy' } };
}

export default async function PrivacyPage() {
  const { privacy } = await getSiteContent();
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Link href="/">← Back to home</Link>
        <h1 className="h2">{privacy.title}</h1>
        {privacy.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </main>
  );
}
