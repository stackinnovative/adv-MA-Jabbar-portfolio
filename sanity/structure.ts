import type { StructureResolver } from 'sanity/structure';

/** Each document type has exactly one document, with a fixed ID equal to its type name. */
export const SINGLETONS = [
  { type: 'siteSettings', title: 'Site settings' },
  { type: 'homePage', title: 'Home page' },
  { type: 'disclaimer', title: 'Disclaimer (BCI Rule 36)' },
  { type: 'privacyPage', title: 'Privacy policy' },
] as const;

export const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website content')
    .items(
      SINGLETONS.map(({ type, title }) =>
        S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title)),
      ),
    );
