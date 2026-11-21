import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner Management',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title / Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Tag (e.g. Monsoon Special, Honeymoon Deal)',
      type: 'string',
    }),
    defineField({
      name: 'linkText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Enquire Now',
    }),
    defineField({
      name: 'linkUrl',
      title: 'CTA Link URL or WhatsApp Link',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Banner Background / Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isActive',
      title: 'Is Banner Active?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
      media: 'image',
    },
  },
});
