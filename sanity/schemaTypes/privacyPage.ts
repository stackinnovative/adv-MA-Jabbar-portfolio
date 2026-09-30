import { defineArrayMember, defineField, defineType } from 'sanity';

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy policy',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'paragraphs', type: 'array', of: [defineArrayMember({ type: 'text', rows: 4 })] }),
  ],
  preview: { prepare: () => ({ title: 'Privacy policy' }) },
});
