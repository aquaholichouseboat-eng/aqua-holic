import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Homepage Management',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: '1. Hero Section', options: { collapsible: true, collapsed: false } },
    { name: 'houseboatsSection', title: '2. Houseboats Booking Section Header', options: { collapsible: true, collapsed: true } },
    { name: 'activitiesSection', title: '3. Activities Section Header', options: { collapsible: true, collapsed: true } },
    { name: 'gallerySection', title: '4. Gallery Section Header', options: { collapsible: true, collapsed: true } },
    { name: 'testimonialsSection', title: '5. Reviews / Testimonials Section Header', options: { collapsible: true, collapsed: true } },
    { name: 'contactSection', title: '6. Contact Section Header', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- 1. HERO SECTION ---
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      fieldset: 'hero',
      description: 'Main headline for the hero section (e.g. Experience the Beauty of)',
      initialValue: 'Experience the Beauty of',
      validation: (Rule) => Rule.warning('Hero heading is recommended'),
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Hero Heading Highlight',
      type: 'string',
      fieldset: 'hero',
      description: 'Highlighted text in the hero heading (e.g. Alleppey Backwaters)',
      initialValue: 'Alleppey Backwaters',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
      description: 'Descriptive subtitle beneath the main heading',
      initialValue: 'AquaHolic luxury Kerala houseboats (private & sharing), day cruises, and romantic shikaras. Transparent pricing, chef-prepared meals, and instant booking.',
      validation: (Rule) => Rule.warning('Hero subtitle is recommended'),
    }),
    defineField({
      name: 'heroMediaType',
      title: 'Hero Background Media Type',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Background Image (Photo)', value: 'image' },
          { title: 'Background Video (Looping MP4/WebM)', value: 'video' },
        ],
        layout: 'radio',
      },
      description: 'Choose whether the hero section displays a background photo or a smooth looping video',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
      description: 'Background photo for the hero section (also acts as poster/preview while video loads)',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'heroVideoFile',
      title: 'Hero Background Video File (Upload MP4 / WebM)',
      type: 'file',
      fieldset: 'hero',
      options: { accept: 'video/*' },
      description: 'Upload a looping video file directly to Sanity CDN',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Background Video URL (External MP4 / WebM Link)',
      type: 'url',
      fieldset: 'hero',
      description: 'Or provide an external direct video link (e.g. from Cloudinary, S3, or public CDN)',
    }),
    defineField({
      name: 'heroFeatures',
      title: 'Hero Bullet Features',
      type: 'array',
      fieldset: 'hero',
      of: [{ type: 'string' }],
      description: 'Quick selling points shown in badges (e.g. All Meals Included, Private & Sharing AC)',
      initialValue: ['All Meals Included', 'Private & Sharing AC', 'Instant Confirmation'],
    }),
    defineField({
      name: 'heroWhatsAppText',
      title: 'WhatsApp CTA Button Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Chat on WhatsApp',
    }),
    defineField({
      name: 'heroWhatsAppNumber',
      title: 'WhatsApp Phone Number (Digits only with country code, e.g. 919876543210)',
      type: 'string',
      fieldset: 'hero',
      initialValue: '919876543210',
    }),
    defineField({
      name: 'heroCallText',
      title: 'Call CTA Button Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Call +91 98765 43210',
    }),
    defineField({
      name: 'heroCallNumber',
      title: 'Direct Call Phone Number (e.g. +919876543210)',
      type: 'string',
      fieldset: 'hero',
      initialValue: '+919876543210',
    }),
    defineField({
      name: 'statsBar',
      title: 'Guarantees & Stats Bar',
      type: 'array',
      fieldset: 'hero',
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

    // --- 2. HOUSEBOATS SECTION ---
    defineField({
      name: 'houseboatsSectionTitle',
      title: 'Houseboats Section Title',
      type: 'string',
      fieldset: 'houseboatsSection',
      initialValue: 'Houseboat',
    }),
    defineField({
      name: 'houseboatsSectionHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      fieldset: 'houseboatsSection',
      initialValue: 'Bookings',
    }),
    defineField({
      name: 'houseboatsSectionSubtitle',
      title: 'Houseboats Section Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'houseboatsSection',
      initialValue: 'Select your private and sharing houseboat in Alleppey. All bookings include private chef, fuel, government permits, and meals.',
    }),

    // --- 3. ACTIVITIES SECTION ---
    defineField({
      name: 'activitiesSectionTitle',
      title: 'Activities Section Title',
      type: 'string',
      fieldset: 'activitiesSection',
      initialValue: 'Backwater',
    }),
    defineField({
      name: 'activitiesSectionHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      fieldset: 'activitiesSection',
      initialValue: 'Activities',
    }),
    defineField({
      name: 'activitiesSectionSubtitle',
      title: 'Activities Section Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'activitiesSection',
      initialValue: 'Experience thrilling speed boats, eco kayaking, scenic shikaras, and open boats across Kerala\'s most beautiful backwaters.',
    }),

    // --- 4. GALLERY SECTION ---
    defineField({
      name: 'gallerySectionTitle',
      title: 'Gallery Section Title',
      type: 'string',
      fieldset: 'gallerySection',
      initialValue: 'Kerala Backwaters',
    }),
    defineField({
      name: 'gallerySectionHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      fieldset: 'gallerySection',
      initialValue: 'Gallery',
    }),
    defineField({
      name: 'gallerySectionSubtitle',
      title: 'Gallery Section Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'gallerySection',
      initialValue: 'A glimpse into the magical houseboats, tranquil waterways, and authentic experiences of God\'s Own Country.',
    }),

    // --- 5. TESTIMONIALS SECTION ---
    defineField({
      name: 'testimonialsSectionTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      fieldset: 'testimonialsSection',
      initialValue: 'Loved by Guests',
    }),
    defineField({
      name: 'testimonialsSectionHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      fieldset: 'testimonialsSection',
      initialValue: 'Across the World',
    }),
    defineField({
      name: 'testimonialsSectionSubtitle',
      title: 'Testimonials Section Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'testimonialsSection',
      initialValue: 'Real reviews and memorable moments shared by families, honeymooners, and travelers from across India and the globe.',
    }),

    // --- 6. CONTACT SECTION ---
    defineField({
      name: 'contactSectionTitle',
      title: 'Contact Section Title',
      type: 'string',
      fieldset: 'contactSection',
      initialValue: 'Get in Touch with',
    }),
    defineField({
      name: 'contactSectionHighlight',
      title: 'Title Highlight Word',
      type: 'string',
      fieldset: 'contactSection',
      initialValue: 'AquaHolic',
    }),
    defineField({
      name: 'contactSectionSubtitle',
      title: 'Contact Section Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'contactSection',
      initialValue: 'No login required. Reach us directly via WhatsApp, direct call, or email for instant houseboat quotes and availability.',
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
