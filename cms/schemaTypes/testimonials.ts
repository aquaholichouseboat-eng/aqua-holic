import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Customer Reviews & Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name(s)',
      type: 'string',
      description: 'e.g. Rahul & Priya Sharma, The Kapoor Family, James & Sarah O\'Brien',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Customer Location',
      type: 'string',
      description: 'e.g. Mumbai, India · Dublin, Ireland · Delhi, India',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 to 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      description: 'The customer’s review quote/experience',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'boat',
      title: 'Houseboat or Activity Booked',
      type: 'string',
      description: 'e.g. 2 Bedroom Premium Houseboat, Shikara Boat Cruise',
    }),
    defineField({
      name: 'trip',
      title: 'Trip Details / Date',
      type: 'string',
      description: 'e.g. Overnight Stay · Oct 2026, Day Cruise · Nov 2026',
    }),
    defineField({
      name: 'highlight',
      title: 'Key Review Highlight',
      type: 'string',
      description: 'Short highlight badge (e.g. Fresh Karimeen Fish Curry & Spotless Rooms)',
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Avatar Initials (e.g. RS, JO)',
      type: 'string',
    }),
    defineField({
      name: 'avatarImage',
      title: 'Optional Customer Photo',
      type: 'image',
      options: { hotspot: true },
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
      title: 'name',
      subtitle: 'boat',
      media: 'avatarImage',
    },
  },
});
