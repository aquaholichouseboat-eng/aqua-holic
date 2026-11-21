import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'id2x5id1';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'AQUA_HOLIC Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('AQUA_HOLIC CMS Admin')
          .items([
            // 1. Homepage & Hero Sections
            S.listItem()
              .title('1. Homepage & Section Headings')
              .id('homePageItem')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Hero & Section Headers Editor')
              ),

            // 2. Houseboat Fleet
            S.listItem()
              .title('2. Houseboat Fleet & Packages')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('All Houseboats (Deluxe, Premium, Luxury)')
              ),

            // 3. Backwater Activities
            S.listItem()
              .title('3. Backwater Activities')
              .schemaType('service')
              .child(
                S.documentTypeList('service')
                  .title('All Activities (Speed Boat, Kayak, Shikara, Open Boat)')
              ),

            // 4. Gallery Management
            S.listItem()
              .title('4. Photo Gallery')
              .schemaType('galleryItem')
              .child(
                S.documentTypeList('galleryItem')
                  .title('All Gallery Photographs')
              ),

            // 5. Customer Reviews & Testimonials
            S.listItem()
              .title('5. Customer Reviews & Testimonials')
              .schemaType('testimonial')
              .child(
                S.documentTypeList('testimonial')
                  .title('All Customer Reviews')
              ),

            // 6. FAQs Management
            S.listItem()
              .title('6. Frequently Asked Questions (FAQ)')
              .schemaType('faq')
              .child(
                S.documentTypeList('faq')
                  .title('All FAQs')
              ),

            // 7. About Us
            S.listItem()
              .title('7. About Us & Story')
              .id('aboutItem')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
                  .title('About Us & Company Story')
              ),

            // 8. Contact Information & Jetty Location
            S.listItem()
              .title('8. Contact Details & Jetty Location')
              .id('contactInfoItem')
              .child(
                S.document()
                  .schemaType('contactInfo')
                  .documentId('contactInfo')
                  .title('Hotline, WhatsApp & Jetty Location')
              ),

            // 9. Promotional Banners
            S.listItem()
              .title('9. Promotional Banners & Deals')
              .schemaType('banner')
              .child(
                S.documentTypeList('banner')
                  .title('Promotional Banners & Deals')
              ),

            // 10. Website Settings
            S.listItem()
              .title('10. Website Settings & Branding')
              .id('websiteSettingsItem')
              .child(
                S.document()
                  .schemaType('websiteSettings')
                  .documentId('websiteSettings')
                  .title('Global Brand Settings & SEO')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
