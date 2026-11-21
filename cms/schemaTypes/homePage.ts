import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Homepage Management',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main headline for the hero section (e.g. Experience the Beauty of)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Hero Heading Highlight',
      type: 'string',
      description: 'Highlighted text in the hero heading (e.g. Alleppey Backwaters)',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Descriptive subtitle beneath the main heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'heroFeatures',
      title: 'Hero Bullet Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Quick selling points shown in badges (e.g. All Meals Included, Private & Sharing AC)',
    }),
    defineField({
      name: 'heroWhatsAppText',
      title: 'WhatsApp CTA Button Text',
      type: 'string',
      initialValue: 'Chat on WhatsApp',
    }),
    defineField({
      name: 'heroWhatsAppNumber',
      title: 'WhatsApp Phone Number (Digits only with country code, e.g. 919876543210)',
      type: 'string',
    }),
    defineField({
      name: 'heroCallText',
      title: 'Call CTA Button Text',
      type: 'string',
      initialValue: 'Call +91 98765 43210',
    }),
    defineField({
      name: 'heroCallNumber',
      title: 'Direct Call Phone Number (e.g. +919876543210)',
      type: 'string',
    }),
    defineField({
      name: 'statsBar',
      title: 'Guarantees & Stats Bar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Stat / Guarantee Title' },
            { name: 'desc', type: 'string', title: 'Description / Subtitle' },
            { name: 'icon', type: 'string', title: 'Icon Identifier (shield, star, check, etc.)' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      subtitle: 'heroSubtitle',
      media: 'heroImage',
    },
  },
});
