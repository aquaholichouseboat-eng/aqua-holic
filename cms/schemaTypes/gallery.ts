import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Management',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title / Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
      validation: (Rule) => Rule.warning('Photograph is recommended.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Houseboats', value: 'houseboats' },
          { title: 'Interiors', value: 'interiors' },
          { title: 'Backwaters', value: 'backwaters' },
          { title: 'Activities', value: 'activities' },
          { title: 'Dining & Food', value: 'dining' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label',
      type: 'string',
      description: 'Human readable label (e.g. Houseboats, Interiors, Backwaters)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
});
