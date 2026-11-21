import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Products & Houseboats Management',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Houseboat Name / Title',
      type: 'string',
      description: 'e.g. 1 Bedroom Deluxe, 2 Bedroom Premium, 3 Bedroom Luxury',
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
      title: 'Badge Tag',
      type: 'string',
      description: 'e.g. Top Rated, Most Popular, Best Value, Luxury Heritage',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (e.g. 4.8)',
      type: 'number',
      initialValue: 4.8,
    }),
    defineField({
      name: 'reviews',
      title: 'Review Count (e.g. 142)',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'stay',
      title: 'Stay Type',
      type: 'string',
      initialValue: 'Overnight Stay',
      description: 'e.g. Overnight Stay, Day Cruise, 24 Hours',
    }),
    defineField({
      name: 'capacity',
      title: 'Guest Capacity',
      type: 'string',
      description: 'e.g. 2–3 Guests, 4–6 Guests, 8–12 Guests',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Number of Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price in INR',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Pricing Unit',
      type: 'string',
      initialValue: '/ night',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
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
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDesc',
      title: 'Full Description',
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
      title: 'Package Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Vessel Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'menu',
      title: 'Onboard Food Menu',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: true,
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
      subtitle: 'capacity',
      media: 'image',
    },
  },
});
