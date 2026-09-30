import type { Metadata, Viewport } from 'next';
import { Noto_Serif_Malayalam, Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { DISCLAIMER_KEY } from '@/lib/disclaimer';
import { getSiteContent } from '@/lib/content';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
});
const malayalam = Noto_Serif_Malayalam({
  subsets: ['malayalam'],
  weight: '500',
  variable: '--font-malayalam',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: settings.seo.title,
    description: settings.seo.description,
    openGraph: {
      title: `${settings.name} — Advocate, Mediator & Arbitrator`,
      description: settings.seo.ogDescription,
      images: [settings.seo.ogImage],
      type: 'website',
    },
  };
}

export const viewport: Viewport = { themeColor: '#16130F' };

// Runs before first paint: decide whether the entry disclaimer (BCI Rule 36)
// must show. Without JS the attribute is never set and the modal stays hidden.
const disclaimerScript = `try{document.documentElement.dataset.disclaimer=localStorage.getItem('${DISCLAIMER_KEY}')==='1'?'agreed':'pending'}catch(e){document.documentElement.dataset.disclaimer='pending'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSans.variable} ${malayalam.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: disclaimerScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
