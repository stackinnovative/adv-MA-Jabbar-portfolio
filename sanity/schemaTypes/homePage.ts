import { defineArrayMember, defineField, defineType } from 'sanity';
import { HEADING_HELP, imageField, labelValueMember, titleTextMember } from './fields';

const RULE_36 =
  'Bar Council of India Rule 36: state facts only. No testimonials, results, ratings, or words like "best", "top", "leading", "expert".';

/** A maroon quote band: text, attribution and a photo (shown uncropped). */
const quoteField = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: 'object',
    group,
    fields: [
      defineField({ name: 'text', type: 'text', rows: 4, validation: (r) => r.required() }),
      defineField({ name: 'attribution', type: 'string' }),
      imageField('image', 'Photo', 'Shown beside the quote at its full size — the photo is never cropped.'),
    ],
  });

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About & quote' },
    { name: 'practice', title: 'Practice' },
    { name: 'more', title: 'Panels, process & beyond' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      group: 'hero',
      description: RULE_36,
      fields: [
        defineField({ name: 'kicker', title: 'Small line above the heading', type: 'string' }),
        defineField({ name: 'heading', type: 'text', rows: 3, description: HEADING_HELP, validation: (r) => r.required() }),
        defineField({ name: 'lead', title: 'Intro text', type: 'text', rows: 3 }),
        imageField(
          'image',
          'Photo',
          'The backdrop must match the site’s dark colour #16130F so the photo has no visible edge. Prepare new photos with scripts/make-images.mjs.',
        ),
        defineField({
          name: 'badge',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
          ],
        }),
        defineField({
          name: 'highlights',
          title: 'Highlight tabs',
          type: 'array',
          of: [titleTextMember('highlight', 'Highlight')],
          validation: (r) => r.min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'about',
      type: 'object',
      group: 'about',
      description: RULE_36,
      fields: [
        defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'bio', title: 'Bio paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })] }),
        imageField('portrait', 'Portrait'),
        defineField({
          name: 'roles',
          title: 'Roles in detail (tabs)',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', type: 'string' }),
            defineField({ name: 'heading', type: 'text', rows: 2, description: HEADING_HELP }),
            defineField({
              name: 'items',
              title: 'Roles',
              type: 'array',
              validation: (r) => r.max(6),
              of: [
                defineArrayMember({
                  name: 'role',
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'subtitle', type: 'string', description: 'Short line under the tab title.' }),
                    defineField({ name: 'summary', type: 'text', rows: 3 }),
                    defineField({ name: 'points', title: 'What it covers', type: 'array', of: [defineArrayMember({ type: 'text', rows: 2 })] }),
                    defineField({ name: 'facts', title: 'Key facts', type: 'array', of: [labelValueMember('fact', 'value')] }),
                  ],
                  preview: { select: { title: 'title', subtitle: 'subtitle' } },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    quoteField('quote', 'Quote (after About)', 'about'),
    defineField({
      name: 'practice',
      title: 'Areas of practice',
      type: 'object',
      group: 'practice',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'text', rows: 2, description: HEADING_HELP }),
        defineField({ name: 'intro', type: 'text', rows: 3 }),
        defineField({
          name: 'areas',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'area',
              type: 'object',
              fields: [
                defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'description', type: 'text', rows: 2 }),
              ],
              preview: { select: { title: 'title', subtitle: 'description' } },
            }),
          ],
        }),
      ],
    }),
    quoteField('practiceQuote', 'Quote (after Areas of Practice)', 'practice'),
    defineField({
      name: 'panels',
      title: 'Panels & certifications',
      type: 'object',
      group: 'more',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({
          name: 'items',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'Text only — no logos or the State Emblem of India.',
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'How mediation works',
      type: 'object',
      group: 'more',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'steps', type: 'array', of: [titleTextMember('step', 'Step')] }),
      ],
    }),
    defineField({
      name: 'beyond',
      title: 'Beyond the courtroom',
      type: 'object',
      group: 'more',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'text', rows: 2, description: HEADING_HELP }),
        defineField({ name: 'body', type: 'text', rows: 4 }),
        imageField('image', 'Photo'),
        defineField({
          name: 'timeline',
          title: 'Engagements',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'One line each, e.g. "Delegate — UN Global Meeting on Sustainable Development, Bonn, Germany". No years.',
        }),
      ],
    }),
    defineField({
      name: 'contact',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'note', title: 'Line under the heading', type: 'string', description: 'e.g. "By prior appointment only".' }),
        defineField({ name: 'formHeading', type: 'string' }),
        defineField({ name: 'matterOptions', title: '"Type of matter" options', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
        defineField({
          name: 'consentText',
          title: 'Consent checkbox text',
          type: 'text',
          rows: 2,
          description: 'Required by BCI rules — do not remove.',
          validation: (r) => r.required(),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
