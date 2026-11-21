import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About Us Management',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'string',
      initialValue: 'Discover AquaHolic',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'Main heading for About Us (e.g. Handcrafted Luxury Backwater Journeys Since 2012)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'story',
      title: 'Company Story',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'experienceYears',
      title: 'Years of Experience',
      type: 'number',
      initialValue: 12,
    }),
    defineField({
      name: 'happyGuests',
      title: 'Happy Guests Count (e.g. 15,000+)',
      type: 'string',
      initialValue: '15,000+',
    }),
    defineField({
      name: 'houseboatsCount',
      title: 'Fleet Size',
      type: 'number',
      initialValue: 14,
    }),
    defineField({
      name: 'images',
      title: 'About Collage Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Core Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Highlight Title' },
            { name: 'desc', type: 'text', title: 'Description' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
    },
  },
});
