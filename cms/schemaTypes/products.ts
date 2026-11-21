import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Houseboats Fleet & Details',
  type: 'document',
  fieldsets: [
    { name: 'basic', title: '1. Basic Information & Pricing', options: { collapsible: true, collapsed: false } },
    { name: 'capacity', title: '2. Capacity & Stay Duration', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: '3. Description & Detailed Story', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: '4. Featured Image & Photo Gallery', options: { collapsible: true, collapsed: false } },
    { name: 'features', title: '5. Package Inclusions & Highlights', options: { collapsible: true, collapsed: false } },
    { name: 'food', title: '6. Food Menu (Live Cooked on Boat)', options: { collapsible: true, collapsed: false } },
    { name: 'meta', title: '7. Ratings & Admin Settings', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. BASIC INFORMATION ---
    defineField({
      name: 'category',
      title: 'Houseboat Category',
      type: 'string',
      fieldset: 'basic',
      initialValue: 'private',
      options: {
        list: [
          { title: 'Private Houseboat (Exclusive Charter)', value: 'private' },
          { title: 'Sharing Houseboat (Per-Room / Budget)', value: 'sharing' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.warning('Selecting a category (Private or Sharing) is recommended'),
      description: 'Select whether this vessel is a Private Houseboat or a Sharing Houseboat',
    }),
    defineField({
      name: 'title',
      title: 'Houseboat Name',
      type: 'string',
      fieldset: 'basic',
      description: 'e.g. 1 Bedroom Deluxe, 2 Bedroom Premium, 3 Bedroom Luxury',
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
      description: 'e.g. Top Rated, Most Popular, Best Value, Luxury Heritage',
    }),
    defineField({
      name: 'price',
      title: 'Starting Price in INR (₹)',
      type: 'number',
      fieldset: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Pricing Unit',
      type: 'string',
      fieldset: 'basic',
      initialValue: '/ night',
      description: 'e.g. / night, / day cruise',
    }),

    // --- 2. CAPACITY & STAY ---
    defineField({
      name: 'bedrooms',
      title: 'Number of Bedrooms',
      type: 'number',
      fieldset: 'capacity',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'capacity',
      title: 'Guest Capacity Label',
      type: 'string',
      fieldset: 'capacity',
      description: 'e.g. 2–3 Guests, 4–6 Guests, 8–12 Guests',
    }),
    defineField({
      name: 'stay',
      title: 'Cruise Stay Type',
      type: 'string',
      fieldset: 'capacity',
      initialValue: 'Overnight Stay',
      description: 'e.g. Overnight Stay, Day Cruise, 24 Hours',
    }),

    // --- 3. DESCRIPTIONS ---
    defineField({
      name: 'desc',
      title: 'Short Card Summary Description',
      type: 'text',
      rows: 3,
      fieldset: 'content',
      description: 'Displayed on the houseboat card preview',
      validation: (Rule) => Rule.warning('Card summary is recommended'),
    }),
    defineField({
      name: 'longDesc',
      title: 'Detailed Overview & Vessel Story',
      type: 'text',
      rows: 6,
      fieldset: 'content',
      description: 'Displayed in the "Detailed Overview" section of the houseboat details page',
    }),

    // --- 4. MEDIA ---
    defineField({
      name: 'image',
      title: 'Featured Cover Image',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
      validation: (Rule) => Rule.warning('Cover image is recommended. If left empty, website will display high-res fallback photo.'),
    }),
    defineField({
      name: 'gallery',
      title: 'Vessel Photo Gallery',
      type: 'array',
      fieldset: 'media',
      description: 'Photos displayed on the houseboat details view gallery slider',
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
      title: 'Card Badge Pills / Tags',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
      description: 'Quick pills shown on card (e.g. Top Rated, Overnight stay, 2–3 Guests)',
    }),
    defineField({
      name: 'inclusions',
      title: 'Package Inclusions (Checklist)',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
      description: 'Items shown under "What\'s Included in This Cruise" on the details page',
    }),
    defineField({
      name: 'highlights',
      title: 'Vessel Key Highlights',
      type: 'array',
      fieldset: 'features',
      of: [{ type: 'string' }],
      description: 'Key bullet points shown under "Key Vessel Highlights"',
    }),

    // --- 6. FOOD MENU ---
    defineField({
      name: 'menu',
      title: 'All-Day Kerala Food Menu',
      type: 'array',
      fieldset: 'food',
      of: [{ type: 'string' }],
      description: 'Courses served on board (Welcome Drink, Kerala Sadhya Lunch, Evening Tea, Dinner, Breakfast)',
    }),

    // --- 7. ADMIN & METADATA ---
    defineField({
      name: 'rating',
      title: 'Guest Star Rating (e.g. 4.8)',
      type: 'number',
      fieldset: 'meta',
      initialValue: 4.8,
    }),
    defineField({
      name: 'reviews',
      title: 'Review Count (e.g. 142)',
      type: 'number',
      fieldset: 'meta',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      fieldset: 'meta',
      initialValue: true,
    }),
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
      category: 'category',
      capacity: 'capacity',
      price: 'price',
      media: 'image',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, category, capacity, price, media }: any) {
      const catLabel = category === 'sharing' ? 'Sharing Houseboat' : 'Private Houseboat';
      const priceText = price ? ` · ₹${price.toLocaleString('en-IN')}` : '';
      const capText = capacity ? ` · ${capacity}` : '';
      return {
        title,
        subtitle: `[${catLabel}]${capText}${priceText}`,
        media,
      };
    },
  },
});
