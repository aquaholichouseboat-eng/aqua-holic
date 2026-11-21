import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'Frequently Asked Questions (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'e.g. What are the check-in and check-out timings for overnight houseboats?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Detailed answer shown when user clicks to expand',
      validation: (Rule) => Rule.required(),
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
      title: 'question',
    },
  },
});
