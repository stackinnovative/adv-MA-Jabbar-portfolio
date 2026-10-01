/**
 * GROQ query that returns data in the `SiteContent` shape (src/lib/types.ts).
 * Singletons are fetched by their fixed document IDs (see sanity/structure.ts).
 * Missing fields come back as null and are filled from local defaults in
 * `getSiteContent()`.
 */

// Sanity image field -> ImageRef (+ hotspot, turned into `position` in content.ts)
const image = (field: string) => `"${field}": ${field}{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt,
  position,
  hotspot
}`;

export const SITE_QUERY = /* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    ...,
    "seo": seo{ ..., "ogImage": ogImage.asset->url }
  },
  "home": *[_id == "homePage"][0]{
    "hero": hero{ ..., ${image('image')} },
    "about": about{ ..., ${image('portrait')} },
    "quote": quote{ ..., ${image('image')} },
    practice,
    "practiceQuote": practiceQuote{ ..., ${image('image')} },
    panels,
    process,
    "beyond": beyond{ ..., ${image('image')} },
    contact
  },
  "disclaimer": *[_id == "disclaimer"][0]{ intro, points, footerText },
  "privacy": *[_id == "privacyPage"][0]{ title, paragraphs }
}`;
