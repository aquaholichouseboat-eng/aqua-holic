import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'websiteSettings',
  title: 'Website Settings & Branding',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website Name / Brand',
      type: 'string',
      initialValue: 'AquaHolic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
      initialValue: 'Premium Kerala Houseboats & Backwater Experiences',
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryWhatsApp',
      title: 'Global WhatsApp Booking Number (e.g. 919876543210)',
      type: 'string',
      initialValue: '919876543210',
    }),
    defineField({
      name: 'supportPhone',
      title: 'Global Support Phone (e.g. +91 98765 43210)',
      type: 'string',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Global Support Email',
      type: 'string',
      initialValue: 'booking@aquaholic.in',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© 2026 AquaHolic. All rights reserved. Alleppey, Kerala.',
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default SEO Title',
      type: 'string',
      initialValue: 'AquaHolic | Luxury Kerala Houseboats & Backwater Experiences in Alleppey',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default SEO Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Book luxury private and sharing Kerala houseboats in Alleppey with AquaHolic. Direct boat pricing, authentic Kerala meals, sunset cruises, shikaras, and speed boats.',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
});
