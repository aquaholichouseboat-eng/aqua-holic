import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'aqua-holic-cms';
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
          .title('AQUA_HOLIC CMS Dashboard')
          .items([
            // 1. Dashboard
            S.listItem()
              .title('1. Dashboard')
              .id('dashboard')
              .child(
                S.document()
                  .schemaType('websiteSettings')
                  .documentId('websiteSettings')
                  .title('Dashboard Overview')
              ),

            // 2. Homepage Management
            S.listItem()
              .title('2. Homepage Management')
              .id('homePageItem')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Hero & Homepage Settings')
              ),

            // 3. About Us Management
            S.listItem()
              .title('3. About Us Management')
              .id('aboutItem')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
                  .title('About Us & Story')
              ),

            // 4. Services Management
            S.listItem()
              .title('4. Services Management')
              .schemaType('service')
              .child(
                S.documentTypeList('service')
                  .title('Activities (Speed Boat, Kayak, Shikara, Open Boat)')
              ),

            // 5. Products Management
            S.listItem()
              .title('5. Products Management')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('Houseboats Fleet (Deluxe, Premium, Luxury)')
              ),

            // 6. Gallery Management
            S.listItem()
              .title('6. Gallery Management')
              .schemaType('galleryItem')
              .child(
                S.documentTypeList('galleryItem')
                  .title('All Gallery Photographs')
              ),

            // 7. Banner Management
            S.listItem()
              .title('7. Banner Management')
              .schemaType('banner')
              .child(
                S.documentTypeList('banner')
                  .title('Promotional Banners & Deals')
              ),

            // 8. Contact Information
            S.listItem()
              .title('8. Contact Information')
              .id('contactInfoItem')
              .child(
                S.document()
                  .schemaType('contactInfo')
                  .documentId('contactInfo')
                  .title('Contact Details & Jetty Location')
              ),

            // 9. Website Settings
            S.listItem()
              .title('9. Website Settings')
              .id('websiteSettingsItem')
              .child(
                S.document()
                  .schemaType('websiteSettings')
                  .documentId('websiteSettings')
                  .title('Website Settings & Global Branding')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
