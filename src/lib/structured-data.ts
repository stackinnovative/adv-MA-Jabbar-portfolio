import type { Office, SiteContent } from './types';
import { SITE_URL } from './site-url';

/**
 * schema.org data for search engines: the advocate (Person), one LegalService per
 * chamber (so each can appear for local searches, e.g. "advocate Punalur"), and the
 * WebSite. Built from site settings, so CMS edits to offices/contacts carry through.
 * Facts only — no ratings or reviews (BCI Rule 36).
 */

const PERSON_ID = `${SITE_URL}/#person`;
const abs = (src: string) => (src.startsWith('http') ? src : `${SITE_URL}${src}`);
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** "Ernakulam — High Court" → "Ernakulam"; "Punalur, Kollam" → "Punalur" */
const locality = (o: Office) => o.label.split(/\s+—\s+|,/)[0].trim();

/** Areas each chamber serves, beyond its own town. */
const AREAS: Record<string, { type: string; name: string }[]> = {
  ernakulam: [
    { type: 'City', name: 'Ernakulam' },
    { type: 'City', name: 'Kochi' },
  ],
  punalur: [
    { type: 'City', name: 'Punalur' },
    { type: 'AdministrativeArea', name: 'Kollam' },
  ],
};

function postalAddress(o: Office) {
  const lines = o.lines.filter((l) => !/^Adv\./.test(l)); // drop the name-board line
  const last = lines[lines.length - 1] ?? '';
  const pin = last.match(/\b\d{6}\b/)?.[0];
  const street = (pin ? lines.slice(0, -1) : lines).join(', ');
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality(o),
    ...(pin && { postalCode: pin }),
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  };
}

export function buildStructuredData({ settings, home }: SiteContent) {
  const image = abs(home.hero.image.src);
  const telephone = settings.phones.map((p) => p.href.replace('tel:', ''));
  const fullName = settings.fullName.replace(/^Adv\.\s*/, '');
  const knowsAbout = [
    'Mediation',
    'Arbitration',
    'Alternative dispute resolution',
    ...home.practice.areas.map((a) => a.title),
  ];

  const offices = settings.offices.map((o) => {
    const town = locality(o);
    return {
      '@type': 'LegalService',
      '@id': `${SITE_URL}/#office-${slug(town)}`,
      name: `${settings.name} — Advocate, Mediator & Arbitrator, ${town}`,
      description: `Chambers of ${settings.name} (${fullName}), advocate at the High Court of Kerala, mediator and arbitrator — ${town}, Kerala.`,
      url: SITE_URL,
      image,
      telephone,
      email: settings.emails,
      address: postalAddress(o),
      ...(o.mapUrl && { hasMap: o.mapUrl }),
      areaServed: [
        ...(AREAS[slug(town)] ?? [{ type: 'City', name: town }]).map((a) => ({ '@type': a.type, name: a.name })),
        { '@type': 'State', name: 'Kerala' },
      ],
      knowsAbout,
      employee: { '@id': PERSON_ID },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: fullName,
        alternateName: [settings.name, settings.name.replace(/^Adv\.\s*/, ''), `Advocate ${fullName}`],
        jobTitle: ['Advocate', 'Mediator', 'Arbitrator'],
        description: settings.seo.description,
        url: SITE_URL,
        image,
        telephone,
        email: settings.emails,
        workLocation: offices.map((o) => ({ '@id': o['@id'] })),
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'NALSAR University of Law, Hyderabad' },
          { '@type': 'CollegeOrUniversity', name: 'Mahatma Gandhi University, Kottayam' },
        ],
        memberOf: [
          { '@type': 'Organization', name: 'Kerala High Court Advocates’ Association' },
          { '@type': 'Organization', name: 'Punalur Bar Association' },
        ],
        knowsAbout,
        knowsLanguage: ['ml', 'en', 'hi'],
      },
      ...offices,
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: settings.name,
        inLanguage: 'en-IN',
        publisher: { '@id': PERSON_ID },
      },
    ],
  };
}
