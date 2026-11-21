import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HouseboatBookings from '@/components/HouseboatBookings';
import Activities from '@/components/Activities';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

import { sanityFetch } from '@/lib/sanity/client';
import {
  homePageQuery,
  houseboatsQuery,
  servicesQuery,
  galleryQuery,
  contactQuery,
  websiteSettingsQuery,
} from '@/lib/sanity/queries';
import { houseboats } from '@/data/houseboats';
import { activities } from '@/data/activities';
import { galleryItems } from '@/data/gallery';

export default async function HomePage() {
  const [
    homePageData,
    cmsHouseboats,
    cmsActivities,
    cmsGallery,
    contactData,
    settingsData,
  ] = await Promise.all([
    sanityFetch({ query: homePageQuery, fallback: null }),
    sanityFetch({ query: houseboatsQuery, fallback: houseboats }),
    sanityFetch({ query: servicesQuery, fallback: activities }),
    sanityFetch({ query: galleryQuery, fallback: galleryItems }),
    sanityFetch({ query: contactQuery, fallback: null }),
    sanityFetch({ query: websiteSettingsQuery, fallback: null }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <Hero data={homePageData || undefined} />

        {/* 2. Services for first Houseboat Bookings (Left to right slide cards) */}
        <HouseboatBookings boats={cmsHouseboats} />

        {/* 3. Services Activities Section (Speed boat, Kayaking, Shikara, Open boat) */}
        <Activities items={cmsActivities} />

        {/* 4. Gallery Section */}
        <Gallery items={cmsGallery} />

        {/* 5. Reviews Section */}
        <Testimonials />

        {/* 6. Contact Section */}
        <Contact data={contactData || undefined} />

        {/* 7. Footer */}
        <Footer settings={settingsData || undefined} />
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
