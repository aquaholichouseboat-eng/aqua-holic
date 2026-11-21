import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Services & Activities Management',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Activity / Service Title',
      type: 'string',
      description: 'e.g. Speed Boat Ride, Backwater Kayaking, Traditional Shikara, Open Boat',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Badge',
      type: 'string',
      description: 'e.g. Top Adventure, Eco Tour, Romantic Cruise',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 30–60 Mins, 2 Hours',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
      description: 'e.g. Up to 6 Persons, Single & Tandem',
    }),
    defineField({
      name: 'price',
      title: 'Starting Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Pricing Unit',
      type: 'string',
      initialValue: '/ boat',
      description: 'e.g. / boat, / person, / hour',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
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
      name: 'desc',
      title: 'Short Summary Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDesc',
      title: 'Full In-Depth Description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'chips',
      title: 'Display Chips / Pills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'inclusions',
      title: 'What is Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Experience Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'safety',
      title: 'Safety Measures & Guidelines',
      type: 'array',
      of: [{ type: 'string' }],
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
      subtitle: 'tag',
      media: 'image',
    },
  },
});
