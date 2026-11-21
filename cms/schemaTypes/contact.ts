import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Display Phone Number',
      type: 'string',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'phoneRaw',
      title: 'Direct Dial Phone Number (e.g. +919876543210)',
      type: 'string',
      initialValue: '+919876543210',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Display WhatsApp Number',
      type: 'string',
      initialValue: '+91 98765 43210',
    }),
    defineField({
      name: 'whatsappRaw',
      title: 'WhatsApp Digits with Country Code (e.g. 919876543210)',
      type: 'string',
      initialValue: '919876543210',
    }),
    defineField({
      name: 'email',
      title: 'Official Email Address',
      type: 'string',
      initialValue: 'booking@aquaholic.in',
    }),
    defineField({
      name: 'addressTitle',
      title: 'Boarding Jetty Title',
      type: 'string',
      initialValue: 'Punnamada Jetty',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
      initialValue: 'Finishing Point Road, Punnamada,',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2 (City & Pin)',
      type: 'string',
      initialValue: 'Alleppey (Alappuzha), Kerala 688013',
    }),
    defineField({
      name: 'workingHours',
      title: 'Operating Hours',
      type: 'string',
      initialValue: '6:00 AM – 10:00 PM Daily',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Profiles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform (Instagram, Facebook, YouTube)' },
            { name: 'url', type: 'url', title: 'Profile URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'phone',
      subtitle: 'email',
    },
  },
});
