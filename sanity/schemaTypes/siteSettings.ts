import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Name & SEO', default: true },
    { name: 'contact', title: 'Contact & chambers' },
    { name: 'technical', title: 'Technical' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name shown on the site',
      type: 'string',
      group: 'identity',
      description: 'Known name for the header, footer and page titles, e.g. "Adv. M.A. Jabbar".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full name',
      type: 'string',
      group: 'identity',
      description: 'Used in search-engine data and legal text. The About section heading is edited under Home page → About.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string', group: 'identity', description: 'Shown under the name in the header and footer.' }),
    defineField({ name: 'taglineMl', title: 'Malayalam tagline', type: 'string', group: 'identity' }),
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      type: 'object',
      group: 'identity',
      fields: [
        defineField({ name: 'title', title: 'Browser / Google title', type: 'string', validation: (r) => r.required().max(90) }),
        defineField({ name: 'description', title: 'Google description', type: 'text', rows: 3, validation: (r) => r.required().max(300) }),
        defineField({ name: 'ogDescription', title: 'Social share description', type: 'text', rows: 2 }),
        defineField({ name: 'ogImage', title: 'Social share image', type: 'image', description: '1200 × 630 px.' }),
      ],
    }),
    defineField({
      name: 'phone',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'href',
          title: 'Phone link',
          type: 'string',
          description: 'Format: tel:+919447009556',
          validation: (r) => r.required().regex(/^tel:\+\d{8,15}$/, { name: 'tel: link' }),
        }),
        defineField({ name: 'display', title: 'Shown as', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({ name: 'email', type: 'string', group: 'contact', validation: (r) => r.required().email() }),
    defineField({ name: 'hours', title: 'Chamber hours', type: 'string', group: 'contact' }),
    defineField({ name: 'hoursNote', title: 'Hours note', type: 'string', group: 'contact' }),
    defineField({
      name: 'offices',
      title: 'Chambers / offices',
      type: 'array',
      group: 'contact',
      description: 'Do not add the residential address.',
      of: [
        defineArrayMember({
          name: 'office',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', description: 'e.g. "Ernakulam — High Court"', validation: (r) => r.required() }),
            defineField({ name: 'lines', title: 'Address lines', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'mapUrl', title: 'Google Maps link', type: 'url' }),
          ],
          preview: { select: { title: 'label', subtitle: 'lines.1' } },
        }),
      ],
      validation: (r) => r.min(1),
    }),
    defineField({ name: 'enrolmentNo', title: 'Bar Council of Kerala enrolment no.', type: 'string', group: 'contact' }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps embed URL',
      type: 'url',
      group: 'technical',
      description: 'Google Maps → Share → Embed a map → copy only the src="…" link.',
    }),
    defineField({
      name: 'formEndpoint',
      title: 'Enquiry form endpoint',
      type: 'url',
      group: 'technical',
      description: 'Formspree / Web3Forms URL that receives enquiry form submissions.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
