import { defineArrayMember, defineField } from 'sanity';

export const HEADING_HELP = 'Press Enter for a line break. Wrap a word in *asterisks* to show it in italics.';

/** Image with alt text; the hotspot sets the crop focus on the site. */
export const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
    fields: [
      defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
      defineField({
        name: 'position',
        title: 'Crop focus override (optional)',
        type: 'string',
        description: 'CSS object-position, e.g. "50% 30%". Leave empty to use the hotspot.',
      }),
    ],
    validation: (r) => r.required(),
  });

/** Array member with a title + text pair. */
export const titleTextMember = (name: string, title: string) =>
  defineArrayMember({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
      defineField({ name: 'text', type: 'text', rows: 2, validation: (r) => r.required() }),
    ],
    preview: { select: { title: 'title', subtitle: 'text' } },
  });

/** Array member with a label + value pair. */
export const labelValueMember = (name: string, valueName: string) =>
  defineArrayMember({
    name,
    type: 'object',
    fields: [
      defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
      defineField({ name: valueName, type: 'string' }),
    ],
    preview: { select: { title: 'label', subtitle: valueName } },
  });
