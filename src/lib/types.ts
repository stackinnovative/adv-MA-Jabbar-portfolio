/**
 * Content model for the site.
 *
 * Every field here maps 1:1 to a field in the Sanity schemas under
 * `sanity/schemaTypes/`. Components only ever consume these types, so moving
 * content from `src/content/site.ts` to Sanity only touches `src/lib/content.ts`.
 *
 * Text fields that are rendered as headings support two light markers
 * (see `components/RichLine.tsx`): a newline for a line break and `*word*`
 * for italic emphasis.
 */

export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, e.g. "50% 62%". */
  position?: string;
};

export type Office = {
  /** Short label, e.g. "Ernakulam — High Court". */
  label: string;
  lines: string[];
  /** Google Maps link for directions. */
  mapUrl: string;
};

export type SiteSettings = {
  /** Known name, shown site-wide (header, footer, titles), e.g. "Adv. M.A. Jabbar". */
  name: string;
  /** Full name, used in structured data and legal text; the About section shows it too. */
  fullName: string;
  role: string;
  /** Malayalam tagline shown in the top bar and footer. */
  taglineMl: string;
  seo: { title: string; description: string; ogDescription: string; ogImage: string };
  phone: { href: string; display: string };
  email: string;
  hours: string;
  hoursNote: string;
  offices: Office[];
  enrolmentNo: string;
  /** Google Maps embed URL (the `src` of the iframe). Empty until provided. */
  mapEmbedUrl: string;
  /** Web3Forms / Formspree / own API endpoint. Empty until provided. */
  formEndpoint: string;
};

export type Highlight = { title: string; text: string };

/** One role in the About section's "Roles in detail" tabs. */
export type Role = {
  title: string;
  subtitle: string;
  summary: string;
  points: string[];
  facts: { label: string; value: string }[];
};

export type HomePage = {
  hero: {
    kicker: string;
    heading: string;
    lead: string;
    image: ImageRef;
    badge: { label: string; value: string };
    highlights: Highlight[];
  };
  about: {
    name: string;
    subtitle: string;
    bio: string[];
    portrait: ImageRef;
    facts: { label: string; value: string }[];
    roles: { eyebrow: string; heading: string; items: Role[] };
  };
  quote: { text: string; attribution: string; image: ImageRef };
  practice: {
    eyebrow: string;
    heading: string;
    intro: string;
    areas: { title: string; description: string }[];
  };
  panels: { eyebrow: string; items: string[] };
  process: { eyebrow: string; heading: string; steps: Highlight[] };
  beyond: {
    eyebrow: string;
    heading: string;
    body: string;
    image: ImageRef;
    timeline: { label: string; year: string }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    formHeading: string;
    matterOptions: string[];
    consentText: string;
  };
};

export type Disclaimer = {
  intro: string;
  points: string[];
  footerText: string;
};

export type PrivacyPage = { title: string; paragraphs: string[] };

export type SiteContent = {
  settings: SiteSettings;
  home: HomePage;
  disclaimer: Disclaimer;
  privacy: PrivacyPage;
};
