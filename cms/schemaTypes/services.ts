import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Backwater Activities & Details',
  type: 'document',
  fieldsets: [
    { name: 'basic', title: '1. Basic Information & Rates', options: { collapsible: true, collapsed: false } },
    { name: 'duration', title: '2. Duration & Capacity', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: '3. Description & Detailed Story', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: '4. Cover Photo & Image Gallery', options: { collapsible: true, collapsed: false } },
    { name: 'features', title: '5. Inclusions & Activity Highlights', options: { collapsible: true, collapsed: false } },
    { name: 'safety', title: '6. Safety Measures & Lifejackets', options: { collapsible: true, collapsed: false } },
    { name: 'meta', title: '7. Admin Order & Settings', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. BASIC INFORMATION ---
    defineField({
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      fieldset: 'basic',
      description: 'e.g. Speed Boat Ride, Backwater Kayaking, Traditional Shikara, Open Boat',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      fieldset: 'basic',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Card Badge Tag',
      type: 'string',
      fieldset: 'basic',
      description: 'e.g. Top Adventure, Eco Tour, Romantic Cruise, Group Sightseeing',
    }),
    defineField({
      name: 'price',
      title: 'Starting Rate (INR ₹)',
      type: 'number',
      fieldset: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Rate Unit',
      type: 'string',
      fieldset: 'basic',
      initialValue: '/ boat',
      description: 'e.g. / boat, / person, / hour',
    }),

    // --- 2. DURATION & CAPACITY ---
    defineField({
      name: 'duration',
      title: 'Experience Duration',
      type: 'string',
      fieldset: 'duration',
      description: 'e.g. 30–60 Mins, 2 Hours, 2–4 Hours',
    }),
    defineField({
      name: 'capacity',
      title: 'Boat Passenger Capacity',
      type: 'string',
      fieldset: 'duration',
      description: 'e.g. Up to 6 Persons, Single & Tandem, 8–15 Guests',
    }),

    // --- 3. DESCRIPTIONS ---
    defineField({
      name: 'desc',
      title: 'Short Card Summary Description',
      type: 'text',
      rows: 3,
      fieldset: 'content',
      description: 'Displayed on the activity card preview on the homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDesc',
      title: 'Full In-Depth Activity Story',
      type: 'text',
      rows: 6,
      fieldset: 'content',
      description: 'Displayed under "Detailed Overview" on the dedicated activity page',
    }),

    // --- 4. MEDIA ---
    defineField({
      name: 'image',
      title: 'Featured Cover Photo',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Activity Photo Gallery',
      type: 'array',
      fieldset: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),

    // --- 5. FEATURES & INCLUSIONS ---
    defineField({
      name: 'chips',
      title: 'Card Badge Pills',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'inclusions',
      title: 'What is Included (Checklist)',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
      description: 'Items shown under "What\'s Included in This Experience"',
    }),
    defineField({
      name: 'highlights',
      title: 'Experience Highlights',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
      description: 'Bullet points shown under "Key Activity Highlights"',
    }),

    // --- 6. SAFETY ---
    defineField({
      name: 'safety',
      title: 'Safety Guidelines & Equipment',
      type: 'array',
      fieldset: 'safety',
      of: [{ type: 'string' }],
      description: 'Checklist shown under "Safety First — Clear Instructions"',
    }),

    // --- 7. ADMIN ---
    defineField({
      name: 'order',
      title: 'Display Sequence Order',
      type: 'number',
      fieldset: 'meta',
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
