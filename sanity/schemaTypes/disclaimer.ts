import { defineArrayMember, defineField, defineType } from 'sanity';

export const disclaimer = defineType({
  name: 'disclaimer',
  title: 'Disclaimer (BCI Rule 36)',
  type: 'document',
  description: 'Shown on first visit and in the footer. Required by the Bar Council of India — keep it.',
  fields: [
    defineField({ name: 'intro', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'points',
      type: 'array',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'footerText', title: 'Footer disclaimer', type: 'text', rows: 5, validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Disclaimer' }) },
});
