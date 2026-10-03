import { Disclaimer } from '@/components/Disclaimer';
import { Header } from '@/components/Header';
import { About } from '@/components/sections/About';
import { Beyond } from '@/components/sections/Beyond';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Kasavu } from '@/components/sections/Kasavu';
import { Panels } from '@/components/sections/Panels';
import { Practice } from '@/components/sections/Practice';
import { Process } from '@/components/sections/Process';
import { Quote } from '@/components/sections/Quote';
import { Topbar } from '@/components/sections/Topbar';
import { getSiteContent } from '@/lib/content';

export default async function HomePage() {
  const { settings, home, disclaimer } = await getSiteContent();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.fullName.replace(/^Adv\.\s*/, ''),
    alternateName: settings.name,
    jobTitle: 'Advocate, Mediator & Arbitrator',
    telephone: settings.phones.map((p) => p.href.replace('tel:', '')),
    email: settings.emails,
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'NALSAR University of Law, Hyderabad' },
      { '@type': 'CollegeOrUniversity', name: 'Mahatma Gandhi University, Kottayam' },
    ],
    memberOf: { '@type': 'Organization', name: 'Kerala High Court Advocates’ Association' },
    knowsLanguage: ['ml', 'en', 'hi'],
    address: { '@type': 'PostalAddress', addressLocality: 'Ernakulam', postalCode: '682031', addressRegion: 'Kerala', addressCountry: 'IN' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Topbar settings={settings} />
      <Header name={settings.name} role={settings.role} />

      <main id="main">
        <Hero hero={home.hero} />
        <Kasavu />
        <About about={home.about} />
        <Quote quote={home.quote} label="Philosophy" />
        <Practice practice={home.practice} />
        <Quote quote={home.practiceQuote} label="On mediation" reverse />
        <Panels panels={home.panels} />
        <Process process={home.process} />
        <Beyond beyond={home.beyond} />
        <Contact contact={home.contact} settings={settings} />
      </main>

      <Kasavu dark />
      <Footer settings={settings} disclaimer={disclaimer} />
      <Disclaimer name={settings.name} content={disclaimer} />
    </>
  );
}
